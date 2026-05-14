import React, { use, useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Navbar = () => {
  const { user, signOutUser, setUser } = use(AuthContext);

  const [userInfo,setUserInfo]=useState({})
  const axiosSecure=useAxiosSecure();
  const navigate=useNavigate()
 if (user) {
   useEffect(()=>{
    axiosSecure.get(`https://studymate-server-sigma.vercel.app/specificuser?email=${user?.email}`)
    .then(res=>{
      setUserInfo(res.data[0])
    })
  
  },[user,axiosSecure])
 }
  // console.log('userinfo',userInfo);

  const handleSignOut = () => {
    signOutUser().then((result) => {
      setUser(null);
      console.log(result, user);
    });
  };

  const links = (
    <>
      <li className="text-black text-lg font-bold cursor-pointer hover:bg-black hover:text-white hover:rounded-lg p-1">
        <a href="/">Home</a>
      </li>
      <li className="text-black text-lg font-bold cursor-pointer hover:bg-black hover:text-white hover:rounded-lg p-1">
        <a href="/findpartners">Find Partners</a>
      </li>

      {user ? (
        <li className="text-black text-lg font-bold cursor-pointer hover:bg-black hover:text-white hover:rounded-lg p-1">
          <a href="/createaprofile">Create Partner Profile</a>
        </li>
      ) : null}
      {user ? (
        <li className="text-black text-lg font-bold cursor-pointer hover:bg-black hover:text-white hover:rounded-lg p-1">
          <a href="/connections">My Connections</a>
        </li>
      ) : null}

      {user ? (
        ''
      ) : (
        <li className="text-black text-lg font-bold cursor-pointer hover:bg-black hover:text-white hover:rounded-lg p-1">
          <a href="/login">Log In </a>
        </li>
      )}
      
      {user ? (
        ''
      ) : (
        <li className="text-black text-lg font-bold cursor-pointer hover:bg-black hover:text-white hover:rounded-lg p-1">
          <a href="/register"> Register</a>
        </li>
      )}
    </>
  );

 
  return (
    <div>
      <div className="navbar  shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost xl:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          <img onClick={()=>navigate('/')} src={logo} alt="" className="h-22 w-35" />
        </div>
        <div className="navbar hidden xl:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
        </div>


   
          <div className={user?'navbar-end':'hidden' }>
            <div className="dropdown dropdown-down dropdown-end">
              <div tabIndex={0} role="" className=" m-1">
                <img
                  src={userInfo?.profileImage}
                  className="w-10 h-10 lg:w-12 xl:w-14 lg:h-12 rounded-full border-gray-500 border-2"
                  alt=""
                />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-black rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                 <Link className="font-semibold" to={"/profile"}>
                    Profie
                  </Link>
                </li>
                <li>
                  <Link className="font-semibold" onClick={handleSignOut} to={"/login"}>
                    Log out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        {/* ) : (
          ""
        )} */}
      </div>
    </div>
  );
};
export default Navbar;
