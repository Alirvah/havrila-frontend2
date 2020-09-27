import { API, FILE_URL } from "../../config/constants";
import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import axios from "axios";

export default function Filer() {
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
      <Grid container spacing={1}>
        {files &&
          files.map((file) => (
            <>
              <Grid item xs={4}>
                <a
                  href={file.upload}
                  style={{
                    color: "inherit",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  {file.title.indexOf("/") > -1
                    ? file.title.split("/")[1]
                    : file.title}
                </a>
              </Grid>
              <Grid item xs={1}>
                {humanFileSize(file.size)}
              </Grid>
              <Grid item xs={7}>
                <Button
                  onClick={handleDelete(file.id)}
                  size="small"
                  //variant="outlined"
                  color="primary"
                >
                  x
                </Button>
              </Grid>
            </>
          ))}
      </Grid>
    </>
  );
}
