import React, {useState} from 'react'
import {useFormik} from "formik"
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom';
import { registerAdmin } from "./authServices/authService";

const Register = () => {


    
    //handle PasswordEye

    const [inputTypePassword, setInputTypePassword] = useState("password");
    const [eye1, setEye1] = useState("eye");


    const [inputTypeConfiemPassword, setInputTypeConfiemPassword] = useState("password");
    const [eye2, setEye2] = useState("eye");


    const navigate = useNavigate();


    const [imagePreview, setImagePreview] = useState(null);
    
	const formik = useFormik({

		initialValues : {
			adminName : "",
            adminEmail : "",
            adminPassword : "",
            adminConfirmPassword : "",
            adminImg :""
		},
		validationSchema:Yup.object().shape({

            adminName : Yup.string().required("Name is Required"),

            adminEmail : Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address').required("Email Required"),

            adminPassword : Yup.string().min(6, 'Password must be at least six characters long.').required("Password Required"),

            adminConfirmPassword : Yup.string().oneOf([Yup.ref('adminPassword'), null],"Passwords didn't match ! ").required("Password Required"),

            adminImg: Yup.mixed()
            .required('Please select an image')
            .test('fileType', 'Only image files are allowed', (value) => {
                return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
            })
            .test('fileSize', 'File size should be below 1MB', (value) => {
                return value && value.size <= 1048576; // 1MB = 1048576 bytes
            })

            }),
		onSubmit:async(values, {resetForm})=>{
			//console.log("form values", values);


            const formData = new FormData();

            formData.append("adminName",values.adminName)
            formData.append("adminEmail",values.adminEmail)
            formData.append("adminPassword",values.adminPassword)
            formData.append("adminConfirmPassword", values.adminConfirmPassword)
            formData.append("adminImg",values.adminImg)
            
 
            try{
                const data = await registerAdmin(formData);
                //console.log("date received", data.Admin);

                navigate("/");

            }
            catch(error){

                console.error(error);
            }
		}
	})



    //image imagePreview handle
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImagePreview(URL.createObjectURL(file));
        formik.setFieldValue('adminImg', file);
      };
    


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




    const handleConfirmPasswordEye = ()=>{
        if(inputTypeConfiemPassword ==="password"){
            setInputTypeConfiemPassword("text")
            setEye2("eye-slash")

        }
        else{
            setInputTypeConfiemPassword("password")
            setEye2("eye")

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
    
                                    {/* <div className="text-center mb-5">
                                        <a href="index.html">
                                            <span className="logo-lg">
                                                <img src="assets/images/logo-dark.png" alt="" height="21" />
                                            </span>
                                        </a>
                                    </div>
     */}
                                    <div className="card my-auto overflow-hidden">
                                            <div className="row g-0">
                                                <div className="col-lg-6">
                                                    <div className="p-lg-5 p-4">
                                                        <div className="text-center">
                                                            <h5 className="mb-0">Create New Account</h5>
                                                            {/* <p className="text-muted mt-2">Get your free comapny account now</p> */}
                                                        </div>
                                                    
                                                        <div className="mt-4">



                                                            <form onSubmit={formik.handleSubmit} className="auth-input">

                                                                <div className="mb-3">
                                                                    <label for="username" className="form-label">Username</label>
                                                                    <input type="text" className="form-control" id="username" placeholder="Enter username" name="adminName" value={formik.values.adminName} onChange={formik.handleChange}/>

                                                                    {(formik.touched.adminName && formik.errors.adminName) && <small style={{color:"red"}}>{formik.errors.adminName}</small>}
                                                                </div>


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


                                                                <div className="mb-2">
                                                                    <label for="userpassword" className="form-label">Confirm Password</label>
                                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                                        <input type={inputTypeConfiemPassword} className="form-control pe-5 password-input" placeholder="Confirm password" id="password-input" name="adminConfirmPassword" value={formik.values.adminConfirmPassword} onChange={formik.handleChange}/>

                                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"  onClick = {()=>handleConfirmPasswordEye()}><i className={`las la-${eye2} align-middle fs-18`}></i></button>

                                                                   </div>

                                                                   {(formik.touched.adminConfirmPassword && formik.errors.adminConfirmPassword) && <small style={{color:"red"}}>{formik.errors.adminConfirmPassword}</small>}
                                                                </div>
                    
                                                                

                                                                <div className="dropzone mb-3"> 
                                                                    <div className="fallback">
                                                                        <input name="adminImg" type="file" onChange={handleImageChange} />
                                                                        {(formik.errors.adminImg && formik.touched.adminImg)  ? <div style={{color:"red"}}>{formik.errors.adminImg}</div> : null}

 
                                                                        {imagePreview && (
                                                                             <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                                                 <div className='position-relative m-3'>
                                                                                <img
                                                                                    src={imagePreview}
                                                                                    alt="Admin Image"
                                                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                                                />
                                                                                
                                                                                </div>
                                                                                
                                                                             </div>                                                                          
                                                                        )}                                                                                                                                          
                                                                    </div>
                                                                </div>

   
                                                                

                                                                {/* <div className="fs-16 pb-2">
                                                                    <p className="mb-0 fs-14 text-muted fst-italic">By registering you agree to the Invoika <a href="#" className="text-primary text-decoration-underline fst-normal fw-medium">Terms of Use</a></p>
                                                                </div> */}
                    
                                                                <div className="mt-2">
                                                                    <button className="btn btn-primary w-100" type="submit">Sign Up</button>
                                                                </div>
                    
                                                                <div className="mt-4 text-center">
                                                                    <div className="signin-other-title">
                                                                        <h5 className="fs-15 mb-3 title">Create account with</h5>
                                                                    </div>
                                    
                                                                    <ul className="list-inline">
                                                                        <li className="list-inline-item">
                                                                            <a href="javascript:void()" className="social-list-item bg-primary text-white border-primary">
                                                                                <i className="mdi mdi-facebook"></i>
                                                                            </a>
                                                                        </li>
                                                                        <li className="list-inline-item">
                                                                            <a href="javascript:void()" className="social-list-item bg-info text-white border-info">
                                                                                <i className="mdi mdi-twitter"></i>
                                                                            </a>
                                                                        </li>
                                                                        <li className="list-inline-item">
                                                                            <a href="javascript:void()" className="social-list-item bg-danger text-white border-danger">
                                                                                <i className="mdi mdi-google"></i>
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                    
                                                                <div className="mt-4 text-center">
                                                                    <p className="mb-0">Don't have an account ? <a href="auth-signin.html" className="fw-medium text-primary text-decoration-underline"> Signin </a> </p>
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
                                                                
                                                                    {/* end carouselIndicators */}
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
                                            <script>document.write(new Date().getFullYear())</script> {formik ? formik.values.adminName : "company"}. Crafted with <i className="mdi mdi-heart text-danger"></i> by company
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

export default Register