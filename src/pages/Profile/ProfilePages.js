import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import ProfileView from "../../components/ProfileView";
import ProfileForm from "../../components/ProfileForm";

const ProfilePage = () => {
  const navigate = useNavigate(); // Initialize navigate hook
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Bill Smith",
    email: "billsmith@example.com",
    address: "123 Maple St, Springfield, IL",
    phone: "(555) 123-4567",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  });

  // The onCancel function to navigate to home tab
  const handleCancel = () => {
    navigate("/home"); // This will navigate to the home page
  };

  return (
    <div className="py-8">
      {!isEditing ? (
        <ProfileView user={user} onEdit={() => setIsEditing(true)} onCancel={handleCancel} setUser={setUser} />
      ) : (
        <ProfileForm user={user} setUser={setUser} onCancel={() => setIsEditing(false)} />
      )}
    </div>
  );
};

export default ProfilePage;
