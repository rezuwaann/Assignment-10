import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import { use } from "react";
import { AuthContext } from "../Context/AuthContext";

const RootLayOut = () => {
  const { loading } = use(AuthContext);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-black">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayOut;
