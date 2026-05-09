import React from "react";

const Partner = ({ partner }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition p-5 flex flex-col gap-4 w-full border border-gray-100">

    
      <div className="flex items-center gap-4">
        <img
          src={partner.profileImage}
          alt={partner.name}
          className="w-14 h-14 rounded-full object-cover border"
        />

        <h2 className="text-lg font-semibold text-gray-800">
          {partner.name}
        </h2>
      </div>

      <div className="text-sm text-gray-600">
        <span className="font-medium text-gray-700">Subject:</span>{" "}
        {partner.subject}
      </div>

     
      <div className="text-sm text-gray-600">
        <span className="font-medium text-gray-700">Study Mode:</span>{" "}
        {partner.studyMode}
      </div>

     
      <div className="text-sm text-gray-600">
        <span className="font-medium text-gray-700">Experience:</span>{" "}
        {partner.experienceLevel}
      </div>

    
      <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition cursor-pointer">
        View Profile
      </button>
    </div>
  );
};

export default Partner;