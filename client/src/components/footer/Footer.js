import React, {useState, useEffect} from 'react'
import { getCompanyData } from '../../pages/companyProfile/companyProfileService/companyProfileService'
import { FRONTEND_URL } from '../../config/config';
import { getAdminData } from '../../pages/Auth/authServices/authService';

const Footer = () => {

     const [companyData, setCompanyData] = useState([]);
     //console.log("first", companyData);


    //fet admin data
    const [adminData, setAdminData] = useState([]);

      // get company data
            useEffect(()=>{  
            const fetchData = async () => {  
                try{
    
                        //get company data
                        const companyDetails = await getCompanyData();
                        await setCompanyData(companyDetails.companyData);
                       // console.log("date received", companyDetails.companyData);


                        //get admin data
                        const adminDetails = await getAdminData();
                        await setAdminData(adminDetails.adminData);
                        // console.log("date received", companyDetails.companyData);
                    
                }
                catch(error){
        
                    console.error(error);
                }
            };
        
            fetchData();  
            }, [])



  return (
    <footer className="footer">
    <div className="container-fluid">
        <div className="row">

            <div className="col-6 col-sm-6 col-lg-6">
                <script>document.write(new Date().getFullYear())</script> © <a href={FRONTEND_URL}>{companyData && companyData.map(data=>data?.companyName)}.</a>
            </div>

            <div className="col-6 col-sm-6 col-lg-6">
                <div className="text-sm-end  d-sm-block">
                <script>document.write(new Date().getFullYear())</script>Design & Developed By <i className="mdi mdi-heart text-danger"></i>
                <a href='' style={{color:"red", fontWeight:"bold"}} target='_blank'> {adminData ? adminData.map(data=>data.adminName) : "Admin"}</a>.  
                </div>
            </div>
        </div>
    </div>
</footer>
  )
}

export default Footer