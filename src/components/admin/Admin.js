import React from "react";
import { API, HOST } from "../../config/constants";

const Admin = () => {
  return (
    <>
      <a href={HOST + API.ADMIN}>Django Admin</a>
    </>
  );
};

export default Admin;
