import React, { useEffect, useState } from "react";
import Partner from "../components/Partner/Partner";
import axios from "axios";
import { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { FaSearch } from "react-icons/fa";


const FindPartners = () => {
  const [users, setUsers] = useState([]);
  const [search,setSearch]=useState('')
  const { user } = use(AuthContext);

  const allUsers = users;

  const handleSearch = (e) => {
  
   setSearch(e.target.value.toLowerCase())
   

    // setUsers(filtered)
  };

 const filtered=users.filter((user) =>
  // console.log(user.subject)
    user.subject.toLowerCase().includes(search));
  const handleSortChnage = (e) => {
    e.preventDefault();
    const selected = e.target.value;

    if (selected === "Default") {
      defaultUsers();
    } else if (selected === "Experience (High to Low)") {
      highToLow();
    } else if (selected === "Experience (Low to High)") {
      lowToHigh();
    }
  };

  const defaultUsers = () => {
    axios
      .get(`http://localhost:3000/studyprofiles?email=${user?.email}`)
      .then((res) => {
        setUsers(res.data);
        // console.log(users)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const highToLow = () => {
    axios
      .get(`http://localhost:3000/hightolow?email=${user?.email}`)
      .then((res) => {
        setUsers(res.data);
        console.log(users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const lowToHigh = () => {
    axios
      .get(`http://localhost:3000/lowtohigh?email=${user?.email}`)
      .then((res) => {
        setUsers(res.data);
        console.log(users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/studyprofiles?email=${user?.email}`)
      .then((res) => {
        setUsers(res.data);
        // console.log(users)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  // console.log(users);
  return (
    <div>
      <div className="text-white flex mt-10 mb-5 items-center justify-between mx-auto w-11/12">
        <div className="flex items-center gap-2 ">
          <label className="font-semibold text-black w-30">Sort by:</label>
          <select
            onChange={handleSortChnage}
            defaultValue="Default"
            className="select bg-black select-bordered w-full"
          >
            <option>Default</option>
            <option>Experience (High to Low)</option>
            <option>Experience (Low to High)</option>
          </select>
        </div>

        <div className="w-full md:w-80 flex gap-2 text-white">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search partners..."
            className="bg-black text-white font-semibold input w-full"
          />
          
        </div>
      </div>

      <div className="grid lg:grid-cols-2 w-11/12 mx-auto gap-3 ">
        {filtered.map((partner) => (
          <Partner key={partner._id} partner={partner}></Partner>
        ))}
      </div>
    </div>
  );
};

export default FindPartners;
