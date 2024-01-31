import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Profile: React.FC = () => {
  const { currentUser } = useSelector((root: any) => root.user);
  return currentUser ? <div>Profile</div> : <Navigate to="/signin" />;
};
export default Profile;
