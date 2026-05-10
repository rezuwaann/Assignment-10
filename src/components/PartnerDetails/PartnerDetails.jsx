import React, { use, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const PartnerDetails = () => {
  const { user } = use(AuthContext);
  const partner = useLoaderData();
  const partnerstotal=partner?.partnerCount;
const[currentPartner,setCurrentPartner]=useState(partnerstotal)


  //  console.log(user?.email)
  const handlePartnerRequest = async () => {
    const res = await axios.get(
      `http://localhost:3000/specificuser?email=${user?.email}`,
    );

    const userInfo = res.data[0];
    // console.log(userInfo);
    const connectedId = partner?._id;
    // console.log("connected ", connectedId);
    //  console.log(userInfo);
    const connectorId = userInfo?._id;
    // console.log("connector ", connectorId);
    const date = new Date().toLocaleDateString();
    // console.log(date);

    const newConnection = {
      connectorId: connectorId,
      connectedId: connectedId,
      connectorEmail:user?.email,
      connectedEmail:partner?.email,
      connectedAt: date,
    };

    const myConnections = userInfo.partnerCount;
    console.log(myConnections);
    const partnerConnections = partner.partnerCount;
    console.log(partnerConnections);

    //  axios.get(`http://localhost:3000/users/%{connectorId}`)
    //   .then()

    //   axios.patch(`http://localhost:3000/users/${connectedId}`)

    axios
      .post(`http://localhost:3000/connections`, newConnection)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your request has been sent",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(res.data);
          console.log(newConnection);

          axios.patch(
            `http://localhost:3000/specificuser?email=${user?.email}`,
            { partnerCount: myConnections + 1 },
          );
          axios.patch(
            `http://localhost:3000/specificuser?email=${partner?.email}`,
            { partnerCount: partnerConnections + 1 },
          );

          setCurrentPartner(currentPartner+1)
        } else {
          console.log(res.data);
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Your have already sent request",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  // console.log(partner);

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
          <span className="font-bold text-black text-lg lg:text-2xl">
            Subject:
          </span>
          <p className="text-gray-600">{partner.subject}</p>
        </div>

        <div>
          <span className="font-bold text-black text-lg lg:text-2xl">
            Study Mode:
          </span>
          <p className="text-gray-600">{partner.studyMode}</p>
        </div>

        <div>
          <span className="font-bold text-black text-lg lg:text-2xl">
            Availability:
          </span>
          <p className="text-gray-600">{partner.availabilityTime}</p>
        </div>

        <div>
          <span className="font-bold text-black text-lg lg:text-2xl">
            Location:
          </span>
          <p className="text-gray-600">{partner.location}</p>
        </div>

        <div>
          <span className="font-bold text-black text-lg lg:text-2xl">
            Experience:
          </span>
          <p className="text-gray-600">{partner.experienceLevel}</p>
        </div>

        <div>
          <span className="font-bold text-black text-lg lg:text-2xl">
            Partners:
          </span>
          <p className="text-gray-600">{currentPartner}</p>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={handlePartnerRequest}
        className="w-full bg-black cursor-pointer text-white py-3 rounded-lg  font-medium"
      >
        Send Partner Request
      </button>
    </div>
  );
};

export default PartnerDetails;
