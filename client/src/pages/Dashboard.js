import React from "react";
import DashboardLinks from "../components/DashboardLinks";
import Search from "../components/Search";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <Search />
        <h1>Spotify Dashboard</h1>
        <p>Welcome to your personalized Spotify dashboard!</p>
        <DashboardLinks />
      </div>
    </div>
  );
};

export default Dashboard;
