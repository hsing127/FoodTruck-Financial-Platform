import React from 'react';
import '../../styles/DashMain.css';
import '../../styles/Sidebar.css';

const DashboardMenuPage: React.FC = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <ul className="menu-list">
          <li className="menu-item"><a href="#">Main Menu</a></li>
          <li className="menu-item"><a href="#">Finance</a></li>
          <li className="menu-item"><a href="#">Inventory</a></li>
          <li className="menu-item"><a href="#">Menu</a></li>
        </ul>
        <div className="sidebar-bottom">
          <ul>
            <li className="menu-item"><a href="#">Profile</a></li>
            <li className="menu-item"><a href="#">Logout</a></li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Welcome to Your Dashboard</h1>
        <p>Manage your food truck finances, track reports, and more.</p>

        {/* Financial Overview Section */}
        <div className="dashboard-section financial-section">
          <h2>Financial Overview</h2>
          <div className="financial-cards">
            <div className="card">
              <h3>Total Revenue</h3>
              <p>$10,000</p>
            </div>
            <div className="card">
              <h3>Total Expenses</h3>
              <p>$7,000</p>
            </div>
            <div className="card">
              <h3>Profit/Loss</h3>
              <p>$3,000</p>
            </div>
          </div>
        </div>

        {/* Inventory Overview Section */}
        <div className="dashboard-section inventory-section">
          <h2>Inventory Overview</h2>
          <ul>
            <li>Buns - 20 units (Low Stock)</li>
            <li>Meat - 50 units</li>
            <li>Condiments - 30 units</li>
            <li>Drinks - 80 units</li>
          </ul>
        </div>

        {/* Menu Management Section */}
        <div className="dashboard-section menu-section">
          <h2>Menu Management</h2>
          <div className="menu-cards">
            <div className="card">
              <h3>Top Seller</h3>
              <p>Burger Special</p>
            </div>
            <div className="card">
              <h3>Low Performer</h3>
              <p>Grilled Cheese</p>
            </div>
          </div>
          <button className="cta-button">Modify Menu</button>
        </div>

        {/* Task Management Section */}
        <div className="dashboard-section task-section">
          <h2>Task Management</h2>
          <ul>
            <li>Restock buns</li>
            <li>Prepare for weekend event</li>
            <li>Check truck maintenance</li>
          </ul>
          <button className="cta-button">Add Task</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardMenuPage;
