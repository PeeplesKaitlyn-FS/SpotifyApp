import React from "react";
import DashboardLinks from "../components/DashboardLinks";  

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Spotify Dashboard</h1>
        <p>Welcome to your personalized Spotify dashboard!</p>
        <DashboardLinks />
      </div>
    </div>
  );
};

export default Dashboard;
