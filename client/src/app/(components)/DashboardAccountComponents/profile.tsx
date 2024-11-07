import React, { useState, useEffect } from "react";
import { User, User2 } from "lucide-react";
import SectionCard from "../DashboardSettingsComponents/sectionCard";

const Profile: React.FC = () => {
    const [profile, setProfile] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+123456789",
        birthDate: "1990-01-01",
        company: "company.ltd",
    });
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchProfileData = async () => {
            const email = "wenjiex1@asu.edu";
            try {
                const response = await fetch("https://frih5a7ugg.execute-api.ca-central-1.amazonaws.com/dev/data/profile", {
                    method: "POST",
                    body: JSON.stringify({
                        body: JSON.stringify({ email }),
                    }),
                });

                const data = await response.json();
                const statusCode = data.statusCode || response.status;

                if (statusCode === 200 && data.body) {
                    setProfile({
                        ...profile,
                        email: data.body.Email,
                        company: data.body.BusinessName,
                    });
                } else {
                    console.error("Something went wrong.");
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); // Set loading to false after the request completes
            }
        };

        fetchProfileData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    };

    if (loading) {
        return <div>Loading...</div>; // Render loading indicator
    }

    return (
        <SectionCard icon={User} title="Profile Information">
            <div className="flex flex-col items-center mb-4">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <User2 className="w-12 h-12 text-gray-600" />
                </div>
                <p className="text-gray-500 text-sm">Image size limit: 125kb max</p>
            </div>

            <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md bg-white text-black border-gray-400"
                        />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={profile.lastName}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md bg-white text-black border-gray-400"
                        />
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md bg-white text-black border-gray-400"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={profile.phone}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md bg-white text-black border-gray-400"
                        />
                    </div>

                    {/* Birth Date */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Birth Date</label>
                        <input
                            type="date"
                            name="birthDate"
                            value={profile.birthDate}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md bg-white text-black border-gray-400"
                        />
                    </div>

                    {/* Company Name */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Company Name</label>
                        <input
                            type="text"
                            name="company"
                            value={profile.company}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md bg-white text-black border-gray-400"
                        />
                    </div>
                </div>

                <button
                    type="button"
                    className="bg-[#8B5CF6] hover:bg-[#b07ff0] text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
                >
                    Save Changes
                </button>
            </form>
        </SectionCard>
    );
};

export default Profile;
