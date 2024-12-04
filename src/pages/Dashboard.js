import React from "react";
import Users from "../components/Users";
import Roles from "../components/Roles";

const Dashboard = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>
      <Users />
      <br></br>
      <Roles />
    </div>
  );
};

export default Dashboard;
