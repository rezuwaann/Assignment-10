import React from "react";

const HowItWorks = () => {
  return (
    <div>
      <h1 className="text-black font-bold text-3xl text-center">
        How It Works?
      </h1>

      <div className="flex flex-col md:flex-row gap-5 mt-10">
        
          <div className="bg-white rounded-2xl p-8 flex flex-col lg:w-4/12 shadow-xl hover:shadow-2xl">
            <div className="text-right mb-3">
              <span className="text-7xl font-bold text-black ">
                01
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Build Profile
              </h3>
              <p className="text-lg text-gray-500">
                Share your subjects and skills
              </p>
            </div>
          </div>
        
        
          <div className="bg-white rounded-2xl p-8 flex flex-col lg:w-4/12 shadow-xl hover:shadow-2xl">
            <div className="text-right mb-3">
              <span className="text-7xl font-bold text-black ">
                02
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Find Match
              </h3>
              <p className="text-lg text-gray-500">
                Search by subject or expertise
              </p>
            </div>
          </div>
        
        
          <div className="bg-white rounded-2xl p-8 flex flex-col lg:w-4/12 shadow-xl hover:shadow-2xl">
            <div className="text-right mb-3">
              <span className="text-7xl font-bold text-black ">
                03
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Collaborate
              </h3>
              <p className="text-lg text-gray-500">
                Learn and grow together
              </p>
            </div>
          </div>
        
        
      </div>

      {/* <div className="text-black mt-5">
        <div className=" border border-gray-300  rounded-box shadow-xl lg:flex gap-3">


          <div className="w-4/12 p-5">
           

            <div className="list-col-grow text-black space-y-3">
              <div className="font-bold text-2xl">CREATE</div>
              <div className="  font-semibold opacity-60 text-lg">
                Build Profile
              </div>
              <p className="font-semibold text-xl">Share your subjects and skills</p>
              
            </div>
          </div>

          <div className="w-4/12 p-5">
            

            <div className="list-col-grow text-black space-y-3">
              <div className="font-bold text-2xl">DISCOVER</div>
              <div className="text-lg  font-semibold opacity-60">
                Find Match
              </div>
              <p className="font-semibold text-xl">Search by subject or expertise</p>
             
            </div>
          </div>

          <div className="w-4/12 p-5">
           

            <div className="list-col-grow text-black space-y-3">
              <div className="font-bold text-2xl">CONNECT</div>
              <div className="text-lg  font-semibold opacity-60">
                Collaborate
              </div>
               <p className="font-semibold text-xl">Learn and grow together</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default HowItWorks;
