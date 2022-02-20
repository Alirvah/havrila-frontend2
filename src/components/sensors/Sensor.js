import { API, SENS_URL, SYSTEM_URL_2 } from "../../config/constants";
import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import { Line, Bar } from "react-chartjs-2";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import StopIcon from "@material-ui/icons/Stop";
import axios from "axios";

const datasetOpts = (label, unit) => ({
  animation: false,
  title: {
    display: true,
    text: label,
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          unit: "day",
        },
      },
    ],
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: unit,
        },
      },
    ],
  },
});

const datasetDetails = (data, label, color) => ({
  data: data,
  label: label,
  borderColor: color,
  pointBackgroundColor: color,
  fill: false,
  showLine: false,
  pointStyle: "circle",
  radius: 1,
});

const Sensor = () => {
  const [dataStatus, setDataStatus] = useState({
    cpuRamDisk: {},
    cpuTemp: {},
    uptime: {},
    wifiThroughput: {},
  });
  const [dataSensor, setDataSensor] = useState({
    light: {},
    temperature: {},
    pressure: {},
    humidity: {},
  });
  const [dataFup, setDataFup] = useState({});
  const [stateRpi, setStateRpi] = useState(false);
  const [lastOnline, setLastOnline] = useState("");

  useEffect(() => {
    axios.get(SENS_URL + API.STATUS).then((r) => {
      if (r.data) {
        const now = new Date();
        const lastTs = new Date(r.data[0].ts * 1e3);
        const delta = now.getTime() - lastTs.getTime();
        delta < 400e3 && setStateRpi(true);
        setLastOnline(new Date(r.data[0].ts * 1e3));

        const ts = r.data.map((e) => new Date(e.ts * 1e3));
        setDataStatus({
          ...dataStatus,
          cpuRamDisk: {
            labels: ts,
            datasets: [
              datasetDetails(
                r.data.map((e) => e.mem),
                "RAM",
                "green"
              ),
              datasetDetails(
                r.data.map((e) => e.cpu),
                "CPU",
                "blue"
              ),
              datasetDetails(
                r.data.map((e) => e.disk),
                "Disk",
                "red"
              ),
            ],
          },
          cpuTemp: {
            labels: ts,
            datasets: [
              datasetDetails(
                r.data.map((e) => e.temp),
                "CPU Temperature",
                "blue"
              ),
            ],
          },
          uptime: {
            labels: ts,
            datasets: [
              datasetDetails(
                r.data.map((e) => e.uptime / 60 / 60 / 24),
                "Uptime",
                "blue"
              ),
            ],
          },
          wifiThroughput: {
            labels: ts,
            datasets: [
              datasetDetails(
                r.data.map((e) => e.wtran / 1e9),
                "Wi-Fi Tranceive",
                "green"
              ),
              datasetDetails(
                r.data.map((e) => e.wrec / 1e9),
                "Wi-Fi Receive",
                "blue"
              ),
            ],
          },
        });
      }
    });
    axios.get(SENS_URL + API.SENSOR).then((r) => {
      if (r.data) {
        const ts = r.data.map((e) => new Date(e.ts * 1e3));
        setDataSensor({
          ...dataSensor,
          light: {
            labels: ts,
            datasets: [
              datasetDetails(
                r.data.map((e) => e.light),
                "Light",
                "blue"
              ),
            ],
          },
          temperature: {
            labels: ts,
            datasets: [
              datasetDetails(
                r.data.map((e) => e.temprpi),
                "Temp Rpi",
                "blue"
              ),
              datasetDetails(
                r.data.map((e) => e.temproom),
                "Temp Room",
                "green"
              ),
            ],
          },
          pressure: {
            labels: ts,
            datasets: [
              datasetDetails(
                r.data.map((e) => e.pressure),
                "Pressure",
                "blue"
              ),
            ],
          },
          humidity: {
            labels: ts,
            datasets: [
              datasetDetails(
                r.data.map((e) => e.humidity),
                "Humidity",
                "blue"
              ),
            ],
          },
        });
      }
    });
    axios.get(SYSTEM_URL_2 + API.FUP).then((r) => {
      if (r.data) {
        const reversedData = r.data.reverse();
        setDataFup({
          labels: reversedData.map((fup) => fup.date),
          datasets: [
            {
              label: "Download",
              data: reversedData.map((fup) => fup.download / 1e3),
              borderWidth: 1,
              backgroundColor: "blue",
            },
            {
              label: "Upload",
              data: reversedData.map((fup) => fup.upload / 1e3),
              borderWidth: 1,
              backgroundColor: "green",
            },
          ],
        });
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <p>
        <b>RaspberryPi</b>{" "}
        {stateRpi ? (
          <PlayCircleFilledIcon fontSize="small" style={{ color: "green" }} />
        ) : (
          <StopIcon fontSize="small" color="error" />
        )}
      </p>
      <p>
        <b>Last Online:</b> {lastOnline && lastOnline.toLocaleString()}
      </p>
      <Grid container>
        {dataStatus && (
          <>
            <Grid item lg={6}>
              <Line
                data={dataStatus.cpuRamDisk}
                options={datasetOpts("CPU,RAM,Disk", "%")}
              ></Line>
            </Grid>
            <Grid item lg={6}>
              <Line
                data={dataStatus.cpuTemp}
                options={datasetOpts("CPU Temperature", "*C")}
              ></Line>
            </Grid>
            <Grid item lg={6}>
              <Line
                data={dataStatus.uptime}
                options={datasetOpts("Uptime", "days")}
              ></Line>
            </Grid>
            <Grid item lg={6}>
              <Line
                data={dataStatus.wifiThroughput}
                options={datasetOpts("Wifi Throughput", "GB")}
              ></Line>
            </Grid>
          </>
        )}

        {dataSensor && (
          <>
            <Grid item lg={6}>
              <Line
                data={dataSensor.light}
                options={datasetOpts("Light", "Lux")}
              ></Line>
            </Grid>
            <Grid item lg={6}>
              <Line
                data={dataSensor.temperature}
                options={datasetOpts("Temperature", "*C")}
              ></Line>
            </Grid>
            <Grid item lg={6}>
              <Line
                data={dataSensor.pressure}
                options={datasetOpts("Pressure", "hPa")}
              ></Line>
            </Grid>
            <Grid item lg={6}>
              <Line
                data={dataSensor.humidity}
                options={datasetOpts("Humidity", "%")}
              ></Line>
            </Grid>
          </>
        )}
        {dataFup && (
          <Bar data={dataFup} options={datasetOpts("Internet", "GB")}></Bar>
        )}
      </Grid>
    </>
  );
};

export default Sensor;
