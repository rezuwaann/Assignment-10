import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const TopPartners = () => {
  const [topPartners, setTopPartners] = useState([]);
  
  useEffect(() => {
    axios
      .get("https://studymate-server-sigma.vercel.app/topstudypartners")
      .then((res) => setTopPartners(res.data));
  }, []);

//   console.log(topPartners);

  return (
    <div className="text-black bg-white p-5 rounded-lg">
      <div className="flex justify-between my-2">
        <div>
          <h1 className="font-bold text-2xl">Highly Rated Partners</h1>
          <p className="font-semibold text-lg">
            Connect with top students in your field
          </p>
        </div>
        <div>
          <button className="bg-black font-semibold text-white p-2 rounded-lg "><Link to={'/findpartners'}>Browse All Partners</Link></button>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {topPartners.map((partner) => (
            <div
              key={partner?._id}
              className="p-5 hover:shadow-2xl rounded-xl shadow-lg bg-white  border border-gray-200"
            >
              <div className="mb-4 flex flex-col items-center text-center">
                <img
                  src={partner?.profileImage}
                  alt={partner?.name}
                  className="w-20 h-20 object-cover rounded-full border mb-3"
                />

                <p className="text-2xl font-semibold">{partner?.name}</p>
                <p className="text-sm text-gray-500">{partner?.email}</p>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-500 font-semibold">
                    ⭐ {partner?.rating}
                  </span>
                  <span className="text-gray-400 text-sm">
                    ({partner?.experienceLevel})
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subject</span>
                  <span className="font-medium">{partner?.subject}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Study Mode</span>
                  <span className="font-medium">{partner?.studyMode}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Availability</span>
                  <span className="font-medium">
                    {partner?.availabilityTime}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Location</span>
                  <span className="font-medium">{partner?.location}</span>
                </div>
              </div>

              <button className="w-full mt-5 py-2 rounded-lg bg-black text-white font-semibold cursor-pointer">
               <Link to={`/partner/${partner?._id}`}>View Profile</Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPartners;
