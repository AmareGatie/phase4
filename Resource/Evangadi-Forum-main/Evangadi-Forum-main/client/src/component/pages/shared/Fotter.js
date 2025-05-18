import React from "react";
import logo from "../../../asset/evangadi-logo-footer.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Fotter() {
  return (
    <div className="bg text-white">
      <div className="w-9/12 flex justify-between m-auto py-6">
        <div >
          <div>
            <img color="white" src={logo} />
          </div>
          <div>
            <FacebookIcon />
            <InstagramIcon />
            <YouTubeIcon />
          </div>
        </div>
        <dvi>
          <h2>Useful Link</h2>
          <p className=" text-xs font-light my-2">How it works</p>
          <p className=" text-xs font-light my-2">Terms and Service</p>
          <p className=" text-xs font-light my-2">Privacy and Policy</p>
        </dvi>
        <dvi>
          <h2>Contact Info</h2>
          <p className=" text-xs font-light my-2">Evangadi Networks</p>
          <p className=" text-xs font-light my-2">support@gmail.com</p>
          <p className=" text-xs font-light my-2">+1-202-386-2702</p>
        </dvi>
      </div>
    </div>
  );
}

export default Fotter;
