import axios from "axios";
import React, { useEffect, useState } from "react";

const Banner = () => {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`https://studymate-server-sigma.vercel.app/banner`)
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  
  // console.log(userInfo);

  return (
    <div>
      <div className="carousel w-full my-10">
        {userInfo.map((user, index) => {
          // Calculate the dynamic IDs based on the array index
          const currentSlideId = `slide${index + 1}`;
          const prevSlideId = `#slide${index === 0 ? userInfo.length : index}`;
          const nextSlideId = `#slide${index === userInfo.length - 1 ? 1 : index + 2}`;

          return (
            <div
              key={user._id || index}
              id={currentSlideId}
              className="carousel-item relative w-full"
            >
             
              <img
                src={user.imageUrl}
                className="w-full object-cover h-125" 
                alt={user.headline}
              />
              
             
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-10">
               
                <p className="text-sm md:text-lg font-semibold uppercase tracking-widest text-gray-200 mb-2">
                  {user.preHeadline}
                </p>
                
               
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-md">
                  {user.headline}
                </h1>
                
              
                <p className="text-base md:text-xl font-light max-w-2xl drop-shadow-sm">
                  {user.description}
                </p>
              </div>

            
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href={prevSlideId} className="btn btn-circle bg-white/20 hover:bg-white/50 border-none text-white">
                  ❮
                </a>
                <a href={nextSlideId} className="btn btn-circle bg-white/20 hover:bg-white/50 border-none text-white">
                  ❯
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Banner;