import axios from "axios";
import { toast } from "react-toastify";


import { BACKEND_URL } from "../../../config/config";

// export const validateEmail = (email) => {
//   return email.match(
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//   );
// };



// Register User
export const registerAdmin = async (formData) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/admin/register`,
        formData,
        { withCredentials: true }
      );

      if(response.data.status === 400){
        toast.error(response.data.message)        
      }

        if(response.data.status === 200){
          toast.success(response.data.message)

          //console.log("tott", response.data);
          
         // localStorage.setItem("webtoken", response.data.token);

          return response.data;	
    
          }

      // if (response.statusText === "OK") {
      //   toast.success("Admin Registered successfully...");
      // }
      // return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };


  
// Login User
export const loginAdmin = async (values) => {
  //console.log("service", values);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/admin/login`,
        values
      );


      if(response.data.status === 400){
        toast.error(response.data.message);
        // alert(response.data.message);
        }

        if(response.data.status === 200){
          toast.success(response.data.message);
         // console.log("tott", response.data);
          
          localStorage.setItem("webtoken", response.data.token);

          return response.data;	
    
          }

      // console.log("responcsss", response);
      // if (response.statusText === "OK") {
      //   console.log("res sta", response.statusText)
      //   alert(response.data.message);
      // }
     
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };
  


  // Logout User
  export const logoutAdmin = async () => {
    try {
      let response = await axios.get(`${BACKEND_URL}/api/admin/logout`);
      console.log("logout", response);

      if(response.data.status === 200){
        localStorage.clear();
        toast.success(response.data.message);
       // console.log("tott", response.data);      
  
        }

    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };


  //get admin data
  export const getAdminData = async () => {

  try {

    const response =await axios.get(`${BACKEND_URL}/api/admin/getAdmindata`);
    //console.log("responsssssse", response.data);

    if(response.data.status === 400){
      toast.error(response.data.message);
      // alert(response.data.message);
      }

      if(response.data.status === 200){
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



