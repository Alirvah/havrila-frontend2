import axios from "axios";
import React, { useState } from "react";
import { API, SYSTEM_URL_2 } from "../../config/constants";

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);

  useState(() => {
    const getMeetingsAxios = () => {
      axios.get(SYSTEM_URL_2 + API.MEETING).then((r) => {
        if (r.data) {
          const filteredData = r.data.filter((e) => {
            const date = new Date();
            const day = ("0" + date.getDate()).slice(-2);
            const month = ("0" + (date.getMonth() + 1)).slice(-2);
            const year = date.getFullYear();
            const today = `${day}-${month}-${year}`;
            const meetingDate = e.time.split(" ")[0];
            return today === meetingDate;
          });
          setMeetings(filteredData);
        }
      });
    };
    getMeetingsAxios();
  }, []);

  return (
    <div style={{ padding: "0.5rem" }}>
      {meetings.length ? (
        <ul>
          {meetings.map((e) => (
            <a href={e.link}>
              <li
                key={e.id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <p>{e.name}</p>
                <p>{e.time}</p>
              </li>
            </a>
          ))}
        </ul>
      ) : (
        <p>No Meegings Today</p>
      )}
    </div>
  );
};

export default Meetings;
