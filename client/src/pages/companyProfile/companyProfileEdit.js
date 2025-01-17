import React, {useEffect, lazy, useState} from 'react'
import { VerifyPages } from '../Auth/authServices/requestBackAlongWithToken';
import { SET_ADMIN } from '../../redux/reduces/Auth_reducer/authSlice'
import { editCompanyData } from './companyProfileService/companyProfileService';
import { useLocation, Link,useNavigate } from 'react-router-dom'
import {useFormik} from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux";





const NavBar = lazy(()=>import("../../components/navBar/NavBar"))
const SideBar = lazy(()=>import("../../components/sideBar/SideBar"))
const Footer = lazy(()=>import("../../components/footer/Footer"))



const CompanyProfileEdit = () => {


    const navigate = useNavigate();
      const dispatch = useDispatch();
     //selected img URL
   const [imageURL, setImageURL] = useState('');


    let location = useLocation();
    
    const viewcompanyProfile = location.state;  

  

    
        const formik = useFormik({
            initialValues: {
                companyName : viewcompanyProfile.companyName,
                companyMobile_No : viewcompanyProfile.companyMobile_No,
                companyEmail : viewcompanyProfile.companyEmail,
                companyAddress : viewcompanyProfile.companyAddress,
                companyLogo : "",
                imageURL: "",
            },
            validationSchema: Yup.object().shape({
                companyName : Yup.string().required("Company Name Required"),
    
                companyMobile_No : Yup.string().required('Phone number is required').matches(/^\d+$/, 'Phone number must only contain numbers').min(10, 'Phone number must be exactly 10 digits').max(10, 'Phone number must be exactly 10 digits'),
    
                companyEmail : Yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address').required("Email Required"),
    
                companyAddress : Yup.string().required("Enter Address"),
    
                // companyLogo: Yup.mixed()
                //     .required('Please select an image')
                //     .test('fileType', 'Only image files are allowed', (value) => {
                //         return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
                //     })
                //     .test('fileSize', 'File size should be below 1MB', (value) => {
                //         return value && value.size <= 1048576; // 1MB = 1048576 bytes
                //     })
            }), 
            onSubmit: async(values, {resetForm}) => {
              console.log("company profile", values);
    
                const formData = new FormData();
                formData.append("companyName",values.companyName) 
                formData.append("companyMobile_No",values.companyMobile_No) 
                formData.append("companyEmail",values.companyEmail)
                formData.append("companyAddress",values.companyAddress)
                formData.append("companyLogo",values.companyLogo)
    
    
    
                 try{
                    const data = await editCompanyData(viewcompanyProfile._id, formData);
                    if(data){
                        navigate("/companyprofile");
                    }
    
                }
                catch(error){
    
                    console.error(error);
                }
                
            } 
        })
    
       
        const handleImageChange = (event) => {
            const file = event.target.files[0];
            formik.setFieldValue('companyLogo', file);
          
            // Create a URL for the selected image
    
            if (file && file.size <= 1024 * 1024) {
                formik.setFieldValue('companyLogo', file);
            
                const imageURL = URL.createObjectURL(file);
                setImageURL(imageURL);
              } 
              else {
                formik.setFieldValue('companyLogo', null);
                setImageURL('');
              }
          };



             // verify dashboard
                  useEffect(()=>{ 
                  const fetchData = async () => { 
                      try{
                          const data = await VerifyPages();
                              //console.log("date received", data.Admin);
              
                              await dispatch(SET_ADMIN(data.Admin));
                          
                      }
                      catch(error){
              
                          console.error(error);
                      }
                  };
              
                  fetchData();  
                  }, [])
    

  return (
    <div>
    {/* Begin page */}
<div id="layout-wrapper">
      <NavBar/>


{/* removeNotificationModal */}
<div id="removeNotificationModal" className="modal fade zoomIn" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-dialog-centered">
<div className="modal-content">
    <div className="modal-header">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="NotificationModalbtn-close"></button>
    </div>
    <div className="modal-body">
        <div className="mt-2 text-center">
            <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style={{width:"100px",height:"100px"}}></lord-icon>
            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                <h4>Are you sure ?</h4>
                <p className="text-muted mx-4 mb-0">Are you sure you want to remove this Notification ?</p>
            </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <button type="button" className="btn w-sm btn-light" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn w-sm btn-danger" id="delete-notification">Yes, Delete It!</button>
        </div>
    </div>

</div>{/* /.modal-content */}
</div>{/* /.modal-dialog */}
</div>{/* /.modal */}
{/* ========== App Menu ========== */}
<div className="app-menu navbar-menu">
    {/* LOGO */}

    {/* sidebar start */}
    <SideBar/>
    {/* sidebar end */}

</div>
{/* Left Sidebar End */}
{/* Vertical Overlay*/}
<div className="vertical-overlay"></div>

{/* ============================================================== */}
{/* Start right Content here */}
{/* ============================================================== */}
<div className="main-content">

    <div className="page-content">
        <div className="container-fluid">

            {/* start page title */}
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0">Update Company Profile</h4>

                        {/* <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><a href='#a'>Product</a></li>
                                <li className="breadcrumb-item active">New Product</li>
                            </ol>
                        </div> */}

                    </div>
                </div>
            </div>
            {/* end page title */}


            <div className="row">

            <div className="col-sm-4">
                    <Link to="/companyprofile" className="btn btn-primary addtax-modal"> Go To Company Profile</Link>
                    </div>
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                           <div className="p-2">
                            
                            {/* add product form */}
                            <form onSubmit={formik.handleSubmit} enctype="multipart/form-data">
                                
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label" for="productname">Company Name</label>
                                        <input id="productname" name="companyName" placeholder="Enter Product Name" type="text" className="form-control" {...formik.getFieldProps("companyName")}/>
                                        {formik.errors.companyName ? <small style={{color:"red"}}>{formik.errors.companyName}</small> : null}
                                    </div>
                                </div>

                                {/* <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label" for="product type">GST No.</label>
                                            <input id="product type" name="GST_No"  type="text" className="form-control" {...formik.getFieldProps("GST_No")}/>
                                            {formik.errors.GST_No ? <small style={{color:"red"}}>{formik.errors.GST_No}</small> : null}

                                    </div>
                                </div> */} 
                            </div>
                                
                                <div className="dropzone mb-3"> 
                                    <div className="fallback">
                                        <input name="companyLogo" type="file" onChange={handleImageChange}  />
                                        {/* {formik.errors.companyLogo ? <small style={{color:"red"}}>{formik.errors.companyLogo}</small> : null} */}
                                        <br /><br />
                                        {imageURL && <img className='previewImg' src={imageURL} alt='no preview...' />}

                                    </div>

                                
                                  {/* {image.length >0 ? image.map((image,id)=>
                                  <div key={id} style={{display:"inline-block", margin:"20px"}} >{<img src={image} alt='img not support' class="img-fluid img-thumbnail" style={{width:"150px", height:"150px"}}/>}</div>
                                  )
                                :
                                <p>Images are not available in DataBase...</p>}
                                     */}
                                </div>
                                
                                <div className="row">

                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label" for="price">Mobile No.</label>
                                            <input id="price" name="companyMobile_No" placeholder="Enter Price" type="text" className="form-control" {...formik.getFieldProps("companyMobile_No")} />
                                            {formik.errors.companyMobile_No ? <small style={{color:"red"}}>{formik.errors.companyMobile_No}</small> : null}

                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                        <label className="form-label" for="no.of items">Email</label>
                                            <input id="no.of items" name="companyEmail"  type="companyEmail" className="form-control" {...formik.getFieldProps("companyEmail")}/>
                                            {formik.errors.companyEmail ? <small style={{color:"red"}}>{formik.errors.companyEmail}</small> : null}

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                                                                                    
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" for="productdesc">Address</label>
                                    <textarea className="form-control" id="productdesc" name='companyAddress' placeholder="Enter Description" rows="4" {...formik.getFieldProps("companyAddress")}></textarea>
                                    {formik.errors.companyAddress ? <small style={{color:"red"}}>{formik.errors.companyAddress}</small> : null}

                                </div>

                                <div className="hstack gap-2 mt-4">
                                <button type="submit" className="btn btn-primary">Update Company Profile</button>
                            </div> 
                            </form>

                           

                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* container-fluid */}
    </div>
    {/* End Page-content */}

    < Footer/>
</div>
{/* end main content*/}

</div>
{/* END layout-wrapper */}

{/*start back-to-top*/}
<button onclick="topFunction()" className="btn btn-danger btn-icon" id="back-to-top">
<i className="ri-arrow-up-line"></i>
</button>
{/*end back-to-top*/}

{/* preloader
<div id="preloader">
<div id="status">
    <div className="spinner-border text-primary avatar-sm" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
</div>
</div> */}



</div>
  )
}

export default CompanyProfileEdit