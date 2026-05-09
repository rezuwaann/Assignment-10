import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useLoaderData } from "react-router";

const CreateAProfile = () => {
  const { user } = use(AuthContext);
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/specificuser?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data[0]);
      });
  }, [user]);

  console.log(userInfo);
  const { name, email, profileImage, partnerCount, rating } = userInfo;

  return (
    <form onSubmit={handleCreateUser} className="text-black bg-white w-7/12 my-10 rounded-lg shadow-xl mx-auto p-7">
      <div className="flex flex-col lg:flex-row items-center justify-center p-5 gap-10">
        <img className="w-25 h-25 rounded-full" src={profileImage} alt="" />
        <div className="space-y-3">
          <h1 className="font-bold text-2xl">{name}</h1>

          <div className="flex flex-col lg:flex-row gap-3">
            <span className="text-gray-400 font-semibold">
              Rating : {rating}
            </span>
            <span className="text-gray-400 font-semibold ">
              Total Partner : {partnerCount}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex flex-col lg:flex-row justify-center gap-3 lg:gap-10 ">

          <div className="space-y-2 w-11/12 lg:w-1/2 ">
            <select defaultValue="Study Mode" className="select bg-white border-black" name="studymode">
              <option disabled={true}>Study Mode</option>
              <option>Online</option>
              <option>Offline</option>
            </select>
            
          </div>

          <div className="space-y-2 w-11/12 lg:w-1/2">
            <select defaultValue="Subject" className="select bg-white border-black" name="subject">
              <option disabled={true}>Subject</option>
              <option>English</option>
              <option>Math</option>
              <option>Programming</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-center gap-3 lg:gap-10 ">
          <div className="space-y-2 w-11/12 lg:w-1/2">
            <label className="label">Availability</label>
            <br />
            <input
              type="text"
              placeholder="Availability"
              className="input bg-white border-gray-500"
              name="availability"
            />
          </div>
          <div className="space-y-2 w-11/12 lg:w-1/2">
            <label className="label">Email</label>
            <br />
            <input
              type="text"
              readOnly
              value={email}
              className="input bg-white border-gray-500"
              name="email"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-center gap-3 lg:gap-10 ">
          <div className="space-y-2 w-11/12 lg:w-1/2">
         
            <input
              type="text"
              placeholder="Location"
              className="input bg-white border-gray-500"
              name="location"
            />
          </div>

          <div className="space-y-2 w-11/12 lg:w-1/2">
           <select defaultValue="Experience Level" className="select bg-white border-black" name="experience">
              <option disabled={true}>Experience Level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Expert</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button type="submit" className="btn mx-auto mt-5">
          Create Profile
        </button>
      </div>
    </form>
  );
};

export default CreateAProfile;
