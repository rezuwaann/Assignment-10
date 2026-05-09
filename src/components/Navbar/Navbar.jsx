import React from "react";
import logo from '../../assets/logo.png';

const Navbar = () => {

    const links=<>
    <li className="text-black text-lg font-bold cursor-pointer hover:bg-black hover:text-white hover:rounded-lg p-1">Home</li>
    <li className="text-black text-lg font-bold cursor-pointer hover:bg-black hover:text-white hover:rounded-lg p-1">Find Partner</li>
    <li className="text-black text-lg font-bold cursor-pointer hover:bg-black hover:text-white hover:rounded-lg p-1"><a href="/login">Login</a></li>
    </>
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
                stroke="currentColor"
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
        <img src={logo} alt="" className="h-22 w-35"/>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
          {links}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
