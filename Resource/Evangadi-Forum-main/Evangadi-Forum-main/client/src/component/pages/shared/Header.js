import React from "react";
import logo from "../../../asset/evangadi-logo-home_300x300.webp";
import { Link,  useNavigate } from "react-router-dom";
import { useStateValue } from "../../../context/stateProvider";

export default function Header() {
    const [{username,user_id}, dispatch] = useStateValue()
    const navigate = useNavigate()

    const handleSignOut = () => {
        navigate("/")
        localStorage.removeItem("token");
        dispatch({
            type:"REMOVE_USER",
        })
        
    }
  
 
  return (
    <div className=" shadow-md">
      <div className=" w-3/4 flex justify-around text-center items-center m-auto p-4">
        <div className="flex p-1">
          <img src={logo} />
        </div>
        <div className="flex justify-around ">
          <Link to={"/all-questions"}>
            <p className=" text-sm font-medium mx-3 my-2">Home</p>
          </Link>
          <p className=" text-sm font-medium mx-3 my-2">How it Works</p>
          <button  onClick={handleSignOut} className=" text-sm cursor-pointer px-10 md:px-20 mx-3 bg-blue-600 rounded text-white">
            {user_id == null ? "SIGN IN": "SIGN OUT" }
          </button>
        </div>
      </div>
    </div>
  );
}
