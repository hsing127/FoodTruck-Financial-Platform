import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/Finance.css'; // For other styles
import '../../styles/Sidebar.css'; // For sidebar styles
import '../../styles/Topbar.css';  // For top bar styles

/**
 * Displays the finance dashboard layout, including a sidebar, top header, and charts.
 * Supports drag-and-drop functionality for rearranging the charts, with layout
 * persistence via localStorage.
 */
const DashboardFinancePage = () => {
  const [layout, setLayout] = useState({
    0: "chart1",
    1: "chart2",
    2: "chart3",
    3: "chart4"
  });

  const location = useLocation();

  /**
   * Loads the saved layout from localStorage when the component mounts.
   */
  useEffect(() => {
    const savedLayout = JSON.parse(localStorage.getItem('dashboardLayout'));
    if (savedLayout) {
      setLayout(savedLayout);
    }
  }, []);

  /**
   * Saves the current layout to localStorage whenever the layout state changes.
   */
  useEffect(() => {
    localStorage.setItem('dashboardLayout', JSON.stringify(layout));
  }, [layout]);

  /**
   * Handles the drag start event and sets the dragged chart's ID in the dataTransfer object.
   * @param {Event} e - The drag event.
   * @param {string} chartId - The ID of the chart being dragged.
   */
  const handleDragStart = (e, chartId) => {
    e.dataTransfer.setData("chartId", chartId);
  };

  /**
   * Handles the drop event, updating the layout by swapping the dragged chart with the target chart.
   * @param {Event} e - The drop event.
   * @param {number} targetIndex - The index of the target chart to swap with.
   */
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

  /**
   * Renders the appropriate chart based on the chart ID - 
   * All charts are mock for demo and will be replace with interactive charts later
   * 
   * @param {string} chartId - The ID of the chart to render.
   * @returns {JSX.Element|null} - The JSX for the chart or null if no matching chart.
   */
  const renderChart = (chartId) => {
    switch (chartId) {
      case "chart1":
        return (
          <>
            <h2>Inventory Costs (Mock Bar Chart)</h2>
            <div className="bar-chart">
              <div className="bar">Ingredients ($200)</div>
              <div className="bar">Packaging ($100)</div>
              <div className="bar">Beverages ($150)</div>
            </div>
          </>
        );
      case "chart2":
        return (
          <>
            <h2>Profit/Loss (Mock Line Chart)</h2>
            <svg viewBox="0 0 100 50" className="line-chart">
              <polyline
                fill="none"
                stroke="#44aa8b"
                strokeWidth="2"
                points="5,30 20,35 35,20 50,30 65,15 80,25 95,10"
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
        );
      case "chart3":
        return (
          <>
            <h2>Expenses (Mock Pie Chart)</h2>
            <div className="pie-chart"></div>
          </>
        );
      case "chart4":
        return (
          <>
            <h2>Placeholder for Future Chart</h2>
            <div className="placeholder-chart">Chart Placeholder</div>
          </>
        );
      default:
        return null;
    }
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
              {renderChart(layout[key])}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardFinancePage;
