import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: `http://localhost:3000`,
});

const useAxiosSecure = () => {
  // set token in the header for all api using useAxiosSecure

  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // request interceptor
    const requestInterceptor = instance.interceptors.request.use((config) => {
      console.log(config);

      const token = user?.accessToken;
      if (token) {
        config.headers.authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });

    // response interceptor
    const responseInterceptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const status = err.status;
        console.log("error inside the interceptor", err);
        if (status == 401 || status == 403) {
          signOutUser().then(() => {
            navigate("/register");
          });
        }
      },
    );
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.request.eject(responseInterceptor);
    };
  }, [user, navigate, signOutUser]);
  return instance;
};

export default useAxiosSecure;
