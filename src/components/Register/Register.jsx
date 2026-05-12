import React, { use, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router";

import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const { signInWithGoogle, createUser } = use(AuthContext);
  const [err, setError] = useState(" ");
  const navigate = useNavigate();
  const location = useLocation();
  const form = location.state || "/";

  console.log(location, form);

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photo.value;

    const newUser = {
      name: name,
      email: email,
      profileImage: photo,
      rating: 0,
      partnerCount: 0,
    };
    console.log(name, email, password, photo);

    if (password.length < 6) {
      setError("Password should be at least 6 characters long");
    } else if (!/[A-Z]/.test(password)) {
      setError("Password should contain at least one uppercase letter");
      return;
    } else if (!/[a-z]/.test(password)) {
      setError("Password should contain at least one lowercase letter");
      return;
    } else {
      setError("");
    }

    createUser(email, password)
      .then((result) => {
        console.log(result);

        axios
          .post("http://localhost:3000/users", newUser)
          .then((data) => {
            console.log("after saving", data);
          })
          .catch((error) => {
            console.log(error);
          });

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your account has been created",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(form);
      })
      .catch((error) => {
        console.log(error);

      
          toast.warning("an account with this email already exists");
    
      });
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle()
      .then((result) => {
        console.log(result);

        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          profileImage: result.user.photoURL,
          rating: 0,
          partnerCount: 0,
        };
        console.log(newUser);

        axios
          .post("http://localhost:3000/users", newUser)
          .then((data) => {
            console.log("after saving", data);
            toast.success("login successful");
          })
          .then((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <ToastContainer></ToastContainer>
      <form onSubmit={handleRegister}>
        <fieldset className="fieldset text-black bg-white rounded-box w-sm shadow-xl p-4 my-10 mx-auto space-y-3 ">
          <label className="label">Name</label>
          <input
            required
            type="name"
            className="input bg-[#F5F5F5]"
            placeholder="Enter your name"
            name="name"
          />
          <label className="label">Email</label>
          <input
            required
            type="email"
            className="input bg-[#F5F5F5]"
            placeholder="Enter your email"
            name="email"
          />

          <label className="label">Password</label>
          <input
            required
            type="password"
            className="input bg-[#F5F5F5]"
            placeholder="Enter your password"
            name="password"
          />
          <p className="text-red-600 font-semibold">{err}</p>
          <label className="label">Photo URL</label>
          <input
            required
            type="url"
            className="input bg-[#F5F5F5]"
            placeholder="Enter your photo url"
            name="photo"
          />

          <p>
            Already have an account?{" "}
            <span className="underline font-semibold">
              <Link to="/login">Login</Link>
            </span>
          </p>
          <button className="btn btn-neutral mt-4">Register</button>

          <button
            className="btn bg-white text-black border-[#e5e5e5]"
            onClick={handleGoogleSignIn}
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            SignUp with Google
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
