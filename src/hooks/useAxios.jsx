import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://server-de-study-nate.onrender.com`,
   
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
