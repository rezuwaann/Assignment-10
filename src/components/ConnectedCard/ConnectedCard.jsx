import axios from "axios";
import React, { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

const ConnectedCard = ({ connection, deleteCard }) => {
  const {
    _id,
    connectedName,
    subject,
    connectorEmail,
    connectedEmail,
    studyMode,
    availabilityTime,
    location,
    connectedAt,
    preferredSchedule,
    goal,
    status,
  } = connection;

  const handleDelete = async () => {


     toast.success("Deleted", {
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


    await deleteCard(_id);


    const connector = await axios.get(
      `http://localhost:3000/specificuser?email=${connectorEmail}`,
    );
    const connectorInfo = connector.data;
    const connected = await axios.get(
      `http://localhost:3000/specificuser?email=${connectedEmail}`,
    );
    const connectedInfo = connected.data;

    console.log(connectorInfo[0]?.partnerCount, connectedInfo[0]?.partnerCount);

    await axios.patch(
      `http://localhost:3000/specificuser?email=${connectorEmail}`,
      { partnerCount: connectorInfo[0]?.partnerCount - 1 },
    );
    await axios.patch(
      `http://localhost:3000/specificuser?email=${connectedEmail}`,
      { partnerCount: connectedInfo[0]?.partnerCount - 1 },
    );

    
  };

  const [currentSchedule, setPreferredSchedule] = useState(preferredSchedule);
  const [currentGoal, setGoal] = useState(goal);
  const [currentStatus, setStatus] = useState(status);

  console.log(connection);

  //   const [updatedInfo,setUpdatedInfo]=useState({})

  const updateValue = async (e) => {
    e.preventDefault();
    const newPreferredSchedule = e.target.preferredSchedule.value;
    const newGoal = e.target.goal.value;
    const status = e.target.status.value;

       if (status === "Status") {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Please select a status",
            showConfirmButton: false,
            timer: 1500,
          });
          document.getElementById(`my_modal_${_id}`).close();
          return;
        }

    const updatedInfo = {
      preferredSchedule: newPreferredSchedule,
      goal: newGoal,
      status: status,
    };
    //   }
    //   const handleUpdate = async (e) => {
    //     e.preventDefault();
    // const preferredSchedule = e.target.preferredSchedule.value;
    // const goal = e.target.goal.value;

    await axios
      .patch(`http://localhost:3000/connections?id=${_id}`, updatedInfo)
      .then((res) => {
        setPreferredSchedule(updatedInfo.preferredSchedule);
        setGoal(updatedInfo.goal);
        setStatus(updatedInfo.status);

     
        if (res.data.modifiedCount) {
            toast.success("Updated", {
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
          console.log(updatedInfo);
          console.log(res.data);
          document.getElementById(`my_modal_${_id}`).close();
        } else {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "You didint update anythting",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log("sorry", res.data);
          console.log(updatedInfo);
          document.getElementById(`my_modal_${_id}`).close();
        }
      });
  };

  return (
    <div className="bg-white  h-80 border border-gray-200 rounded-lg  shadow-xl hover:shadow-2xl flex flex-col items-center justify-between text-black">
      <ToastContainer></ToastContainer>
      <div className="flex-1 my-3 p-5">
        <div className="mb-2 flex justify-between">
          <div>
            <p className="text-lg font-semibold">{connectedName}</p>
            <p className="text-md text-gray-500">{connectedEmail}</p>
          </div>

          <div>
            <p className="rounded-lg bg-red-500 text-white p-2">
              {currentStatus}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 gap-y-2 text-md">
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
            <span className="font-medium text-gray-800">
              {availabilityTime}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Location</span>
            <span className="font-medium text-gray-800">{location}</span>
          </div>

          <div className="flex justify-between gap-4 col-span-1">
            <span className="text-gray-400">Connected At</span>
            <span className="font-medium text-gray-800">{connectedAt}</span>
          </div>

          <div className="flex justify-between gap-4 col-span-1">
            <span className="text-gray-400">Preffered Schedule</span>
            <span className="font-medium text-gray-800">{currentSchedule}</span>
          </div>
          <div className="flex justify-between gap-4 col-span-1">
            <span className="text-gray-400">Target Goal</span>
            <span className="font-medium text-gray-800">{currentGoal}</span>
          </div>
        </div>
      </div>

      <div className="flex  gap-2 ml-4 mb-5">
        <div className="text-md font-medium text-white bg-black rounded px-3 py-1.5 hover:bg-gray-800 transition-colors">
          <form onSubmit={updateValue} className="text-black">
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <div
              className="text-white"
              onClick={() =>
                document.getElementById(`my_modal_${_id}`).showModal()
              }
            >
              {" "}
              Update
            </div>
            <dialog id={`my_modal_${_id}`} className="modal ">
              <div className="bg-[#f5f5f5] p-5">
                <p className="py-4">
                  Update the information Here and press ESC to close
                </p>
<label htmlFor="" className="label">Preffered Location</label>
<br /><br />
                <input
                  type="text"
                  name="preferredSchedule"
                  className="input bg-white"
                  placeholder="Preferred schedule"
                  defaultValue={preferredSchedule}
                  required
                />
                <br />
                <br />
                <label htmlFor="" className="label">Goal</label>
<br /><br />
                <input
                  type="text"
                  name="goal"
                  className="input bg-white"
                  placeholder="Study Goal"
                  defaultValue={goal}
                  required
                />
                <br />
                <br />

                <select
                  defaultValue="Status"
                  className="select bg-white "
                  name="status"
                >
                  <option disabled={true}> Status</option>
                  <option>Pending</option>
                  <option>Accepted</option>
                  <option>Completed</option>
                </select>

                <br />
                <div className="modal-action">
                  <div method="dialog">
                    {/* if there is a button in div, it will close the modal */}
                    <button type="submit" className="btn">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </dialog>
          </form>
        </div>
        <button
          onClick={handleDelete}
          className="text-md font-medium text-white bg-black rounded px-3 py-1.5 hover:bg-gray-800 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ConnectedCard;
