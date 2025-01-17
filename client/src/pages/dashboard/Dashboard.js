import React, { lazy, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import "./dashboard.css"
import { VerifyPages } from '../Auth/authServices/requestBackAlongWithToken'
import { SET_ADMIN } from '../../redux/reduces/Auth_reducer/authSlice'
import { useDispatch } from 'react-redux'



const NavBar = lazy(()=>import("../../components/navBar/NavBar"))
const SideBar = lazy(()=>import("../../components/sideBar/SideBar"))
const Footer = lazy(()=>import("../../components/footer/Footer"))


const Dashboard = () => {

        const dispatch = useDispatch();
   

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
          }, [dispatch]); 


     //go todashboard if token is available
     if(!localStorage.getItem("webtoken")){
        return <Navigate to ="/dashboard"/>
    }

  return (
    <div>
           {/* Begin page */}
    <div id="layout-wrapper">

    {/* navbar start */}
    <div>

      <NavBar/>


    </div>

    {/* navbar end */}

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
        <div className="app-menu navbar-menu" >

            {/* side bar start*/}

            <SideBar/>
            {/* side bar end*/}

           
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
                            <div className="page-title-box d-sm-flex align-items-center justify-content-center">
                                <h1 className="mb-sm-0 mt-3" style={{fontWeight :"bolder"}}>Dashboard</h1>

                                {/* <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#a">Dashboard</a></li>
                                        <li className="breadcrumb-item active">Dashboard</li> 
                                    </ol>
                                </div> */}

                            </div>
                        </div>
                    </div>
                   {/* end page title */}

                    <div className='container'>
                        <center>
                            <div className='row mt-3' >

                                {/* <div className='col-12 col-lg-6 dbutton'>
                                <Link to="/quotations" className="btn btn-primary dlink" ><i className="las la-file-quotations"></i> All Quotations</Link> 
                                </div> */}

                                <div className='col-12 col-lg-6 dbutton'>
                                    <Link to="/companyprofile" className="btn btn-primary dlink" ><i className="las la-address-card"></i> Company Profile</Link> 
                                </div>
                               
                               

                                {/* <div className='col-12 col-lg-6 dbutton'>
                                <Link to="/addquotations" className="btn btn-primary dlink" ><i className="las la-receipt"></i> Create Quotation</Link>
                                </div> */}

                                <div className='col-12 col-lg-6 dbutton'>
                                <Link to="/category" className="btn btn-primary dlink" ><i className="las la-stream"></i> Categories</Link> 
                                </div>

                                <div className='col-12 col-lg-6 dbutton'>
                                <Link to="/weight" className="btn btn-primary dlink" ><i className="las la-stream"></i> Weight</Link> 
                                </div>

                               
                                <div className='col-12 col-lg-6 dbutton'>
                                    <Link to="/purchase" className="btn btn-primary dlink" ><i className="las la-credit-card"></i> Purchase Products</Link> 
                                </div>

                              


                                {/* <div className='col-12 col-lg-6 dbutton'>
                                <Link to="/quotation" className="btn btn-primary dlink" ><i className="las la-file-signature"></i> Quotation</Link> 
                                </div> */}


                                <div className='col-12 col-lg-6 dbutton'>
                                <Link to="/registeruser" className="btn btn-primary dlink" ><i className="las la-user"></i> Customer</Link> 
                                </div>

                                <div className='col-12 col-lg-6 dbutton'> 

                                    <div class="btn-group dlink">
                                        <button type="button" className="btn btn-primary dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false"><i className="las la-gifts"></i> Products</button>

                                        <ul class="dropdown-menu w-100">
                                            <li><Link to="/productlist" className="dropdown-item" ><i className="las la-list-alt"></i>&emsp;Product List</Link></li>
                                            <li><Link to="/addproduct" className="dropdown-item" ><i className="las la-plus-square"></i>&emsp;Add Product</Link></li>
                                            <li><Link to="/inventurylist" className="dropdown-item" ><i className="las la-list-alt"></i>&emsp;Inventory List</Link></li>
                                           
                                        </ul>
                                    </div>

                                </div>

                               

                            <div className='col-12 col-lg-6 dbutton'>

                                <div class="btn-group dlink">
                                    <button type="button" className="btn btn-primary dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false"><i className="las la-money-bill-wave"></i> Payments</button>

                                    <ul class="dropdown-menu w-100">
                                        <li><Link to="/salespayment" className="dropdown-item" ><i className="las la-rupee-sign"></i>&emsp;Sales Payments</Link></li>
                                        <li><Link to="/purchasepayment" className="dropdown-item" ><i className="las la-rupee-sign"></i>&emsp;Purchase Payments</Link></li>
                                    </ul>
                                </div>

                            </div>

                            </div>
                        </center>
                                    
                    </div>
                   

                   
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
    <button onClick="topFunction()" className="btn btn-danger btn-icon" id="back-to-top">
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

    {/* <div className="customizer-setting d-none d-md-block">
        <div className="btn-info btn-rounded shadow-lg btn btn-icon btn-lg p-2" data-bs-toggle="offcanvas" data-bs-target="#theme-settings-offcanvas" aria-controls="theme-settings-offcanvas">
            <i className='mdi mdi-spin mdi-cog-outline fs-22'></i>
        </div>
    </div> */}

   {/* Theme Settings */}
    {/* <div className="offcanvas offcanvas-end border-0" tabindex="-1" id="theme-settings-offcanvas">
        <div className="d-flex align-items-center bg-primary bg-gradient p-3 offcanvas-header">
            <h5 className="m-0 me-2 text-white">Theme Customizer</h5>

            <button type="button" className="btn-close btn-close-white ms-auto" id="customizerclose-btn" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-0">
            <div data-simplebar className="h-100">
                <div className="p-4">
                    <h6 className="mb-0 fw-semibold text-uppercase">Layout</h6>
                    <p className="text-muted">Choose your layout</p>

                    <div className="row">
                        <div className="col-4">
                            <div className="form-check card-radio">
                                <input id="customizer-layout01" name="data-layout" type="radio" value="vertical" className="form-check-input" />
                                <label className="form-check-label p-0 avatar-md w-100" for="customizer-layout01">
                                    <span className="d-flex gap-1 h-100">
                                        <span className="flex-shrink-0">
                                            <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                            </span>
                                        </span>
                                        <span className="flex-grow-1">
                                            <span className="d-flex h-100 flex-column">
                                                <span className="bg-light d-block p-1"></span>
                                                <span className="bg-light d-block p-1 mt-auto"></span>
                                            </span>
                                        </span>
                                    </span>
                                </label>
                            </div>
                           
                            <h5 className="fs-13 text-center mt-2">Vertical</h5>
                        </div>
                        <div className="col-4">
                            <div className="form-check card-radio">
                                <input id="customizer-layout02" name="data-layout" type="radio" value="horizontal" className="form-check-input" />
                                <label className="form-check-label p-0 avatar-md w-100" for="customizer-layout02">
                                    <span className="d-flex h-100 flex-column gap-1">
                                        <span className="bg-light d-flex p-1 gap-1 align-items-center">
                                            <span className="d-block p-1 bg-soft-primary rounded me-1"></span>
                                            <span className="d-block p-1 pb-0 px-2 bg-soft-primary ms-auto"></span>
                                            <span className="d-block p-1 pb-0 px-2 bg-soft-primary"></span>
                                        </span>
                                        <span className="bg-light d-block p-1"></span>
                                        <span className="bg-light d-block p-1 mt-auto"></span>
                                    </span>
                                </label>
                            </div>
                            <h5 className="fs-13 text-center mt-2">Horizontal</h5>
                        </div>
                       end col
                    </div>

                    <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Color Scheme</h6>
                    <p className="text-muted">Choose Light or Dark Scheme.</p>

                    <div className="colorscheme-cardradio">
                        <div className="row">
                            <div className="col-4">
                                <div className="form-check card-radio">
                                    <input className="form-check-input" type="radio" name="data-layout-mode" id="layout-mode-light" value="light" />
                                    <label className="form-check-label p-0 avatar-md w-100" for="layout-mode-light">
                                        <span className="d-flex gap-1 h-100">
                                            <span className="flex-shrink-0">
                                                <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                    <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                </span>
                                            </span>
                                            <span className="flex-grow-1">
                                                <span className="d-flex h-100 flex-column">
                                                    <span className="bg-light d-block p-1"></span>
                                                    <span className="bg-light d-block p-1 mt-auto"></span>
                                                </span>
                                            </span>
                                        </span>
                                    </label>
                                </div>
                                <h5 className="fs-13 text-center mt-2">Light</h5>
                            </div>

                            <div className="col-4">
                                <div className="form-check card-radio dark">
                                    <input className="form-check-input" type="radio" name="data-layout-mode" id="layout-mode-dark" value="dark" />
                                    <label className="form-check-label p-0 avatar-md w-100 bg-dark" for="layout-mode-dark">
                                        <span className="d-flex gap-1 h-100">
                                            <span className="flex-shrink-0">
                                                <span className="bg-soft-light d-flex h-100 flex-column gap-1 p-1">
                                                    <span className="d-block p-1 px-2 bg-soft-light rounded mb-2"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                                                </span>
                                            </span>
                                            <span className="flex-grow-1">
                                                <span className="d-flex h-100 flex-column">
                                                    <span className="bg-soft-light d-block p-1"></span>
                                                    <span className="bg-soft-light d-block p-1 mt-auto"></span>
                                                </span>
                                            </span>
                                        </span>
                                    </label>
                                </div>
                                <h5 className="fs-13 text-center mt-2">Dark</h5>
                            </div>
                        </div>
                    </div>

                    <div id="layout-width">
                        <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Layout Width</h6>
                        <p className="text-muted">Choose Fluid or Boxed layout.</p>

                        <div className="row">
                            <div className="col-4">
                                <div className="form-check card-radio">
                                    <input className="form-check-input" type="radio" name="data-layout-width" id="layout-width-fluid" value="fluid" />
                                    <label className="form-check-label p-0 avatar-md w-100" for="layout-width-fluid">
                                        <span className="d-flex gap-1 h-100">
                                            <span className="flex-shrink-0">
                                                <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                    <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                </span>
                                            </span>
                                            <span className="flex-grow-1">
                                                <span className="d-flex h-100 flex-column">
                                                    <span className="bg-light d-block p-1"></span>
                                                    <span className="bg-light d-block p-1 mt-auto"></span>
                                                </span>
                                            </span>
                                        </span>
                                    </label>
                                </div>
                                <h5 className="fs-13 text-center mt-2">Fluid</h5>
                            </div>
                            <div className="col-4">
                                <div className="form-check card-radio">
                                    <input className="form-check-input" type="radio" name="data-layout-width" id="layout-width-boxed" value="boxed" />
                                    <label className="form-check-label p-0 avatar-md w-100 px-2" for="layout-width-boxed">
                                        <span className="d-flex gap-1 h-100 border-start border-end">
                                            <span className="flex-shrink-0">
                                                <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                    <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                </span>
                                            </span>
                                            <span className="flex-grow-1">
                                                <span className="d-flex h-100 flex-column">
                                                    <span className="bg-light d-block p-1"></span>
                                                    <span className="bg-light d-block p-1 mt-auto"></span>
                                                </span>
                                            </span>
                                        </span>
                                    </label>
                                </div>
                                <h5 className="fs-13 text-center mt-2">Boxed</h5>
                            </div>
                        </div>
                    </div>

                    <div id="layout-position">
                        <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Layout Position</h6>
                        <p className="text-muted">Choose Fixed or Scrollable Layout Position.</p>

                        <div className="btn-group radio" role="group">
                            <input type="radio" className="btn-check" name="data-layout-position" id="layout-position-fixed" value="fixed" />
                            <label className="btn btn-light w-sm" for="layout-position-fixed">Fixed</label>

                            <input type="radio" className="btn-check" name="data-layout-position" id="layout-position-scrollable" value="scrollable" />
                            <label className="btn btn-light w-sm ms-0" for="layout-position-scrollable">Scrollable</label>
                        </div>
                    </div>
                    <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Topbar Color</h6>
                    <p className="text-muted">Choose Light or Dark Topbar Color.</p>

                    <div className="row">
                        <div className="col-4">
                            <div className="form-check card-radio">
                                <input className="form-check-input" type="radio" name="data-topbar" id="topbar-color-light" value="light" />
                                <label className="form-check-label p-0 avatar-md w-100" for="topbar-color-light">
                                    <span className="d-flex gap-1 h-100">
                                        <span className="flex-shrink-0">
                                            <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                            </span>
                                        </span>
                                        <span className="flex-grow-1">
                                            <span className="d-flex h-100 flex-column">
                                                <span className="bg-light d-block p-1"></span>
                                                <span className="bg-light d-block p-1 mt-auto"></span>
                                            </span>
                                        </span>
                                    </span>
                                </label>
                            </div>
                            <h5 className="fs-13 text-center mt-2">Light</h5>
                        </div>
                        <div className="col-4">
                            <div className="form-check card-radio">
                                <input className="form-check-input" type="radio" name="data-topbar" id="topbar-color-dark" value="dark" />
                                <label className="form-check-label p-0 avatar-md w-100" for="topbar-color-dark">
                                    <span className="d-flex gap-1 h-100">
                                        <span className="flex-shrink-0">
                                            <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                            </span>
                                        </span>
                                        <span className="flex-grow-1">
                                            <span className="d-flex h-100 flex-column">
                                                <span className="bg-primary d-block p-1"></span>
                                                <span className="bg-light d-block p-1 mt-auto"></span>
                                            </span>
                                        </span>
                                    </span>
                                </label>
                            </div>
                            <h5 className="fs-13 text-center mt-2">Dark</h5>
                        </div>
                    </div>

                    <div id="sidebar-size">
                        <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Sidebar Size</h6>
                        <p className="text-muted">Choose a size of Sidebar.</p>

                        <div className="row">
                            <div className="col-4">
                                <div className="form-check sidebar-setting card-radio">
                                    <input className="form-check-input" type="radio" name="data-sidebar-size" id="sidebar-size-default" value="lg" />
                                    <label className="form-check-label p-0 avatar-md w-100" for="sidebar-size-default">
                                        <span className="d-flex gap-1 h-100">
                                            <span className="flex-shrink-0">
                                                <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                    <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                </span>
                                            </span>
                                            <span className="flex-grow-1">
                                                <span className="d-flex h-100 flex-column">
                                                    <span className="bg-light d-block p-1"></span>
                                                    <span className="bg-light d-block p-1 mt-auto"></span>
                                                </span>
                                            </span>
                                        </span>
                                    </label>
                                </div>
                                <h5 className="fs-13 text-center mt-2">Default</h5>
                            </div>

                            <div className="col-4">
                                <div className="form-check sidebar-setting card-radio">
                                    <input className="form-check-input" type="radio" name="data-sidebar-size" id="sidebar-size-compact" value="md" />
                                    <label className="form-check-label p-0 avatar-md w-100" for="sidebar-size-compact">
                                        <span className="d-flex gap-1 h-100">
                                            <span className="flex-shrink-0">
                                                <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                    <span className="d-block p-1 bg-soft-primary rounded mb-2"></span>
                                                    <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                    <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                    <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                </span>
                                            </span>
                                            <span className="flex-grow-1">
                                                <span className="d-flex h-100 flex-column">
                                                    <span className="bg-light d-block p-1"></span>
                                                    <span className="bg-light d-block p-1 mt-auto"></span>
                                                </span>
                                            </span>
                                        </span>
                                    </label>
                                </div>
                                <h5 className="fs-13 text-center mt-2">Compact</h5>
                            </div>

                            <div className="col-4">
                                <div className="form-check sidebar-setting card-radio">
                                    <input className="form-check-input" type="radio" name="data-sidebar-size" id="sidebar-size-small" value="sm" />
                                    <label className="form-check-label p-0 avatar-md w-100" for="sidebar-size-small">
                                        <span className="d-flex gap-1 h-100">
                                            <span className="flex-shrink-0">
                                                <span className="bg-light d-flex h-100 flex-column gap-1">
                                                    <span className="d-block p-1 bg-soft-primary mb-2"></span>
                                                    <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                    <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                    <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                </span>
                                            </span>
                                            <span className="flex-grow-1">
                                                <span className="d-flex h-100 flex-column">
                                                    <span className="bg-light d-block p-1"></span>
                                                    <span className="bg-light d-block p-1 mt-auto"></span>
                                                </span>
                                            </span>
                                        </span>
                                    </label>
                                </div>
                                <h5 className="fs-13 text-center mt-2">Small (Icon View)</h5>
                            </div>

                            <div className="col-4">
                                <div className="form-check sidebar-setting card-radio">
                                    <input className="form-check-input" type="radio" name="data-sidebar-size" id="sidebar-size-small-hover" value="sm-hover" />
                                    <label className="form-check-label p-0 avatar-md w-100" for="sidebar-size-small-hover">
                                        <span className="d-flex gap-1 h-100">
                                            <span className="flex-shrink-0">
                                                <span className="bg-light d-flex h-100 flex-column gap-1">
                                                    <span className="d-block p-1 bg-soft-primary mb-2"></span>
                                                    <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                    <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                    <span className="d-block p-1 pb-0 bg-soft-primary"></span>
                                                </span>
                                            </span>
                                            <span className="flex-grow-1">
                                                <span className="d-flex h-100 flex-column">
                                                    <span className="bg-light d-block p-1"></span>
                                                    <span className="bg-light d-block p-1 mt-auto"></span>
                                                </span>
                                            </span>
                                        </span>
                                    </label>
                                </div>
                                <h5 className="fs-13 text-center mt-2">Small Hover View</h5>
                            </div>
                        </div>
                    </div>

                    <div id="sidebar-view">
                        <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Sidebar View</h6>
                        <p className="text-muted">Choose Default or Detached Sidebar view.</p>

                        <div className="row">
                            <div className="col-4">
                                <div className="form-check sidebar-setting card-radio">
                                    <input className="form-check-input" type="radio" name="data-layout-style" id="sidebar-view-default" value="default" />
                                    <label className="form-check-label p-0 avatar-md w-100" for="sidebar-view-default">
                                        <span className="d-flex gap-1 h-100">
                                            <span className="flex-shrink-0">
                                                <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                    <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                </span>
                                            </span>
                                            <span className="flex-grow-1">
                                                <span className="d-flex h-100 flex-column">
                                                    <span className="bg-light d-block p-1"></span>
                                                    <span className="bg-light d-block p-1 mt-auto"></span>
                                                </span>
                                            </span>
                                        </span>
                                    </label>
                                </div>
                                <h5 className="fs-13 text-center mt-2">Default</h5>
                            </div>
                            <div className="col-4">
                                <div className="form-check sidebar-setting card-radio">
                                    <input className="form-check-input" type="radio" name="data-layout-style" id="sidebar-view-detached" value="detached" />
                                    <label className="form-check-label p-0 avatar-md w-100" for="sidebar-view-detached">
                                        <span className="d-flex h-100 flex-column">
                                            <span className="bg-light d-flex p-1 gap-1 align-items-center px-2">
                                                <span className="d-block p-1 bg-soft-primary rounded me-1"></span>
                                                <span className="d-block p-1 pb-0 px-2 bg-soft-primary ms-auto"></span>
                                                <span className="d-block p-1 pb-0 px-2 bg-soft-primary"></span>
                                            </span>
                                            <span className="d-flex gap-1 h-100 p-1 px-2">
                                                <span className="flex-shrink-0">
                                                    <span className="bg-light d-flex h-100 flex-column gap-1 p-1">
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                        <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                    </span>
                                                </span>
                                            </span>
                                            <span className="bg-light d-block p-1 mt-auto px-2"></span>
                                        </span>
                                    </label>
                                </div>
                                <h5 className="fs-13 text-center mt-2">Detached</h5>
                            </div>
                        </div>
                    </div>
                    <div id="sidebar-color">
                        <h6 className="mt-4 mb-0 fw-semibold text-uppercase">Sidebar Color</h6>
                        <p className="text-muted">Choose a color of Sidebar.</p>

                        <div className="row">
                            <div className="col-4">
                                <div className="form-check sidebar-setting card-radio" data-bs-toggle="collapse" data-bs-target="#collapseBgGradient.show">
                                    <input className="form-check-input" type="radio" name="data-sidebar" id="sidebar-color-light" value="light" />
                                    <label className="form-check-label p-0 avatar-md w-100" for="sidebar-color-light">
                                        <span className="d-flex gap-1 h-100">
                                            <span className="flex-shrink-0">
                                                <span className="bg-white border-end d-flex h-100 flex-column gap-1 p-1">
                                                    <span className="d-block p-1 px-2 bg-soft-primary rounded mb-2"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-primary"></span>
                                                </span>
                                            </span>
                                            <span className="flex-grow-1">
                                                <span className="d-flex h-100 flex-column">
                                                    <span className="bg-light d-block p-1"></span>
                                                    <span className="bg-light d-block p-1 mt-auto"></span>
                                                </span>
                                            </span>
                                        </span>
                                    </label>
                                </div>
                                <h5 className="fs-13 text-center mt-2">Light</h5>
                            </div>
                            <div className="col-4">
                                <div className="form-check sidebar-setting card-radio" data-bs-toggle="collapse" data-bs-target="#collapseBgGradient.show">
                                    <input className="form-check-input" type="radio" name="data-sidebar" id="sidebar-color-dark" value="dark" />
                                    <label className="form-check-label p-0 avatar-md w-100" for="sidebar-color-dark">
                                        <span className="d-flex gap-1 h-100">
                                            <span className="flex-shrink-0">
                                                <span className="bg-primary d-flex h-100 flex-column gap-1 p-1">
                                                    <span className="d-block p-1 px-2 bg-soft-light rounded mb-2"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                                                    <span className="d-block p-1 px-2 pb-0 bg-soft-light"></span>
                                                </span>
                                            </span>
                                            <span className="flex-grow-1">
                                                <span className="d-flex h-100 flex-column">
                                                    <span className="bg-light d-block p-1"></span>
                                                    <span className="bg-light d-block p-1 mt-auto"></span>
                                                </span>
                                            </span>
                                        </span>
                                    </label>
                                </div>
                                <h5 className="fs-13 text-center mt-2">Dark</h5>
                            </div>

                        </div>
                        end row 
                    </div>

                </div>
            </div>

        </div>
        <div className="offcanvas-footer border-top p-3 text-center">
            <div className="row">
                <div className="col-6">
                    <button type="button" className="btn btn-light w-100" id="reset-layout">Reset</button>
                </div>
                <div className="col-6">
                    <a href="https://1.envato.market/Invoika-admin" target="_blank" rel='noreferrer' className="btn btn-primary w-100">Buy Now</a>
                </div>
            </div>
        </div>
    </div> */}

    
    </div>
  )
}

export default Dashboard