import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const instance = axios.create({
  baseURL: `https://studymate-server-sigma.vercel.app`,
  withCredentials:true
});

const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
// const token = req.cookies.token;
  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      // ✅ Read the JWT your server issued, stored during login
      // const token = localStorage.getItem("token");
      // if (token) {
      //   config.headers.authorization = `Bearer ${token}`;
      // }
      return config;
    });

    const responseInterceptor = instance.interceptors.response.use(
      (res) => res,
      (err) => {
        const status = err?.response?.status; // ✅ err.response.status, not err.status
        console.log("error inside the interceptor", err);
        if (status === 401 || status === 403) {
          signOutUser().then(() => {
            navigate("/register");
          });
        }
        return Promise.reject(err); // ✅ Always re-reject so .catch() works downstream
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor); // ✅ was ejecting from .request twice
    };
  }, [signOutUser, navigate]);

  return instance;
};

export default useAxiosSecure;