import { API, HOST } from "../../config/constants";
import React, { useEffect, useState } from "react";

import axios from "axios";

const SECONDS_IN_YEAR = 31556952;
const ONE_SECOND = 1 / SECONDS_IN_YEAR;

export default function Home() {
  const [counter, setCounter] = useState(() => {
    const b = "18.06.1990";
    const today = new Date();
    const myYear = b.split(".")[2];
    const myMonth = b.split(".")[1];
    const myDay = b.split(".")[0];
    const bd = new Date(myYear, myMonth, myDay);
    const sec = (today.getTime() - bd.getTime()) / 1000;
    return sec / SECONDS_IN_YEAR;
  });

  useEffect(() => {
    //axios.get();
    //setTime('18.06.1990')
    setTimeout(() => setCounter(counter + ONE_SECOND), 100);
  }, [counter]);

  return (
    <>
      <p>Home</p>
      <a href={HOST + API.ADMIN}>Django Admin</a>
      <h1>{counter.toFixed(8)}</h1>
    </>
  );
}
