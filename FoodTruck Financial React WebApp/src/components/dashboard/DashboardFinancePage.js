import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/Finance.css';

const DashboardFinancePage = () => {
  const [layout, setLayout] = useState({
    0: "chart1",
    1: "chart2",
    2: "chart3",
    3: "chart4"
  });

  const location = useLocation();

  useEffect(() => {
    const savedLayout = JSON.parse(localStorage.getItem('dashboardLayout'));
    if (savedLayout) {
      setLayout(savedLayout);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboardLayout', JSON.stringify(layout));
  }, [layout]);

  const handleDragStart = (e, chartId) => {
    e.dataTransfer.setData("chartId", chartId);
  };

  const handleDrop = (e, targetIndex) => {
    const draggedChartId = e.dataTransfer.getData("chartId");
    const newLayout = { ...layout };
    const draggedKey = Object.keys(layout).find(
      (key) => layout[key] === draggedChartId
    );
    [newLayout[draggedKey], newLayout[targetIndex]] = [
      newLayout[targetIndex],
      newLayout[draggedKey]
    ];
    setLayout(newLayout);
  };

  return (
    <div className="dashboard-layout">
      <nav className="sidebar">
        <ul className="sidebar-menu">
          <li className={location.pathname === "/dashboard/finance" ? "active" : ""}>
            <a href="/dashboard/finance">Finance</a>
          </li>
          <li className={location.pathname === "/dashboard/inventory" ? "active" : ""}>
            <a href="/dashboard/inventory">Inventory</a>
          </li>
          <li className={location.pathname === "/dashboard/menu" ? "active" : ""}>
            <a href="/dashboard/menu">Menu</a>
          </li>
        </ul>
        <div className="sidebar-bottom">
          <ul>
            <li className={location.pathname === "/dashboard/profile" ? "active" : ""}>
              <a href="/dashboard/profile">Profile</a>
            </li>
            <li className={location.pathname === "/dashboard/logout" ? "active" : ""}>
              <a href="/dashboard/logout">Logout</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="main-content">
        <header className="top-header">
          <div className="welcome-user">Welcome back, User!</div>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button className="search-btn">Search</button>
          </div>
          <div className="settings-link">
            <a href="/dashboard/settings">Settings</a>
          </div>
        </header>

        <div className="charts-grid">
          {Object.keys(layout).map((key, index) => (
            <div
              key={index}
              className="chart-container"
              draggable
              onDragStart={(e) => handleDragStart(e, layout[key])}
              onDrop={(e) => handleDrop(e, key)}
              onDragOver={(e) => e.preventDefault()}
            >
              {layout[key] === "chart1" && (
                <>
                  <h2>Inventory Costs (Mock Bar Chart)</h2>
                  <div className="bar-chart">
                    <div className="bar">Ingredients ($200)</div>
                    <div className="bar">Packaging ($100)</div>
                    <div className="bar">Beverages ($150)</div>
                  </div>
                </>
              )}
              {layout[key] === "chart2" && (
                <>
                  <h2>Profit/Loss (Mock Line Chart)</h2>
                  <svg viewBox="0 0 100 50" className="line-chart">
                    <polyline
                      fill="none"
                      stroke="#44aa8b"
                      strokeWidth="2"
                      points="
                       5,30
                       20,35
                       35,20
                       50,30
                       65,15
                       80,25
                       95,10"
                    />
                    <circle cx="5" cy="30" r="1.5" fill="#e74c3c" />
                    <circle cx="20" cy="35" r="1.5" fill="#e74c3c" />
                    <circle cx="35" cy="20" r="1.5" fill="#e74c3c" />
                    <circle cx="50" cy="30" r="1.5" fill="#e74c3c" />
                    <circle cx="65" cy="15" r="1.5" fill="#e74c3c" />
                    <circle cx="80" cy="25" r="1.5" fill="#e74c3c" />
                    <circle cx="95" cy="10" r="1.5" fill="#e74c3c" />
                  </svg>
                </>
              )}
              {layout[key] === "chart3" && (
                <>
                  <h2>Expenses (Mock Pie Chart)</h2>
                  <div className="pie-chart"></div>
                </>
              )}
              {layout[key] === "chart4" && (
                <>
                  <h2>Placeholder for Future Chart</h2>
                  <div className="placeholder-chart">Chart Placeholder</div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardFinancePage;
