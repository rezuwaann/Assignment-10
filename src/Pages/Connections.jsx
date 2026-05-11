import axios from "axios";
import React, { use, useEffect, useState } from "react";
import ConnectedCard from "../components/ConnectedCard/ConnectedCard";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const Connections = () => {
  const { user } = use(AuthContext);
  const [connections, setConnections] = useState([]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/connections?id=${id}`)
      .then(() => {
        setConnections(
          connections.filter((connection) => connection._id !== id),
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/connections?email=${user?.email}`)
      .then((res) => setConnections(res.data))
      .catch((err) => console.log(err));
  }, [user]);
  // console.log(connections)
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 my-10 mx-auto w-11/12">
      {connections.map((connection, index) => (
        <ConnectedCard
          key={index + 1}
          deleteCard={handleDelete}
          connection={connection}
        ></ConnectedCard>
      ))}
    </div>
  );
};

export default Connections;
