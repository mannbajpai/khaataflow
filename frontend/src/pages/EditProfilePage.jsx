
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { updateUser } from "../services/userService"; // Add your service for updating the profile
import Navbar from "../components/Navbar";

import fuser1 from "../assets/female-user-1.png"
import fuser2 from "../assets/female-user-2.png"
import muser1 from "../assets/male-user-1.png"
import muser2 from "../assets/male-user-2.png"
import { NotifyContainer, notifyError, notifySuccess, notifyWarning } from "../components/Notification";
const EditProfilePage = () => {
    const { user, setUser } = useAuth(); // Assuming setUser is available for updating user state
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: user.username,
        name: user.name,
        profilePhoto: user.profilePhoto || "/default-avatar.png",
        password: '',
        oldPassword: '',
    });

    const profilePhotos = [
        fuser1,
        fuser2,
        muser1,
        muser2,
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoSelect = (photo) => {
        setFormData({ ...formData, profilePhoto: photo });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!(formData.oldPassword === "" && formData.password === "") && !(formData.oldPassword !== "" && formData.password !== "")) {
                notifyWarning("Input all required fields");
                return;
            }
            const updatedUser = await updateUser(formData);
            setUser(updatedUser.data.user);
            notifySuccess("Profile updated successfully!");
            setTimeout(() => navigate('/me'), 3000);
        } catch (error) {
            console.error(error);
            notifyError("Failed to update profile.");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <div className="pt-4 px-4 bg-base-100 w-full">
                <Navbar />
            </div>
            <h1 className="text-3xl font-bold mb-4">Edit Profile</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-full lg:max-w-xl md:max-w-md"
            >
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-turquoise"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-turquoise"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Old Password</label>
                    <input
                        type="text"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-turquoise"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">New Passowrd</label>
                    <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-turquoise"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Profile Photo</label>
                    <div className="grid grid-cols-2 gap-4">
                        {profilePhotos.map((photo) => (
                            <img
                                key={photo}
                                src={photo}
                                alt="Profile option"
                                onClick={() => handlePhotoSelect(photo)}
                                className={`w-16 h-16 rounded-full cursor-pointer border-2 ${formData.profilePhoto === photo ? "border-turquoise-green" : ""
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <button
                        type="submit"
                        className="bg-turquoise-green text-white btn"
                    >
                        Update Profile
                    </button>
                    <button
                        type="button"
                        onClick={() => window.history.back()} // Navigate back to profile page
                        className="bg-red-400 text-white btn"
                    >
                        Cancel
                    </button>
                </div>
            </form>
            <NotifyContainer />
        </div>
    );
};

export default EditProfilePage;
