import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header: React.FC = () => {
  const { currentUser } = useSelector((store: any) => store.user);
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center p-3 mx-auto max-w-6xl">
        <Link to="/">
          <h1 className="font-bold ">e-Yug</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          {currentUser ? (
            <Link to="/profile">
              <img
                className="h-7 w-7 rounded-full object-cover cursor-pointer"
                src={currentUser.profilePicture}
                alt="profile-picture"
              />
            </Link>
          ) : (
            <Link to="/signup">
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
