import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileView from "../../components/ProfileView";
import ProfileForm from "../../components/ProfileForm";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userid");
  const token = localStorage.getItem("token"); // assuming JWT token

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/auth/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleProfileUpdate = async (updatedUser) => {
    try {
      await axios.put(`http://localhost:8080/api/auth/edit/${userId}`, updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="py-8">
      {!isEditing ? (
        <ProfileView
          user={user}
          setUser={setUser}
          onEdit={() => setIsEditing(true)}
          onCancel={handleCancel}
        />
      ) : (
        <ProfileForm
          user={user}
          setUser={handleProfileUpdate}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
