import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

// import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";

import useAxiosSecure from "../hooks/useAxiosSecure";

const UpdateProfile = () => {
  const { user ,loading} = use(AuthContext);
  const [userInfo, setUserInfo] = useState({});
const axiosSecure=useAxiosSecure()
  // console.log(userInfo.experienceLevel);

  

  useEffect(() => {
    axiosSecure
      .get(`https://studymate-server-sigma.vercel.app/specificuser?email=${user?.email}`)
      .then((res) => setUserInfo(res.data[0]))
      .catch((error) => console.log(error));
  }, [user,axiosSecure]);

  const { name, email, profileImage, partnerCount, rating } = userInfo || {};

 
    if (!user) {
    return (
      <div className="h-screen flex justify-center items-center text-black rounded-lg p-6">
        <div className="flex bg-white justify-center h-1/2 w-8/12 mx-auto items-center flex-col rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold">You are not logged in</h1>

          <p className="mt-3 text-lg text-gray-600">
            Please login or create an account to continue
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              to="/login"
              className="px-6 py-3 bg-black text-white rounded-lg font-semibold"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-6 py-3 border-2 border-black rounded-lg bg-black font-semibold text-white"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }


  if (loading) {
   return <div className="flex justify-center items-center min-h-screen text-black">
    <span className="loading loading-bars loading-xl"></span>
   </div>
  }

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-white text-black flex flex-col items-center justify-center py-12 px-6">
            <img
              src={profileImage}
              alt=""
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />

            <h1 className="text-4xl font-bold mt-5">{name}</h1>

            <p className="text-black mt-2 text-lg">{email}</p>

            <div className="flex gap-5 mt-6 flex-wrap justify-center">
              <div className="bg-black text-white px-6 py-3 rounded-xl shadow-md text-center">
                <h2 className="text-2xl font-bold">{rating}</h2>
                <p className="text-sm font-medium">Rating</p>
              </div>

              <div className="bg-black text-white px-6 py-3 rounded-xl shadow-md text-center">
                <h2 className="text-2xl font-bold">{partnerCount}</h2>
                <p className="text-sm font-medium">Partners</p>
              </div>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                readOnly
                className="input w-full mt-2 bg-white border border-gray-400 text-black"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Email</label>
              <input
                type="text"
                value={email}
                readOnly
                className="input w-full mt-2 bg-white border border-gray-400 text-black"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Rating</label>
              <input
                type="text"
                value={rating}
                readOnly
                className="input w-full mt-2 bg-white border border-gray-400 text-black"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">
                Total Partners
              </label>
              <input
                type="text"
                value={partnerCount}
                readOnly
                className="input w-full mt-2 bg-white border border-gray-400 text-black"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
