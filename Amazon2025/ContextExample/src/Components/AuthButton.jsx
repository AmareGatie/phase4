import React from "react";
import { useAuth } from "../context/AuthContext";

const AuthButton = () => {
  const { user, login, logout } = useAuth();
  return (
    <button onClick={user ? logout : login}>{user ? "Logout" : "Login"}</button>
  );
};

export default AuthButton;
