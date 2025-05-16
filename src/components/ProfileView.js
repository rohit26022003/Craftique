import React, { useRef } from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate

const ProfileView = ({ user, onEdit, setUser }) => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // initialize navigate

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prevUser) => ({ ...prevUser, image: imageUrl }));
    }
  };

  const handleBack = () => {
    navigate("/"); // navigate to homepage
  };

  return (
    <div className="relative w-screen h-screen overflow-auto bg-[#dcdcdc]"> {/* Changed bg color */}
      {/* Full background image */}
      <img
        src="https://img.freepik.com/free-vector/decorative-vintage-white-design-background_1017-27562.jpg?t=st=1744639483~exp=1744643083~hmac=6f260ead36bedead4f1eb7557b667ba4fa0887ca3c5934c4d8a2eccb5df9882d&w=1380"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      {/* Main content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
        <div className="relative w-full max-w-2xl bg-white bg-opacity-90 shadow-md rounded-xl p-6">
          
          {/* Back Arrow */}
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
              src={user.image}
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
              <span>{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Email:</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Address:</span>
              <span>{user.address}</span>
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
