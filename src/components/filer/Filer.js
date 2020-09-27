import { API, FILE_URL } from "../../config/constants";
import { Button, Divider, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Filer() {
  const classes = useStyles();

  const [files, setFiles] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    axios.get(FILE_URL + API.FILER).then((r) => {
      if (r.data.length > 0) {
        setFiles(r.data);
      }
    });
  }, [refresh]);

  const MAX_SIZE = 4.7;

  const handleUpload = (e) => {
    e.preventDefault();
    if (e.target.files.length > 0) {
      //console.log(e.target.files[0].File.size);
      const size = e.target.files[0].size / 1e6;
      if (size < MAX_SIZE) {
        var bodyFormData = new FormData();
        bodyFormData.append("upload", e.target.files[0]);

        axios
          .post(FILE_URL + API.FILER, bodyFormData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((r) => setRefresh(!refresh));
      } else {
        alert(`File is bigger than ${MAX_SIZE}`);
      }
    }
  };

  const handleDelete = (id) => () => {
    axios
      .delete(FILE_URL + API.FILER + id + "/")
      .then((r) => setRefresh(!refresh))
      .catch((e) => {
        if (e.response.status === 413) {
          alert("File too big");
        } else {
          alert(e);
        }
      });
  };

  function humanFileSize(bytes, si = true, dp = 1) {
    const thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + " B";
    }
    const units = si
      ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    let u = -1;
    const r = 10 ** dp;
    do {
      bytes /= thresh;
      ++u;
    } while (
      Math.round(Math.abs(bytes) * r) / r >= thresh &&
      u < units.length - 1
    );
    return bytes.toFixed(dp) + " " + units[u];
  }

  return (
    <>
      <Button variant="contained" component="label" color="primary">
        <input
          type="file"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
        +
      </Button>
      <p>{`< ${MAX_SIZE} MB`}</p>

      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files &&
              files.map((file) => (
                <TableRow className="mat-row">
                  <TableCell>
                    <a
                      href={file.upload}
                      style={{
                        color: "inherit",
                      }}
                    >
                      {file.title.indexOf("/") > -1
                        ? file.title.split("/")[1]
                        : file.title}
                    </a>
                  </TableCell>
                  <TableCell>{humanFileSize(file.size)}</TableCell>
                  <TableCell>
                    <Button
                      onClick={handleDelete(file.id)}
                      size="small"
                      //variant="outlined"
                      color="primary"
                    >
                      x
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
