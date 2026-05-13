import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebbase.init";
import { AuthContext } from "../Context/AuthContext";
// import useAxiosSecure from "../hooks/useAxiosSecure";

const AuthProvider = ({ children }) => {
  // const axiosSecure = useAxiosSecure();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const GoogleProvider = new GoogleAuthProvider();

  // const signOutUser = () => {
  //   setLoading(true);
  //   return signOut(auth);
  // };

  const signOutUser = () => {
    setLoading(true);

    return fetch("https://studymate-server-sigma.vercel.app/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      return signOut(auth);
    });
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, GoogleProvider);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).catch(
      (error) => {
        console.log(error);
        setLoading(false);
      },
    );
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);

      if (currentUser) {
        console.log(currentUser);
        const loggedUser = { email: currentUser.email };

        fetch("https://studymate-server-sigma.vercel.app/jwt", {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loggedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("after gettting token ", data);
            // localStorage.setItem("token", data.token);
            setLoading(false);
          });
      } else {
        // localStorage.removeItem('token')
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authInfo = {
    signOutUser,
    signInWithGoogle,
    createUser,
    signInUser,
    loading,
    user,
    setUser,
  };
  console.log(user);
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
