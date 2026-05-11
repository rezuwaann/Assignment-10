import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

import axios from "axios";
import Swal from "sweetalert2";

const CreateAProfile = () => {
  const { user } = use(AuthContext);
  const [userInfo, setUserInfo] = useState({});

  const { name, email, profileImage, partnerCount, rating,location } = userInfo;

  console.log(userInfo.experienceLevel);
  const handleCreateUser = (e) => {
    e.preventDefault();
    const studymode = e.target.studymode.value;
    const availability = e.target.availability.value;
    const subject = e.target.subject.value;
    const experience = e.target.experience.value;
    const location = e.target.location.value;

    console.log(studymode, availability, subject, experience, location);

    const updatedData = {
      profileId: userInfo?._id,
      name: userInfo?.name,
      profileImage: userInfo?.profileImage,
      email: userInfo?.email,
      rating: userInfo?.rating,
      partnerCount: userInfo?.partnerCount,
      studyMode: studymode,
      availabilityTime: availability,
      subject: subject,
      experienceLevel: experience,
      location: location,
    };

    axios
      .post(`http://localhost:3000/studyprofiles`, updatedData)
      .then((res) => {
        console.log(res);
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your profile has been created",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "You already have a profile with this information",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => console.log(error));

axios
      .patch(`http://localhost:3000/specificuser?email=${email}`, {
        location:location,
    
      })
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/specificuser?email=${user?.email}`)
      .then((res) => setUserInfo(res.data[0]))
      .catch((error) => console.log(error));
    // console.log(userInfo)

    // fetch)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setUserInfo(data[0]);
    //   });
  }, [user]);

  console.log(userInfo);

  if (!userInfo) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  return (
    <div>
      <div className="gap-5 p-7 shadow-xl flex items-center hover:shadow-2xl my-5 bg-white w-7/12 mx-auto">
        <div>
          <img
            className="mx-5 h-20 w-20 lg:w-25  lg:h-25 outline-2 rounded-full border-gray-600 border-2"
            src={profileImage}
            alt=""
          />
        </div>

        <div>
          <h1 className="font-bold text-black lg:text-3xl mb-3">{name}</h1>
          <div className="flex flex-col lg:flex-row gap-3">
            <p className="text-white  font-semibold badge badge-neutral text-md p-3">
              Rating : {rating}
            </p>

            <p className="text-white  font-semibold  badge badge-neutral text-md p-5  lg:p-3">
              Total Partner : {partnerCount}
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleCreateUser}
        className="text-black bg-white w-7/12 mt-5 mb-10 rounded-lg shadow-xl hover:shadow-2xl mx-auto p-7"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black">
            {userInfo.subject ? "Update Profile" : "Create Profile"}
          </h2>

          <p className="text-gray-500 mt-2">
            Complete your study partner profile information
          </p>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col lg:flex-row justify-center gap-3 lg:gap-10 ">
            <div className="space-y-2 w-11/12 lg:w-1/2">
              <label className="label">Name</label>
              <br />
              <input
                type="text"
                readOnly
                value={name}
                className="input bg-white border-gray-500"
                name="name"
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
              <label htmlFor="" className="label">
                Location
              </label>
              <br />
              <input
                type="text"
                defaultValue={location || ""}
                placeholder="Location"
                className="input bg-white border-gray-500"
                name="location"
                required
              />
            </div>

            <div className="space-y-2 w-11/12 lg:w-1/2">
              <label className="label">Availability</label>
              <br />
              <input
                type="text"
                defaultValue={userInfo.availabilityTime || ""}
                placeholder="Availability"
                className="input bg-white border-gray-500"
                name="availability"
                required
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-center gap-3 lg:gap-10 ">
            <div className="space-y-2 w-11/12 lg:w-1/2">
              <select
                defaultValue="Subject"
                className="select bg-white border-black"
                name="subject"
              >
                <option disabled={true}>Subject</option>
                <option>English</option>
                <option>Math</option>
                <option>Programming</option>
              </select>
            </div>

            <div className="space-y-2 w-11/12 lg:w-1/2 ">
              <select
                defaultValue="Study Mode"
                className="select bg-white border-black"
                name="studymode"
                required
              >
                <option disabled={true}>Study Mode</option>
                <option>Online</option>
                <option>Offline</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 w-11/12 lg:w-1/2">
            <select
              defaultValue="Experience Level"
              className="select bg-white border-black"
              name="experience"
            >
              <option disabled={true}>Experience Level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Expert</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="btn mx-auto mt-5">
            Create Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAProfile;
