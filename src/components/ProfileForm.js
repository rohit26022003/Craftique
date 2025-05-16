import React, { useState } from "react";

const ProfileForm = ({ user, setUser, onCancel }) => {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
    onCancel(); // Go back to view mode
  };

  return (
    <div className="relative w-screen h-screen">
      {/* Full background image with object-cover */}
      <img
        src="https://img.freepik.com/free-vector/decorative-vintage-white-design-background_1017-27562.jpg?t=st=1744639483~exp=1744643083~hmac=6f260ead36bedead4f1eb7557b667ba4fa0887ca3c5934c4d8a2eccb5df9882d&w=1380"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      {/* Centered form */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white bg-opacity-90 shadow-lg rounded-xl p-8 space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 underline">
            EDIT PROFILE
          </h2>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border border-gray-300 p-3 rounded-md text-base"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-md text-base"
          />

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border border-gray-300 p-3 rounded-md text-base"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border border-gray-300 p-3 rounded-md text-base"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="bg-black text-white px-4 py-3 rounded-md w-full text-lg"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="border border-gray-400 px-4 py-3 rounded-md w-full text-lg"
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
