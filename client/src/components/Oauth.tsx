import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import React from "react";
import {app} from "../firebase"
import { signinSuccessHandler } from "../redux/user/user.slice";
import { useDispatch } from "react-redux";

const Oauth: React.FC = () => {
  const dispatch = useDispatch()

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      console.log(result)
      const res = await fetch(`/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email : result.user.email,
          photo: result.user.photoURL
        }),
      })
      const data = await res.json()
      dispatch(signinSuccessHandler(data))
    } catch (error) {
      console.log("coundnt logn with google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95">
      Continue with google
    </button>
  );
};

export default Oauth;
