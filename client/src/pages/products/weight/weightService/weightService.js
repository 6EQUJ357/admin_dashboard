import axios from "axios";
import { toast } from "react-toastify";

import {BACKEND_URL} from "../../../../config/config"





  // category post profile
  export const weightForm = async (values) => {
    //console.log("service", values);
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/weight/weightform`,
          values
        );
  
  
        if(response.data.status === 400){
          toast.error(response.data.message);
          // alert(response.data.message);
          }
  
          if(response.data.status === 200){
            toast.success(response.data.message);
           // console.log("tott", response.data);
  
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




//get category data
export const getWeightData = async () => {

      try {

        const response =await axios.get(`${BACKEND_URL}/api/weight/getweightdata`);
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



  // update profile
  export const editWeightData = async (id, values) => {
    //console.log("service", values);
      try {
        const response = await axios.put(
          `${BACKEND_URL}/api/weight/editweight/${id}`,
          values
        );
  
  
        if(response.data.status === 400){
          toast.error(response.data.message);
          // alert(response.data.message);
          }
  
          if(response.data.status === 200){
            toast.success(response.data.message);

          return response
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
    

//delete category data
export const DeleteWeightData = async (id) => {

    try {
      const response = await axios.get(`${BACKEND_URL}/api/weight/deleteweight/${id}`)

      if(response.data.status === 400){
        toast.error(response.data.message);
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