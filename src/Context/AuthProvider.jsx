import React, { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebbase.init";
import { AuthContext } from "../Context/AuthContext";

const AuthProvider = () => {
//   const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const GoogleProvider = new GoogleAuthProvider();

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  const signInWithGoogle = () => {
    return signInWithPopup(auth, GoogleProvider);
  };

  const createUser=(email,password)=>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password)
  }

  const signInUser=(email,password)=>{
    return signInWithEmailAndPassword(email,password)
  }
  const authInfo = {
    signOutUser,
    signInWithGoogle,
    createUser,
    signInUser,
    loading,
    // user,
  };
  return <AuthContext value={authInfo}></AuthContext>;
};

export default AuthProvider;
