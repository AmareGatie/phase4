import React from "react";
import Login from "./Login";
import bg from "../../../asset/bg-svg-f.svg"
import { useStateValue } from "../../../context/stateProvider";
function LoginPage() {
    // const [{ signUp }] = useStateValue();

  return (
    <div style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '1300px', // Use a comma to separate properties
      }} className="w-screen">
      <div className="py-11 m-auto w-10/12 flex justify-around items-center ">
        <Login className="w-1/2 " />

        {/* <Login/> */}
        <div className="w-1/2">
          <div>
            <p className=" text-orange-400 text-xs font-medium my-2">About</p>
            <h1 className=" font-medium text-2xl my-2">Evangadi Networkes Q&A</h1>
          </div>
          <div className=" text-sm">
            <p className="my-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum numquam blanditiis
            </p>
           
            <p>
              similique accusantium nemo autem. Veritatis obcaecati tenetur iure
              eius earum ut molestias architecto voluptate aliquam nihil,
              eveniet aliquid culpa officia aut!
            </p>
            <p className="my-2">
              eos sapiente officiis modi at sunt excepturi expedita sint? Sed
              quibusdam recusandae alias error harum maxime adipisci amet
              laborum. Perspiciatis minima nesciunt
            </p>
          </div>
          <div className=" text-center items-center my-3 py-3">
            <p className=" w-44 py-2  bg-orange-400">HOW IT WORKS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
