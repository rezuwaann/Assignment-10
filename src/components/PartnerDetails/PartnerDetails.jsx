import React, { use, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const PartnerDetails = () => {
  const { user } = use(AuthContext);
  const [exists, setExists] = useState(false);

  // const [formValue, setFormValue] = useState({});

  // const handleFormValue = (e) => {
  //   e.preventDefault();


  //   setFormValue({
     
  //   });
  // };
  const partner = useLoaderData();
  // console.log(partner);
  const partnerstotal = partner?.partnerCount;
  const [currentPartner, setCurrentPartner] = useState(partnerstotal);

  //  console.log(user?.email)
  const handlePartnerRequest = async (e) => {
    e.preventDefault();
    const preferredSchedule = e.target.preferredSchedule.value;
    const goal = e.target.goal.value;

    const res = await axios.get(
      `http://localhost:3000/specificuser?email=${user?.email}`,
    );

    const userInfo = res.data[0];
    // console.log(userInfo);
    // const connectedId = partner?._id;
    // console.log("connected ", connectedId);
    //  console.log(userInfo);
    // const connectorId = userInfo?._id;
    // console.log("connector ", connectorId);
    const date = new Date().toLocaleDateString();
    // console.log(date);

    const newConnection = {
      connectorName: user?.displayName,
      connectedName: partner?.name,
      connectorEmail: user?.email,
      connectedEmail: partner?.email,
      connectedAt: date,
      studyMode: userInfo?.studyMode,
      availabilityTime: userInfo?.availabilityTime,
      subject: userInfo?.subject,
      experienceLevel: userInfo?.experienceLevel,
      location: userInfo?.location,
 goal: goal,
      preferredSchedule: preferredSchedule,
      status: "pending",
    };

    // const connectionInfo = {
    //   ...newConnection,
    //   ...formValue,
    // };

    // const res = await axios.get(`http://localhost:3000/connections`, {
    //   params: { connectorEmail: user?.email, connectedEmail: partner?.email },
    // });
    // console.log(newConnection)

    console.log(res.data);
    const myConnections = userInfo.partnerCount;
    // console.log(myConnections);
    const partnerConnections = partner.partnerCount;
    // console.log(partnerConnections);

    //  axios.get(`http://localhost:3000/users/%{connectorId}`)
    //   .then()

    //   axios.patch(`http://localhost:3000/users/${connectedId}`)
    // console.log(exists);

    await axios
      .post(`http://localhost:3000/connections`, newConnection)
      .then((res) => {

  document.getElementById("my_modal_1").close();



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

          setCurrentPartner(currentPartner + 1);
        } else {


  document.getElementById("my_modal_1").close();

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
      {/* <button
      
        className="w-full bg-black cursor-pointer text-white py-3 rounded-lg  font-medium"
      >
       



        
      </button> */}

      <form onSubmit={handlePartnerRequest} >
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          {" "}
          Send Partner Request
        </button>
        <dialog id="my_modal_1" className="modal ">
          <div className="bg-[#f5f5f5] p-5">
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>

            <input
              type="text"
              name="preferredSchedule"
              className="input bg-white"
              placeholder="Preferred schedule"
              required
            />
            <br />
            <br />
            <input
              type="text"
              name="goal"
              className="input bg-white"
              placeholder="Study Goal"
              required
            />
            <br />

            <div className="modal-action">
              <div method="dialog" >
                {/* if there is a button in div, it will close the modal */}
                <button type="submit" className="btn">
                  Done
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </form>
    </div>
  );
};

export default PartnerDetails;
