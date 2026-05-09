import React from 'react';
import { useLoaderData } from 'react-router';

const PartnerDetails = () => {
    const partner=useLoaderData();
    console.log(partner)
    return (
        
    <div className="my-10 w-11/12 lg:w-8/12 space-y-5 text-black mx-auto bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col gap-5 h-170 md:h-130">


      <div className="flex items-center gap-4">
        <img
          src={partner.profileImage}
          alt={partner.name}
          className="w-20 h-20 rounded-full object-cover border"
        />

        <div className="">
          <h1 className="text-2xl font-bold">{partner.name}</h1>
          <p className="text-lg text-gray-500">{partner.subject}</p>
        </div>

        <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md text-lg font-medium flex flex-col items-center justify-center">
          <span>⭐</span> <span>{partner.rating}</span>
        </div>
      </div>

      
      <div className="grid md:grid-cols-2 gap-4 text-lg">

        <div>
          <span className="font-bold text-black text-lg lg:text-2xl">Subject:</span>
          <p className="text-gray-600">{partner.subject}</p>
        </div>

        <div>
          <span className="font-bold text-black text-lg lg:text-2xl">Study Mode:</span>
          <p className="text-gray-600">{partner.studyMode}</p>
        </div>

        <div>
          <span className="font-bold text-black text-lg lg:text-2xl">Availability:</span>
          <p className="text-gray-600">{partner.availabilityTime}</p>
        </div>

        <div>
          <span className="font-bold text-black text-lg lg:text-2xl">Location:</span>
          <p className="text-gray-600">{partner.location}</p>
        </div>

        <div>
          <span className="font-bold text-black text-lg lg:text-2xl">Experience:</span>
          <p className="text-gray-600">{partner.experienceLevel}</p>
        </div>

        <div>
          <span className="font-bold text-black text-lg lg:text-2xl">Partners:</span>
          <p className="text-gray-600">{partner.partnerCount}</p>
        </div>

      </div>

      {/* Button */}
      <button className="w-full bg-black cursor-pointer text-white py-3 rounded-lg  font-medium">
        Send Partner Request
      </button>
    </div>

    );
};

export default PartnerDetails;