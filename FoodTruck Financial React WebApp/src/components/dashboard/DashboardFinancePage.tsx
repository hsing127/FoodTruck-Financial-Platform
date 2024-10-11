"use client"; // Add this directive to make the component a Client Component

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Use Next.js `usePathname` for current path
import Link from 'next/link'; // Use Next.js `Link` for internal routing
import '../../styles/Finance.css';
import '../../styles/Sidebar.css';
import '../../styles/Topbar.css';

type LayoutType = {
    [key: number]: string;
};

const DashboardFinancePage: React.FC = () => {
    const [layout, setLayout] = useState<LayoutType>({
        0: "chart1",
        1: "chart2",
        2: "chart3",
        3: "chart4"
    });

    const pathname = usePathname(); // Get current pathname in Next.js

    // Loads the saved layout from localStorage when the component mounts.
    useEffect(() => {
        const savedLayout = localStorage.getItem('dashboardLayout');
        if (savedLayout) {
            setLayout(JSON.parse(savedLayout));
        }
    }, []);

    // Saves the current layout to localStorage whenever the layout state changes.
    useEffect(() => {
        localStorage.setItem('dashboardLayout', JSON.stringify(layout));
    }, [layout]);

    // Handles the drag start event and sets the dragged chart's ID in the dataTransfer object.
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, chartId: string) => {
        e.dataTransfer.setData("chartId", chartId);
    };

    // Handles the drop event, updating the layout by swapping the dragged chart with the target chart.
    const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
        const draggedChartId = e.dataTransfer.getData("chartId");
        const newLayout = { ...layout };
        const draggedKey = Object.keys(layout).find(
            (key) => layout[Number(key)] === draggedChartId
        );
        if (draggedKey !== undefined) {
            [newLayout[Number(draggedKey)], newLayout[targetIndex]] = [
                newLayout[targetIndex],
                newLayout[Number(draggedKey)]
            ];
            setLayout(newLayout);
        }
    };

    // Renders the appropriate chart based on the chart ID.
    const renderChart = (chartId: string): JSX.Element | null => {
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

    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <div className="dashboard-layout">
            <nav className="sidebar">
                <ul className="sidebar-menu">
                    <li className={pathname === "/dashboard/finance" ? "active" : ""}>
                        <Link href="/dashboard/finance">Finance</Link>
                    </li>
                    <li className={pathname === "/dashboard/inventory" ? "active" : ""} style={{ position: 'relative' }}>
                        <Link href="/dashboard/inventory">Inventory</Link>
                    </li>
                    <li className={pathname === "/dashboard/menu" ? "active" : ""} style={{ position: 'relative' }}>
                        <Link href="/dashboard/menu">Menu</Link>
                    </li>
                    <li style={{ position: 'relative' }}>
                        <div onClick={toggleOptions} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            Add Data
                            <span className={`arrow ${showOptions ? 'open' : ''}`}></span>
                        </div>
                        <ul className={`dropdown ${showOptions ? 'show' : ''}`}> {/* Add show class */}
                            <li>
                                <Link href="/dashboard/ocr">Upload File</Link>
                            </li>
                            <li>
                                <Link href="/dashboard/manual">Manual</Link>
                            </li>
                        </ul>

                    </li>
                </ul>

                <div className="sidebar-bottom">
                    <ul>
                        <li className={pathname === "/dashboard/profile" ? "active" : ""}>
                            <Link href="/dashboard/profile">Profile</Link>
                        </li>
                        <li className={pathname === "/dashboard/logout" ? "active" : ""}>
                            <Link href="/dashboard/logout">Logout</Link>
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
                        <Link href="/dashboard/settings">Settings</Link>
                    </div>
                </header>

                <div className="charts-grid">
                    {Object.keys(layout).map((key, index) => (
                        <div
                            key={index}
                            className="chart-container"
                            draggable
                            onDragStart={(e) => handleDragStart(e, layout[Number(key)])}
                            onDrop={(e) => handleDrop(e, Number(key))}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            {renderChart(layout[Number(key)])}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardFinancePage;
