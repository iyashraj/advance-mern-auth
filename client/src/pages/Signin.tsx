import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signinFailureHandler,
  signinHandler,
  signinSuccessHandler,
} from "../redux/user/user.slice";
import { useDispatch, useSelector } from "react-redux";
import Oauth from "../components/Oauth";

interface FormData {
  [key: string]: string | undefined;
}

const Signin: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({});
  const { loading, error } = useSelector((state:any) => state.user);
  const dispatch = useDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(signinHandler());
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        dispatch(signinFailureHandler(res.statusText));
        return;
      }

      const data = await res.json();
      dispatch(signinSuccessHandler(data));
      navigate("/");
    } catch (error: any) {
      dispatch(signinFailureHandler(error));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Signin</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          className="bg-slate-100 p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Sign In"}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to="/signup">
          {" "}
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      {error && (
        <p className="text-red-500">{error || "Something went wrong!"}</p>
      )}
    </div>
  );
};

export default Signin;
