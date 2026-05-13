import React, { use, useEffect, useState } from "react";
import { Navigate, useLoaderData, useNavigate, useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
// import axios from "axios";
import Swal from "sweetalert2";
import { Bounce, toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";

const PartnerDetails = () => {
  const [partner, setPartner] = useState(null);
  const { user } = use(AuthContext);

  const { id } = useParams();

  const axiosSecure = useAxiosSecure();
  const [myStudyProfiles, setMyStudyProfiles] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.get(`/mystudyprofile?email=${user?.email}`).then((res) => {
      setMyStudyProfiles(res.data);
      // console.log(res.data[0])
      // console.log(user.photoURL)
    });
  }, [user,axiosSecure]);

  useEffect(() => {
    axiosSecure.get(`/mystudyprofile?id=${id}`).then((res) => {
      setPartner(res.data);
    });
  }, [id,axiosSecure]);
console.log('partner',partner)
console.log('profile',myStudyProfiles)
  // useEffect(()=>{
  //  const res= axiosSecure.get(`/users/${id}`)
  //  const partner=res.data;
  // console.log(myStudyProfiles);
  // console.log(partner);
  // .then(res=>{setPartner(res.data)
  //   console.log(partner)
  // });
  // },[id,axiosSecure])

  // const partner = useLoaderData();
  // console.log(partner);
  const partnerstotal = partner?.partnerCount;
  const [currentPartner, setCurrentPartner] = useState(null);

  useEffect(() => {
    if (partner?.partnerCount !== undefined) {
      setCurrentPartner(partner?.partnerCount);
    }
  }, [partner]);
  // console.log("partner ", partner?.partnerCount);

  //  console.log(user?.email)
  const handlePartnerRequest = async (e) => {
    e.preventDefault();
    const preferredSchedule = e.target.preferredSchedule.value;
    const goal = e.target.goal.value;

    const res = await axiosSecure.get(`/specificuser?email=${user?.email}`);

    const userInfo = res.data[0];

    const date = new Date().toLocaleDateString();
    // console.log(date);

    const newConnection = {
      connectorName: userInfo?.name,
      connectedName: partner?.name,
      connectorEmail: userInfo?.email,
      connectedEmail: partner?.email,
      connectorPartner: userInfo?.partnerCount,
      connectedPartner: partner?.partnerCount,
      connectedAt: date,
      studyMode: partner?.studyMode,
      availabilityTime: partner?.availabilityTime,
      subject: partner?.subject,
      experienceLevel: partner?.experienceLevel,
      connectedImage: partner?.profileImage,
      location: partner?.location,
      goal: goal,
      preferredSchedule: preferredSchedule,
      status: "pending",
    };

    // console.log("user", user);

    // console.log(res.data);
    const myConnections = userInfo.partnerCount;
    // console.log(myConnections);
    const partnerConnections = partner.partnerCount;

    if (myStudyProfiles.length === 0) {
      document.getElementById("my_modal_1").close();
      toast.error("Please create a profile first", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      setTimeout(() => {
        navigate("/createaprofile");
      }, 1500);
      return;
    }

    await axiosSecure.post(`/connections`, newConnection).then((res) => {
      document.getElementById("my_modal_1").close();

      if (res.data.insertedId) {
        toast.success("Request Sent", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        console.log(res.data);
        console.log(newConnection);

        axiosSecure.patch(`/specificuser?email=${user?.email}`, {
          partnerCount: myConnections + 1,
        });

        axiosSecure.patch(`/specificuser?email=${partner?.email}`, {
          partnerCount: partnerConnections + 1,
        });

        setCurrentPartner(currentPartner + 1);
      } else {
        document.getElementById("my_modal_1").close();

        console.log(res.data);
        toast.error("Already sent a request", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    });
  };
  // console.log(partner);

  if (!partner) {
    return (
      <div>
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="my-10 w-11/12 lg:w-8/12 space-y-5 text-black mx-auto bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col gap-5  md:h-130 h-150">
      <ToastContainer></ToastContainer>
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

      <div className="grid grid-cols-2 gap-4 text-lg">
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

      <form onSubmit={handlePartnerRequest}>
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
              <div method="dialog">
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
