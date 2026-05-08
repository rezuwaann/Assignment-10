import React from "react";
import pp1 from "../../assets/pp1.png";
import pp2 from "../../assets/pp2.png";
import pp3 from "../../assets/pp3.png";

const Reviews = () => {
  return (
    <div>
      <div>
        <h1 className="text-black font-bold text-3xl text-center">
          What Our Users Say
        </h1>
        <div className="flex lg:flex-row flex-col gap-5 mt-5">


          <div className=" bg-white  lg:w-4/12 p-5 space-y-8 shadow-xl rounded-2xl h-50">
            <div className="flex gap-3">
              <img src={pp1} alt="" className="h-12 w-12 rounded-full" />
              <div>
                <h1 className="text-black font-semibold">Rafiq Uddin</h1>
                <h2 className="text-gray-600 ">Computer Science Student</h2>
              </div>
            </div>
            <div>
              <p className="text-black font-bold">
                "Found an amazing partner for my Algorithms project. We ended up
                getting an A!"
              </p>
            </div>
          </div>

          <div className=" bg-white  lg:w-4/12 p-5 space-y-8 shadow-2xl rounded-2xl h-50">
            <div className="flex gap-3">
              <img src={pp2} alt="" className="h-12 w-12 rounded-full" />
              <div>
                <h1 className="text-black font-semibold">Tanvir Hasan</h1>
                <h2 className="text-gray-600 ">English Student</h2>
              </div>
            </div>
            <div>
              <p className="text-black font-bold">
                "Studying for the MCAT was so much easier with a buddy to keep
                me accountable."
              </p>
            </div>
          </div>

          <div className=" bg-white  lg:w-4/12 p-5 space-y-8 shadow-2xl rounded-2xl h-50">
            <div className="flex gap-3">
              <img src={pp3} alt="" className="h-12 w-12 rounded-full" />
              <div>
                <h1 className="text-black font-semibold">Mehedi Hasan</h1>
                <h2 className="text-gray-600 ">Economics Student</h2>
              </div>
            </div>
            <div>
              <p className="text-black font-bold">
                "The variety of people here is great. I found someone willing to
                teach me Econometrics!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
