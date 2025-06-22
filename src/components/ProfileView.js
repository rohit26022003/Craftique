import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImageToCloudinary } from "../utils/cloudinaryService";
import axios from "axios";

const ProfileView = ({ user, onEdit, setUser, onCancel }) => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userid");
  const token = localStorage.getItem("token");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImageToCloudinary(file);
      console.log(imageUrl);
      await axios.put(
        `http://localhost:8080/api/auth/${userId}/image`,
        { imgpath: imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser((prev) => ({ ...prev, image: imageUrl }));
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };
  console.log(user)

  const handleBack = () => {
    onCancel(); // back to home or previous
  };

  return (
    <div className="relative w-screen h-screen overflow-auto bg-[#dcdcdc]">
      <img
        src="https://img.freepik.com/free-vector/decorative-vintage-white-design-background_1017-27562.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
        <div className="relative w-full max-w-2xl bg-white bg-opacity-90 shadow-md rounded-xl p-6">
          <div
            onClick={handleBack}
            className="absolute top-4 left-4 text-3xl cursor-pointer text-gray-800"
          >
            ←
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold underline text-center mb-6">
            PROFILE
          </h2>

          <div className="flex flex-col items-center mb-6">
            <img
              src={
                user.imgpath ||
                "https://www.w3schools.com/howto/img_avatar.png"
              }
              alt="Profile"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover mb-2"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="text-blue-600 text-sm sm:text-base mb-4"
            >
              Change photo
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="space-y-4 text-base sm:text-lg">
            <div className="flex justify-between">
              <span className="font-medium">Name:</span>
              <span>{user.username}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Email:</span>
              <span>{user.email}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium">Phone:</span>
              <span>{user.phone}</span>
            </div>
          </div>

          <button
            onClick={onEdit}
            className="mt-8 bg-black text-white px-4 py-3 rounded-md w-full text-lg"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
