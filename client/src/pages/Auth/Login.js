import React, {useEffect, useState} from 'react'
import {useFormik} from "formik"
import * as Yup from "yup"
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { loginAdmin } from './authServices/authService';
import { useDispatch, useSelector } from "react-redux";
import {SET_ADMIN} from "../../redux/reduces/Auth_reducer/authSlice"
import { getCompanyData } from '../companyProfile/companyProfileService/companyProfileService';
import { BACKEND_URL } from '../../config/config';
import { getAdminData } from './authServices/authService';

const Login = () => {


          
    const AdminData = useSelector((state) => state.auth.admin);
       //handle PasswordEye
    
       const [inputTypePassword, setInputTypePassword] = useState("password");
       const [eye1, setEye1] = useState("eye");

       //company data
        const [companyData, setCompanyData] = useState([]);
   
        const companyLogo = companyData.map(data=>data.companyLogo);
        const companyName = companyData.map(data=>data.companyName);


        //fet admin data
        const [adminData, setAdminData] = useState([]);
   

     const navigate = useNavigate();

     const dispatch = useDispatch();


     

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



    const formik = useFormik({
    
            initialValues : {
                adminEmail : "",
                adminPassword : "",
            },
            validationSchema:Yup.object().shape({
    
    
                adminEmail : Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address').required("Email Required"),
    
                adminPassword : Yup.string().min(6, 'Password must be at least six characters long.').required("Password Required"),
    
                }),
            onSubmit:async(values, {resetForm})=>{
                //console.log("form values", values);
     
                try{
                    const data = await loginAdmin(values);
                        //console.log("date received", data.Admin);

                    if(localStorage.getItem("webtoken")){

                        await dispatch(SET_ADMIN(data.Admin));

                       navigate("/dashboard");
                    }
    
                    
                }
                catch(error){
    
                    console.error(error);
                }
            }
        })


        //go todashboard if token is available
        if(localStorage.getItem("webtoken")){
            return <Navigate to ="/dashboard"/>
        }
    


        
          //handle PasswordEye
    
        const handlePasswordEye = ()=>{
          
            if(inputTypePassword ==="password"){
                setInputTypePassword("text")
                setEye1("eye-slash")
    
            }
            else{
                setInputTypePassword("password")
                setEye1("eye")
    
            }
    
        }


  return (

    <div>
        <div className="bg-overlay bg-light"></div>
    
    <div className="account-pages">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-11">
                    <div className="auth-full-page-content d-flex min-vh-100 py-sm-5 py-4">
                        <div className="w-100">
                            <div className="d-flex flex-column h-100 py-0 py-xl-4">

                                <div className="text-center mb-5">
                                    <a href="index.html">
                                        <span className="logo-lg">
                                            
                                            <img src={companyData && `${BACKEND_URL}/assets/upload_images/${companyLogo}`} alt="" height="40" />
                                        </span>
                                    </a>
                                </div>

                                <div className="card my-auto overflow-hidden">
                                        <div className="row g-0">
                                            <div className="col-lg-6">
                                                <div className="p-lg-5 p-4">
                                                    <div className="text-center">
                                                        <h5 className="mb-0">Welcome Back !</h5>
                                                        <p className="text-muted mt-2">Sign in to continue to <span style={{color: "red"}}>{companyData ? companyName : "company"}</span>.</p>
                                                    </div>
                                                
                                                    <div className="mt-4">
                                                        <form onSubmit={formik.handleSubmit} className="auth-input">

                                                            <div className="mb-3">
                                                                <label for="email " className="form-label">Email</label>
                                                                <input type="email" className="form-control" id="email" placeholder="Enter email" name="adminEmail" value={formik.values.adminEmail} onChange={formik.handleChange}/>

                                                                {(formik.touched.adminEmail && formik.errors.adminEmail) && <small style={{color:"red"}}>{formik.errors.adminEmail}</small>}
                                                            </div>
                            
                                    
                                                           <div className="mb-2">
                                                                <label for="userpassword" className="form-label">Password</label>
                                                                <div className="position-relative auth-pass-inputgroup mb-3">
                                                                    <input type={inputTypePassword} className="form-control pe-5 password-input" placeholder="Enter password" id="password-input" name="adminPassword" value={formik.values.adminPassword} onChange={formik.handleChange}/>

                                                                    <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon" onClick = {()=>handlePasswordEye()}><i className={`las la-${eye1} align-middle fs-18`}></i></button>

                                                                </div>

                                                                {(formik.touched.adminPassword && formik.errors.adminPassword) && <small style={{color:"red"}}>{formik.errors.adminPassword}</small>}
                                                            </div>
                
                                                            <div className="form-check form-check-primary fs-16 py-2">
                                                                {/* <input className="form-check-input" type="checkbox" id="remember-check" /> */}
                                                                <div className="float-end">
                                                                    <Link to="/resetpassword" className="text-muted text-decoration-underline fs-14">Forgot your password?</Link>
                                                                </div>
                                                                {/* <label className="form-check-label fs-14" for="remember-check">
                                                                    Remember me
                                                                </label> */}
                                                            </div>
                
                                                            <div className="mt-2">
                                                                <button className="btn btn-primary w-100" type="submit">Log In</button>
                                                            </div>
                
                                                            <div className="mt-4 text-center">
                                                                <div className="signin-other-title">
                                                                    <h5 className="fs-15 mb-3 title">Sign in with</h5>
                                                                </div>
                                
                                                                <ul className="list-inline">
                                                                    <li className="list-inline-item">
                                                                        <a href="" className="social-list-item bg-primary text-white border-primary">
                                                                            <i className="mdi mdi-facebook"></i>
                                                                        </a>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <a href="" className="social-list-item bg-info text-white border-info">
                                                                            <i className="mdi mdi-twitter"></i>
                                                                        </a>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <a href="" className="social-list-item bg-danger text-white border-danger">
                                                                            <i className="mdi mdi-google"></i>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                
                                                            <div className="mt-4 text-center">
                                                                <p className="mb-0">Don't have an account ? <Link to="/register" className="fw-medium text-primary text-decoration-underline"> Signup now </Link> </p>
                                                            </div>
                                                        </form>
                                                    </div>
                                
                                                </div>
                                            </div>
                
                                            <div className="col-lg-6">
                                                <div className="d-flex h-100 bg-auth align-items-end">
                                                    <div className="p-lg-5 p-4">
                                                        <div className="bg-overlay bg-primary"></div>
                                                        <div className="p-0 p-sm-4 px-xl-0 py-5">
                                                            <div id="reviewcarouselIndicators" className="carousel slide auth-carousel" data-bs-ride="carousel">
                                                                <div className="carousel-indicators carousel-indicators-rounded">
                                                                    <button type="button" data-bs-target="#reviewcarouselIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                                                    <button type="button" data-bs-target="#reviewcarouselIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                                                    <button type="button" data-bs-target="#reviewcarouselIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                                                </div>
                                                            
                                                                 {/* end carouselIndicators  */}
                                                                <div className="carousel-inner mx-auto">
                                                                    <div className="carousel-item active">
                                                                        <div className="testi-contain text-center">
                                                                            <h5 className="fs-20 text-white mb-0">“I feel confident
                                                                                imposing
                                                                                on myself”
                                                                            </h5>
                                                                            <p className="fs-15 text-white-50 mt-2 mb-0">Vestibulum auctor orci in risus iaculis consequat suscipit felis rutrum aliquet iaculis
                                                                                augue sed tempus In elementum ullamcorper lectus vitae pretium Nullam ultricies diam
                                                                                eu ultrices sagittis.</p>
                                                                        </div>
                                                                    </div>
                    
                                                                    <div className="carousel-item">
                                                                        <div className="testi-contain text-center">
                                                                            <h5 className="fs-20 text-white mb-0">“Our task must be to
                                                                                free widening circle”</h5>
                                                                            <p className="fs-15 text-white-50 mt-2 mb-0">
                                                                                Curabitur eget nulla eget augue dignissim condintum Nunc imperdiet ligula porttitor commodo elementum
                                                                                Vivamus justo risus fringilla suscipit faucibus orci luctus
                                                                                ultrices posuere cubilia curae ultricies cursus.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                    
                                                                    <div className="carousel-item">
                                                                        <div className="testi-contain text-center">
                                                                            <h5 className="fs-20 text-white mb-0">“I've learned that
                                                                                people forget what you”</h5>
                                                                            <p className="fs-15 text-white-50 mt-2 mb-0">
                                                                                Pellentesque lacinia scelerisque arcu in aliquam augue molestie rutrum Fusce dignissim dolor id auctor accumsan
                                                                                vehicula dolor
                                                                                vivamus feugiat odio erat sed  quis Donec nec scelerisque magna
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* end carousel-inner */}
                                                            </div>
                                                            {/* end review carousel */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                    </div>
                                </div>
                                {/* end card */}
                                
                                <div className="mt-5 text-center">
                                    <p className="mb-0 text-muted">©
                                        <script>document.write(new Date().getFullYear())</script> {companyData ? companyName : "company"}. Crafted with <i className="mdi mdi-heart text-danger"></i> by {adminData ? adminData.map(data=>data.adminName) : "Admin"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end col */}
            </div>
            {/* end row */}
        </div>
        {/* end container */}
    </div>
    </div>
  )
}

export default Login