import React, { useEffect, useState } from "react";
import Partner from "../components/Partner/Partner";
import axios from "axios";

const FindPartners = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/studyprofiles")
      .then((res) =>{
        
        setUsers(res.data);
      // console.log(users)
    })
      .catch((error) => {
       console.log(error);
      });
  }, []);
  console.log(users);
  return (
    <div className="grid lg:grid-cols-2 w-11/12 mx-auto gap-3 p-5">
      {users.map((partner) => (
        <Partner key={partner._id} partner={partner}></Partner>
      ))}
    </div>
  );
};

export default FindPartners;
