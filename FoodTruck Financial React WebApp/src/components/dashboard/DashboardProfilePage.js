import React from 'react';
import '../../styles/Profile.css'; // CSS styles for the profile page
import profilePic from '../../assets/profilePic.png'; // profile picture asset

// DashboardProfilePage component renders the user's profile information
const DashboardProfilePage = () => {
    return (
        <div className="profile-container">
            {/* Left Section: Profile Image and Info */}
            <div className="profile-left">
                <img src={profilePic} alt="Profile" />
                <h2>John Doe</h2>
                <p>Food Truck Owner</p>
                <p>San Francisco, CA</p>
                <a href="#edit" className="edit-btn">Edit Profile</a>

                {/* Small Bar Under Edit Profile */}
                <div className="edit-profile-bar"></div>

                {/* To-Do List Section */}
                <div className="todo-section">
                    <h3>To-Do</h3> {/* Shortened title */}
                    <ul>
                        <li>
                            <input type="checkbox" id="task1" />
                            <label htmlFor="task1"> Task 1</label>
                        </li>
                        <li>
                            <input type="checkbox" id="task2" />
                            <label htmlFor="task2"> Task 2</label>
                        </li>
                        <li>
                            <input type="checkbox" id="task3" />
                            <label htmlFor="task3"> Task 3</label>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Right Section: User Details and Status Sections */}
            <div className="profile-right">
                {/* Personal Info */}
                <div className="profile-info">
                    <div>
                        <label>Full Name:</label>
                        <input type="text" value="John Doe" readOnly />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="text" value="john.doe@example.com" readOnly />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input type="text" value="(555) 555-5555" readOnly />
                    </div>
                    <div>
                        <label>Address:</label>
                        <input type="text" value="Phoenix, AZ" readOnly />
                    </div>
                </div>

                {/* Status Sections */}
                <div className="profile-status">
                    {/* Goal Status Section */}
                    <div className="status-section">
                        <h3>Goal Status</h3>
                        <p>Current Monthly Revenue Goal</p>
                        <div className="status-bar">
                            <div className="status-bar-fill" style={{ width: '70%' }}></div>
                        </div>
                        <p>70% of the goal achieved</p>
                    </div>

                    {/* Business Info Section */}
                    <div className="status-section">
                        <h3>Business Info</h3>
                        <p>Food Truck: Delicious Delights</p>
                        <p>Next Service Location: ASU Poly Campus</p>
                        <p>Licenses and Permits: All up to date</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardProfilePage;
