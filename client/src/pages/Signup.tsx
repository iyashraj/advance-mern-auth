import React from "react";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl text-center font-semibold my-7">Signup</h1>
      <input />
      <input />
      <input />
      <button>Sign Up</button>
      <Link to="/signin">Have an account</Link>
    </div>
  );
};

export default Signup;
