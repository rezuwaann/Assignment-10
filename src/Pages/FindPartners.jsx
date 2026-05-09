import React, { useEffect, useState } from "react";
import Partner from "../components/Partner/Partner";

const FindPartners = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
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
