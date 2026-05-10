import React, { useState } from "react";

const ConnectedCard = ({ connection }) => {
  const {
    connectedName,
    subject,
    connectedEmail,
    studyMode,
    availabilityTime,
    location,
    connectedAt,
  } = connection;
  console.log(connection);

  return (
   <div className="bg-white w-2/6 h-65 border border-gray-200 rounded-lg p-4  flex flex-col items-center justify-between text-black">

  {/* Left Side - Info */}
  <div className="flex-1 my-3 ">
    <div className="mb-2">
      <p className="text-lg font-semibold">{connectedName}</p>
      <p className="text-md text-gray-500">{connectedEmail}</p>
    </div>

    <div className="grid grid-cols-2 gap-6 gap-y-1 text-md">
      <div className="flex justify-between gap-4">
        <span className="text-gray-400">Subject</span>
        <span className="font-medium text-gray-800">{subject}</span>
      </div>

      <div className="flex justify-between gap-4">
        <span className="text-gray-400">Study Mode</span>
        <span className="font-medium text-gray-800">{studyMode}</span>
      </div>

      <div className="flex justify-between gap-4">
        <span className="text-gray-400">Availability</span>
        <span className="font-medium text-gray-800">{availabilityTime}</span>
      </div>

      <div className="flex justify-between gap-4">
        <span className="text-gray-400">Location</span>
        <span className="font-medium text-gray-800">{location}</span>
      </div>

      <div className="flex justify-between gap-4 col-span-1">
        <span className="text-gray-400">Connected At</span>
        <span className="font-medium text-gray-800">{connectedAt}</span>
      </div>
    </div>
  </div>

  {/* Right Side - Buttons */}
  <div className="flex  gap-2 ml-4">
    <button className="text-md font-medium text-white bg-black rounded px-3 py-1.5 hover:bg-gray-800 transition-colors">
      Update
    </button>
    <button className="text-md font-medium text-white bg-black rounded px-3 py-1.5 hover:bg-gray-800 transition-colors">
      Delete
    </button>
  </div>

</div>
  );
};

export default ConnectedCard;
