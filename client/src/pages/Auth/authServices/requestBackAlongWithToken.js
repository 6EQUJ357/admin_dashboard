import axios from "axios";
import { toast } from "react-toastify";



import { BACKEND_URL } from "../../../config/config";


//dashboard
export const VerifyPages = async () => {


  const token = localStorage.getItem("webtoken");
  //console.log("token", token);
      try {
        const response =await axios.get(`${BACKEND_URL}/api/protect/all`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        })
  
        if(response.data.status === 400){
          toast.error(response.data.message);
          window.location.href = '/';
          // alert(response.data.message);
          }
  
          if(response.data.status === 200){
           // toast.success(response.data.message);
           // console.log("tott", response.data);
  
            return response.data;	
      
            }
  
       
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(message);
      }
    };