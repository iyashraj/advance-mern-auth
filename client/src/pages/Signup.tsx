import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";

interface FormData {
  [key:string] : string | undefined;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", formData);

      if (!res.ok) {
        throw new Error('Failed to sign up');
      }

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Signup</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>  
        <input
          type="text"
          placeholder="Username"
          className="bg-slate-100 p-3 rounded-lg border-slate-500"
          id="username"
          onClick={handleChange}
        />
        <input
          type="email"
          placeholder="Email Address"
          className="bg-slate-100 p-3 rounded-lg"
          id="email"
          onClick={handleChange}
        />
        <input
          type="text"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg"
          id="password"
          onClick={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/signin">
          {" "}
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
