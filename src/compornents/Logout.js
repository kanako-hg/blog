import React from "react";
import { signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const Logout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login");
    });
  };
  return (
    <div>
      <p>ログアウトする</p>
      <button onClick={Logout}>Googleでログアウト</button>
    </div>
  );
};

export default Logout;
