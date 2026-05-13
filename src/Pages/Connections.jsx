import axios from "axios";
import React, { use, useEffect, useState } from "react";
import ConnectedCard from "../components/ConnectedCard/ConnectedCard";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { Bounce, toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Connections = () => {
  const { user } = use(AuthContext);
  const [connections, setConnections] = useState([]);
const axiosSecure=useAxiosSecure()
  const handleDelete = (id) => {

 


    axiosSecure
      .delete(`/connections?id=${id}`)
      .then(() => {
        setConnections(
          connections.filter((connection) => connection._id !== id),
        );
      
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axiosSecure
      .get(`/connections?email=${user?.email}`)
      .then((res) => setConnections(res.data))
      .catch((err) => console.log(err));
  }, [user]);
  // console.log(connections)

  if (connections.length === 0) {
    return (
      <div className="h-[50vh] md:h-screen flex justify-center items-center text-black rounded-lg p-10 md:p-6 text-center">
        <div className="flex bg-white justify-center shadow-xl hover:shadow-2xl h-1/2 w-11/12 md:w-8/12 mx-auto items-center flex-col">
          <h1 className="text-2xl md:text-3xl font-bold">You don't have any connections</h1>
          <p className="mt-2  md:text-lg">
            Please <Link className="underline" to={'/createaprofile'}>create a profile (if you don't have one)</Link> and make connections
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="grid md:grid-cols-2  gap-10 my-10 mx-auto w-11/12">
     
      {connections.map((connection, index) => (
        <ConnectedCard
          key={index + 1}
          deleteCard={handleDelete}
          connection={connection}
        > </ConnectedCard>
      ))}
    </div>
  );
};

export default Connections;
