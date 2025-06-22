import React, { useState } from "react";
import axios from "axios";

const ProfileForm = ({ user, setUser, onCancel }) => {
  const [formData, setFormData] = useState({
    username: user.username || "",
    email: user.email || "",
    phone: user.phone || ""
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
      
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8080/api/auth/edit/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      setUser(res.data);
      onCancel(); // Go back to view mode
    } catch (err) {
      console.error("Failed to update user", err);
    }
  };

  return (
    <div className="relative w-screen h-screen">
      {/* Background image */}
      <img
        src="https://img.freepik.com/free-vector/decorative-vintage-white-design-background_1017-27562.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      {/* Form Container */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white bg-opacity-90 shadow-lg rounded-xl p-8 space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center underline">
            EDIT PROFILE
          </h2>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border p-3 rounded text-base"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-3 rounded text-base"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border p-3 rounded text-base"
          />

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-black text-white px-4 py-3 rounded w-full text-lg"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="border border-gray-400 px-4 py-3 rounded w-full text-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
