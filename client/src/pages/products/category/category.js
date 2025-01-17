import React, { useEffect, useState, lazy } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import {useNavigate} from "react-router-dom"
import { VerifyPages } from '../../Auth/authServices/requestBackAlongWithToken'
import { SET_ADMIN } from '../../../redux/reduces/Auth_reducer/authSlice'
import { useDispatch } from "react-redux";
import { categoryForm, getcategoryData, editcategoryData, DeletecategoryData } from './categoryServices/categoryServices'


const NavBar = lazy(()=>import("../../../components/navBar/NavBar"))
const SideBar = lazy(()=>import("../../../components/sideBar/SideBar"))
const Footer = lazy(()=>import("../../../components/footer/Footer"))
const Pagination = lazy(()=>import("../../../components/pegination/pegination"))


const Category = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [search, setSearch] = useState("");

    const [Category, setCategory] = useState([]);






    const formik = useFormik({
        initialValues : {
            productCategory : ""      
        },
        validationSchema : Yup.object({
            productCategory : Yup.string().required("Enter Product Category")
        }),
        onSubmit : async(values, {resetForm})=>{
            //console.log("values", values)

            
                try{
                const data = await categoryForm(values);
                if(data){
                    navigate("/category")
                }
                //console.log("category", data.productCategory);
            }
            catch(error){

                console.error(error);
            }

            resetForm({values : ""});
        } 
    })


    //second formik for category update

    
    //update category

    const [modalData, setModalData] = useState("");

    const handleClickUpdateCategory = (data) => {

        // Update modal data state
        setModalData(data);
    };



    const formik1 = useFormik({
        initialValues : {
            editproductCategory : ""      
        },
        validationSchema : Yup.object({
            editproductCategory : Yup.string().required("Enter Product category")
        }),
        onSubmit : async(values, {resetForm})=>{
            //console.log("values", values)

            let filter = Category.filter((res)=>res.productCategory === modalData);
            let id = filter.map(list=> list._id)
            //console.log("first", id)

            
            try{
                const data = await editcategoryData(id, values);
                if(data){
                    navigate("/category");
                }
                //console.log("category", data.productCategory);
            }
            catch(error){

                console.error(error);
            }

            resetForm({values : ""});
        } 
    })


    
    //delete category  details

    const deletecategoryhandle = async(res)=>{
        let response = window.confirm(` Want to Delete This product category #${res.productCategory}`);

        if(response){
            let data = await DeletecategoryData(res._id);
            console.log("id", res._id)
            setCategory(data.productCategory);

        }
    }

    
     //verify company profile form
     useEffect(() => {
        const fetchData = async () => { 
          try {
            const data = await VerifyPages();
            //console.log("date received", data.Admin); 
            await dispatch(SET_ADMIN(data.Admin)); 


            //get company data
            const getCategoryData = await getcategoryData();
            await setCategory(getCategoryData.productCategory);
            console.log("date received", getCategoryData.productCategory);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData(); 
      }, []); 




       //   Begin Pagination
          const [currentItems, setCurrentItems] = useState([]);
          const [pageCount, setPageCount] = useState(0);
          const [itemOffset, setItemOffset] = useState(0);
          const itemsPerPage = 10;
        
          useEffect(() => {
            const endOffset = itemOffset + itemsPerPage;
        
            setCurrentItems(Category.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(Category.length / itemsPerPage));
          }, [itemOffset, itemsPerPage, Category]);
        
          const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % Category.length;
            setItemOffset(newOffset);
          };
      
          //Pagination ends
      





  return (
    <div>
        
   {/* Begin page */}
    <div id="layout-wrapper">

     <NavBar />


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
           
            {/* side bar start*/}

            <SideBar />
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
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Categoty</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#a">Categoty</a></li>
                                        <li className="breadcrumb-item active">Categoty Details</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                   {/* end page title */}

                    <div className="row pb-4 gy-3">
                        <div className="col-sm-4">
                            <button className="btn btn-primary addPayment-modal" data-bs-toggle="modal" data-bs-target="#addpaymentModal"><i className="las la-plus me-1"></i> Add Category</button>
                        </div>

                        <div className="col-sm-auto ms-auto">
                           <div className="d-flex gap-3">
                            <div className="search-box">
                                <input type="text" className="form-control" id="searchMemberList" placeholder="Search for Category" name='search' onChange={(e)=>setSearch(e.target.value)}/>
                                <i className="las la-search search-icon"></i>
                            </div>
                            {/* <div className="">
                                <button type="button" id="dropdownMenuLink1" data-bs-toggle="dropdown" aria-expanded="false" className="btn btn-soft-info btn-icon fs-14"><i className="las la-ellipsis-v fs-18"></i></button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink1">
                                    <li><a className="dropdown-item" href="#a">All</a></li>
                                    <li><a className="dropdown-item" href="#a">Last Week</a></li>
                                    <li><a className="dropdown-item" href="#a">Last Month</a></li>
                                    <li><a className="dropdown-item" href="#a">Last Year</a></li>
                                </ul>
                            </div> */}
                           </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="table-responsive table-card">
                                        <table className="table table-hover table-nowrap align-middle mb-0">
                                            <thead>
                                                <tr className="text-muted text-uppercase">
                                                    <th scope="col">Category</th>
                                                    <th scope='col'>Date</th>
                                                    <th scope="col" style={{width: "12%"}}>Action</th> 
                                                </tr>
                                            </thead>
        
                                            <tbody>
                                                {currentItems.length > 0 ? currentItems.filter(list=>list.productCategory.toLowerCase().startsWith(search.toLocaleLowerCase())).map(res=>
                                                <tr key={res._id}>
                                                   
                                                    <td>{res.productCategory}</td> 

                                                    <td>{new Date(res.Date).toDateString()}</td>   {/* .toDateString(), .toLocaleDateString(),  .toLocaleString()*/}
                                                    {/* <td><span className="badge badge-soft-success p-2">{res.userstatus}</span></td> */}

                                                    <td>
                                                        <ul className="list-inline hstack gap-2 mb-0">
                                                            {/* <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="View">
                                                                <button type='button' onClick={()=>viewUser(res)} className="btn btn-soft-info btn-sm d-inline-block">
                                                                    <i className="las la-eye fs-17 align-middle"></i>
                                                                </button>
                                                            </li> */}
                                                            <li className="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Edit">
                                                                <button type='button' className="btn btn-soft-info btn-sm d-inline-block" data-bs-toggle="modal" data-bs-target="#addcategoryModal" onClick={()=>handleClickUpdateCategory(res.productCategory)}>
                                                                    <i className="las la-pen fs-17 align-middle"></i>
                                                                </button> 
                                                                {/* <button className="btn btn-primary addPayment-modal" data-bs-toggle="modal" data-bs-target="#addpaymentModal"><i className="las la-plus me-1"></i> Add Category</button>  onClick={()=>EditCategory(res)}  */  }
                                                            </li>
                                                            <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Remove">
                                                                <button type='button' onClick={()=>deletecategoryhandle(res)} className="btn btn-soft-danger btn-sm d-inline-block">
                                                                    <i className="las la-file-download fs-17 align-middle"></i>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                )
                                                :
                                                <tr>
                                                    <h1>No Category Data Found...</h1>
                                                </tr>
                                                }
                                                
                                                
                                            </tbody>{/* end tbody */}
                                        </table>{/* end table */}
                                    </div>{/* end table responsive */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-center mb-4 gy-3">
                        <div className="col-md-5">
                            <p className="mb-0 text-muted">Showing <b>1</b> to <b>15</b> of <b>{currentItems.length}</b> results</p>
                        </div>

                        <div className="col-sm-auto ms-auto">
                            <Pagination 
                                onPageChange={handlePageClick} 
                                pageCount={pageCount}
                            />
                        </div>
                    </div>
                </div>
               {/* container-fluid */}
            </div>
           {/* End Page-content */}

           <Footer/>
        </div>
       {/* end main content*/}

    </div>
   {/* END layout-wrapper */}

   {/* Modal */}
    <div className="modal fade" id="addpaymentModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0">
                <div className="modal-header p-4 pb-0">
                    <h5 className="modal-title" id="createMemberLabel">Add Category</h5>
                    <button type="button" className="btn-close" id="createMemberBtn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body p-4">

                    <form autocomplete="on" id="memberlist-form" className="needs-validation" onSubmit={formik.handleSubmit} enctype="multipart/form-data">
                        <div className="row">
                            <div className="col-lg-12">
                                

                                <div className="mb-3 mt-4">
                                    <label htmlFor="productCategory" className="form-label">Category</label>
                                    <input type="text" className="form-control" id="productCategory" placeholder="Enter Product Type" name='productCategory' value={formik.values.productCategory} onChange={formik.handleChange} />
                                    <div className="invalid-feedback">Please Enter a Product Category.</div>
                                </div>
                                {(formik.touched.productCategory && formik.errors.productCategory) ? <small style={{color:"red"}}>{formik.errors.productCategory}</small> : null}


                                <div className="hstack gap-2 justify-content-end">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-success" id="addNewMember">Add Category</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
           {/*end modal-content*/}
        </div>
       {/*end modal-dialog*/}
    </div>{/*end modal*/}


    {/* model2 */}

    <div className="modal fade" id="addcategoryModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0">
                <div className="modal-header p-4 pb-0">
                    <h5 className="modal-title" id="createMemberLabel">Edit Category</h5>
                    <button type="button" className="btn-close" id="createMemberBtn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body p-4">

                    <form autocomplete="on" id="memberlist-form1" className="needs-validation" onSubmit={formik1.handleSubmit} >
                        <div className="row">
                            <div className="col-lg-12">
                                

                                <div className="mb-3 mt-4">
                                    <label htmlFor="productCategory" className="form-label">Category</label>
                                    <input type="text" className="form-control"  value={modalData} readOnly />
                                    <div className="invalid-feedback">Please Enter a Product Category.</div>
                                </div>

                                <div className="mb-3 mt-4">
                                    <input type="text" className="form-control" id="editproductCategory" placeholder="Enter New Category" name='editproductCategory' value={formik1.values.editproductCategory} onChange={formik1.handleChange} />
                                    <div className="invalid-feedback">Please Enter a Product Category.</div>
                                </div>
                                {(formik1.touched.editproductCategory && formik1.errors.editproductCategory) ? <small style={{color:"red"}}>{formik1.errors.editproductCategory}</small> : null} 


                                <div className="hstack gap-2 justify-content-end">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-success" id="addNewMember">Edit Category</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
           {/*end modal-content*/}
        </div>
       {/*end modal-dialog*/}
    </div>

    


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

export default Category