import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://studymate-server-sigma.vercel.app`,
   
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
