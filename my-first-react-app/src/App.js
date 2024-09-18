import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul>
            <li><a href="#overview">Overview</a></li>
            <li><a href="#features">Key Features</a></li>
            <li><a href="#motivation">Motivation</a></li>
            <li><a href="#data-visualization">Data Visualization</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </nav>
        <h1>Food Truck Financial Analysis Platform</h1>
      </header>

      <main className="App-content">
        <section id="overview">
          <h2>Overview</h2>
          <p>
            The Food Trucks Association of Canada seeks to develop a software platform that automates the process of reading,
            analyzing, and categorizing invoices and receipts from food truck operators. This platform will help food truck businesses
            better understand and manage their costs, improving profitability and operational efficiency.
          </p>
        </section>

        <section id="features">
          <h2>Key Features</h2>
          <ul>
            <li>Scan and digitize physical receipts and invoices</li>
            <li>Extract information from digital documents (PDFs, images)</li>
            <li>Categorize expenses automatically</li>
            <li>Provide detailed cost analysis reports</li>
            <li>Offer insights and recommendations for cost optimization</li>
          </ul>
        </section>

        <section id="motivation">
          <h2>Motivation</h2>
          <p>
            Food truck operators often struggle with managing their finances due to the fast-paced nature of their business and
            the variety of expenses they incur. By automating expense tracking and analysis, we aim to help food truck owners
            make more informed decisions, reduce operational costs, and increase profitability.
          </p>
        </section>

        <section id="data-visualization">
          <h2>Data Visualization</h2>
          <p>Visualize your expenses and profits using graphs and charts (placeholder for future Chart.js integration).</p>
          <div className="chart-placeholder">
            {/* Placeholder for charts */}
            <p>[Chart will go here]</p>
          </div>
        </section>

        <section id="receipts">
          <h2>Manage Receipts</h2>
          {isLoggedIn ? (
            <div>
              <p>Welcome, user! You can now manage your receipts.</p>
              <ul>
                <li>Add new receipts</li>
                <li>View your receipt history</li>
                <li>Update or delete entries</li>
              </ul>
              {/* Placeholder for CRUD operations */}
              <button className="manage-receipts-btn">Add New Receipt</button>
            </div>
          ) : (
            <div>
              <h3>Login to manage your receipts</h3>
              <button onClick={handleLogin} className="login-btn">Login</button>
            </div>
          )}
        </section>

        <section id="contact">
          <h2>Contact Us</h2>
          <form className="contact-form">
            <label>
              Name:
              <input type="text" name="name" required />
            </label>
            <label>
              Email:
              <input type="email" name="email" required />
            </label>
            <label>
              Message:
              <textarea name="message" required></textarea>
            </label>
            <button type="submit">Submit</button>
          </form>
        </section>
      </main>

      <footer className="App-footer">
        <p>© 2024 Roshan. All rights reserved.</p>
        <p>Contact: Jana Ray - <a href="mailto:jana@foodtrucksofcanada.org">jana@foodtrucksofcanada.org</a></p>
      </footer>
    </div>
  );
}

export default App;
