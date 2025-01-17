import axios from "axios";
import { toast } from "react-toastify";

import {BACKEND_URL} from "../../../config/config"






  // company post profile
  export const productForm = async (formData) => {
    //console.log("service", values);
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/product/productform`,
          formData
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
  
       
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(message);
      }
    };




//get company data
export const getProductData = async () => {

      try {

        const response =await axios.get(`${BACKEND_URL}/api/product/getproductdata`);
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
  export const editProductData = async (id, formData) => {
    //console.log("service", values);
      try {
        const response = await axios.put(
          `${BACKEND_URL}/api/product/editproductdata/${id}`,
          formData
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
    

//delete company data
export const DeleteProductData = async (id) => {

    try {
      const response = await axios.get(`${BACKEND_URL}/api/product/deleteproductdata/${id}`)

      if(response.data.status === 400){
        toast.error(response.data.message);
        // alert(response.data.message);
        }

        if(response.data.status === 200){
         toast.success(response.data.message);
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