import React from "react";
import { useSelector } from "react-redux";

const Profile: React.FC = () => {
  const { currentUser } = useSelector((root: any) => root.user);
  return (
    <div className="max-w-lg p-3 mx-auto">
      <div className="text-3xl font-semibold text-center my-7">
        Profile
      </div>
      <form className="flex flex-col gap-4">
        <img className="h-24 w-24 self-center cursor-pointer rounded-full object-cover shadow" src={currentUser?.profilePicture} alt="profile-picture" />
        <input type="text" id="username" placeholder="Username" defaultValue={currentUser?.username} className="bg-slate-100 rounded-lg p-3"/>
        <input type="email" id="email" placeholder="Email" defaultValue={currentUser?.email} className="bg-slate-100 rounded-lg p-3"/>
        <input type="password" id="password" placeholder="Password"  className="bg-slate-100 rounded-lg p-3"/>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Update</button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-700 font-semibold cursor-pointer ">Delete Account</span>
        <span className="text-red-700 font-semibold cursor-pointer ">Sign Out</span>
      </div>
    </div>
  );
};
export default Profile;
