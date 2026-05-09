import React, { use } from "react";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  const { user, signOutUser, setUser, loading } = use(AuthContext);

  console.log(user);

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
          <a href="/login">Create Partner Profile</a>
        </li>
      ) : null}
      {user ? (
        <li className="text-black text-lg font-bold cursor-pointer hover:bg-black hover:text-white hover:rounded-lg p-1">
          <a href="/login">My Connections</a>
        </li>
      ) : null}

      {user ? (
        <li
          onClick={handleSignOut}
          className="text-black text-lg font-bold cursor-pointer hover:bg-black hover:text-white hover:rounded-lg p-1"
        >
          <a href="/login">Log out</a>
        </li>
      ) : (
        <li className="text-black text-lg font-bold cursor-pointer hover:bg-black hover:text-white hover:rounded-lg p-1">
          <a href="/login">Log In</a>
        </li>
      )}
    </>
  );

  if (loading) {
   return(  <div>
      <div className="navbar  shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-black">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <img src={logo} alt="" className="h-22 w-35" />
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
           
           <span className="loading loading-dots loading-xl text-black"></span>
          
          </ul>
        </div>
      </div>
    </div>)
  }
  
  return (
    <div>
      <div className="navbar  shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
          <img src={logo} alt="" className="h-22 w-35" />
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
           
              { links }
          
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
