



import React, {useEffect, lazy, useState} from 'react'
import { useLocation, Link } from 'react-router-dom'
import { VerifyPages } from '../Auth/authServices/requestBackAlongWithToken';
import { SET_ADMIN } from '../../redux/reduces/Auth_reducer/authSlice'
import { useDispatch } from "react-redux";
import { BACKEND_URL } from '../../config/config';
import "./product.css";



const NavBar = lazy(()=>import("../../components/navBar/NavBar"))
const SideBar = lazy(()=>import("../../components/sideBar/SideBar"))
const Footer = lazy(()=>import("../../components/footer/Footer"))




const ViewProduct = () => {

    const dispatch = useDispatch();
    
  let location = useLocation();
  
  const viewProductProfile = location.state;  
  

  //product discription
    let proDesc = viewProductProfile.productdesc
   let proDescArray = proDesc.split("|") ;

   let IngredientsArray = proDescArray[3]?.split("?");
   let healthBenefitsArray = proDescArray[4]?.split("?");
   

    const [images, setImages] = useState(viewProductProfile.productImg) 
    const [currentImage, setCurrentImage] = useState(images[0])
    //console.log("img", images)


   useEffect(() => {
              const fetchData = async () => { 
                try {
                  const data = await VerifyPages();
                  //console.log("date received", data.Admin); 
                  await dispatch(SET_ADMIN(data.Admin)); 
                } catch (error) { 
                  console.error(error);
                }
              };
          
              fetchData(); 
            }, []); 




  return (


     <div>
               {/* Begin page */}
           <div id="layout-wrapper">
           
             {/* navbar start */}
           <div>
              {/* default navbar */}
               <NavBar />
           </div>
           
           {/* navbar end */}
           
           {/* removeNotificationModal */}
           <div id="removeNotificationModal" className="modal fade zoomIn" tabindex="-1" aria-hidden="true">
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
                  <SideBar />
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
                        {viewProductProfile ?                                           
                        
                      <div className="col-xxl-4 col-md-6 col-lg-12">
                        <div className="card">

                          
                            <div className="card-header">
                                <h4 className="card-title mb-0 text-center text-uppercase ">{viewProductProfile.productName} {viewProductProfile.productWeight}</h4>
                            </div>  





                    <div className="tab-pane active product_view_img_container" id="pic-1"><img src={`${BACKEND_URL}/assets/product_upload_images/${currentImage}`} className='product_view_img' alt='img not support...'/></div>


                    {images ? (
                        <div className="image_grid"> 
                            {images.map((img, index) => (
                            <div key={index} className="image_item"> 
                                <img
                                src={`${BACKEND_URL}/assets/product_upload_images/${img}`}
                                className="product_view_img_small"
                                alt="img not supported..."
                                onClick={() => setCurrentImage(images[index])}
                                />
                            </div>
                            ))}
                        </div>
                        ) : (
                        <p>no images found...</p> 
                        )}
                          

                            <div className="card-body">
                                <p className="card-text">product Price : &#8377; {viewProductProfile.productPrice} /-</p>
                                <p className="card-text">product Category : {viewProductProfile.productCategory}</p>
                              
                                <p className="card-text">product Weight : {viewProductProfile.productWeight}</p>
                                
                               
                                <p className="card-text">no of peices : Approx. {viewProductProfile.noofPieces}</p>
                                
                                <p className="card-text">inStock : {(viewProductProfile.inStock != 0) ? <small>{viewProductProfile.inStock}</small> : <small style={{color:"red"}}>Out Of Stock</small>} </p>
                                
                                <h3 className="card-text">Product Description :</h3>
                               <p>{proDescArray[0]}</p>
                               <p>{proDescArray[1]}</p>

                               <h3>Product information</h3>
                               <p>{proDescArray[2]}</p>

                               <h3>Ingredients</h3>
                               {IngredientsArray && IngredientsArray.map((list, index)=>
                                <ul key={index}>
                                    <li>{list}</li>
                                </ul>
                               )}

                               <h3>Health benefits</h3>
                               {healthBenefitsArray && healthBenefitsArray.map((list, index)=>
                                <ul key={index}>
                                    <li>{list}</li>
                                </ul>
                               )}


                                
                            </div>

                           

                            <div className="card-footer">
                                <p className="card-text mb-0">
                                   update on {new Date(viewProductProfile.date).toDateString()}
                                </p>
                            </div>

                            <div className="view_btn">
                                <button className='btn btn-ghost-primary btn-link'><Link to="/productlist">Back</Link></button>
                            </div>
                        </div>
                      </div>

                      :
                      <div className="col-xxl-4 col-md-6 col-lg-12">
                      <div className="card">                    
                          <div className="card-header">
                              <h4 className="card-title mb-0">no data...</h4>
                          </div>                         
                      </div>
                    </div>
                        }
                                                                                     
                      </div>
                      {/* container-fluid */}
                  </div>
                  {/* End Page-content */}
           
                  <Footer />
              </div>
              {/* end main content*/}
           
           </div>
           {/* END layout-wrapper */}
           
           
           
           
           {/*start back-to-top*/}
           <button onclick="topFunction()" className="btn btn-danger btn-icon" id="back-to-top">
              <i className="ri-arrow-up-line"></i>
           </button>
           {/*end back-to-top*/}
           
           {/*preloader*/}
           {/* <div id="preloader">
              <div id="status">
                  <div className="spinner-border text-primary avatar-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                  </div>
              </div>
           </div> */}
           
           
           </div>











       
  )
}

export default ViewProduct