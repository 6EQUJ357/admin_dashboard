import React, {useState, useEffect, lazy} from 'react'
import { VerifyPages } from '../Auth/authServices/requestBackAlongWithToken'
import { SET_ADMIN } from '../../redux/reduces/Auth_reducer/authSlice'
import { useDispatch } from "react-redux";
import { productForm, DeleteProductData } from './productService/productService';
import { getcategoryData } from './category/categoryServices/categoryServices';
import { getWeightData } from './weight/weightService/weightService';
import { useNavigate, Link } from 'react-router-dom';
import "./product.css"
import { useFormik } from 'formik';
import * as Yup from "yup";



const NavBar = lazy(()=>import("../../components/navBar/NavBar"))
const SideBar = lazy(()=>import("../../components/sideBar/SideBar"))
const Footer = lazy(()=>import("../../components/footer/Footer"))


const AddProduct = () => {

  
      const dispatch = useDispatch();
      let navigate = useNavigate();
    
        const formik = useFormik({
        initialValues : {
            productName : "",
            productCategory : "",
            productPrice : "",
            productWeight : "",
            inStock : "", 
            productdesc : "",
            noofPieces : "",
            productImg : []
            
        },
        validationSchema:Yup.object().shape({
            productName : Yup.string().required("Product Name Required"),
            productCategory : Yup.string().required("Specify Category"),
            productPrice : Yup.string().required("Price Required").matches(/^\d+$/, 'product price only contain numbers'),
            productWeight : Yup.string().required("Specify Weight"),
            inStock : Yup.string().required("Specify Stock in hand").matches(/^\d+$/, 'product price only contain numbers'),
            productdesc : Yup.string().required("Product description Required"),
            noofPieces : Yup.string().required("No of pieces Required"),
            productImg :  Yup.array()
            // .of(
            //     Yup.mixed()
            //       .test('fileType', 'Only image files are allowed', (value) => {
            //         return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
            //       })
            //       .test('fileSize', 'File size should be below 1MB', (value) => {
            //         return value && value.size <= 1048576; // 1MB = 1048576 bytes
            //       })
            //   )
        }),
        onSubmit :async(values, {resetForm})=>{
            //console.log("product data", values);

            const formData = new FormData();
            for (let i = 0; i < values.productImg.length; i++) {
                formData.append('productImg', values.productImg[i]);
            }

            formData.append("productName",values.productName)
            formData.append("productCategory",values.productCategory)
            formData.append("productPrice", values.productPrice)
            formData.append("productWeight", values.productWeight)
            formData.append("inStock",values.inStock)
            formData.append("productdesc", values.productdesc)
            formData.append("noofPieces", values.noofPieces)



             try{
                const data = await productForm(formData);
                console.log("product form", data.productData);
                navigate("/productlist");

            }
            catch(error){

                console.error(error);
            }

            //resetForm({values : ""});

        }
 
    })




    const handleImageChange = (e)=>{
        const selectedImages = Array.from(e.target.files);
        formik.setFieldValue('productImg', [...formik.values.productImg, ...selectedImages]);
      
    }
    // console.log(typeof formik.values.productImg)
    // console.log(formik.values.productImg)
    // console.log(formik.values.productImg[0])
    // console.log(typeof formik.values.productImg[0])
    // console.log("productImg name", formik.values.productImg[0])

    const handleDeleteProductproductImg = (index)=>{
        formik.setFieldValue(
            'productImg',
            formik.values.productImg.filter((_, i) => i !== index)
          );
    }

   
     //get category details
     const [Category, setCategory] = useState([]);


    //get category details
    const [Weight, setWeight] = useState([]);


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
                 //console.log("date received", getCategoryData.productCategory);


                 //get company data
               const getWeightDataa = await getWeightData();
               await setWeight(getWeightDataa.productWeight);
            //    console.log("date received", getWeightDataa.productWeight);
            



               } catch (error) {
                 console.error(error);
               }


            }
         
             fetchData(); 
           }, []); 

    
 
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
                            <div className="page-title-box d-sm-flex align-inStock-center justify-content-between">
                                <h4 className="mb-sm-0">New Product</h4>
                                
                            
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#a">Product</a></li>
                                        <li className="breadcrumb-item active">New Product</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <Link to="/productlist" className="btn btn-primary addtax-modal">Go To List</Link>
                    </div> 
                    {/* end page title */}


                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body">
                                   <div className="p-2">
                                    
                                    {/* add product form */}
                                    <form onSubmit={formik.handleSubmit} enctype="multipart/form-data" autoComplete='off'>

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label className="form-label" for="productName">Product Name</label>
                                                <input id="productName" name="productName" placeholder="Enter Product Name" type="text" className="form-control" {...formik.getFieldProps("productName")}/>
                                                {(formik.errors.productName && formik.touched.productName)  ? <small style={{color:"red"}}>{formik.errors.productName}</small> : null}
                                            </div>
                                        </div>


                                        <div className="col-lg-6">

                                        <div className="mb-3 down_arrow_style_parent">
                                                <label className="form-label" for="product type">Category</label>  {/* Product Type */}

                                                     <input list="vendorname"  id="product type" name="productCategory" className="form-control" onChange={formik.handleChange} placeholder=' --- Select Category ---'/>
                                                     <span className=""><i className="las la-angle-down fs-20 ms-1 down_arrow_style"></i></span>

                                                        <datalist id="vendorname" >
                                                        
                                                        {Category.length >0 && Category.map((list)=>
                                                        
                                                        <option key={list._id} value={list.productCategory}>{list.productCategory}</option>)}
                                                        </datalist> 

                                                        {(formik.errors.productCategory && formik.touched.productCategory) ? <small style={{color:"red"}}>{formik.errors.productCategory}</small> : null}                                                    

                                            </div>                                        
                                        </div>

                                        <div className="col-md-6 position-relative">
                                            <div className="mb-3">
                                                <label className="form-label" for="productName">No.of pieces</label>
                                                <input id="productName" name="noofPieces" placeholder="Enter no of pieces" type="text" className="form-control" {...formik.getFieldProps("noofPieces")}/>
                                                {(formik.errors.noofPieces && formik.touched.noofPieces)  ? <small style={{color:"red"}}>{formik.errors.noofPieces}</small> : null}
                                            </div>
                                        </div>


                                       
                                        <div className="col-md-6 position-relative">
                                            <div className="mb-3 down_arrow_style_parent">
                                                <label className="form-label" for="product weight">Weight</label>  {/* Product Type */}
                                               

                                                      
                                                        <input list="proweight"  id="product type" name="productWeight" className="form-control" onChange={formik.handleChange} placeholder=' --- Select Weight ---'/>
                                                        <span ><i className="las la-angle-down fs-20 ms-1 down_arrow_style"></i></span>


                                                        <datalist id="proweight" >
                                                        {Weight.length >0 && Weight.map((list)=>
                                                        <option key={list._id} value={list.productWeight}>{list.productWeight}</option>)}
                                                        </datalist> 

                                                        {(formik.errors.productWeight && formik.touched.productWeight) ? <small style={{color:"red"}}>{formik.errors.productWeight}</small> : null} 

                                            </div>
                                        </div>


                                    </div>
                                      
                                     <div className="dropzone mb-3"> 
                                        <div className="fallback">
                                            <input name="productImg" type="file"  onChange={handleImageChange}  multiple= "multiple" />
                                            {(formik.errors.productImg && formik.touched.productImg)  ? <small style={{color:"red"}}>{formik.errors.productImg}</small> : null}

                                            <div  style={{ display: 'flex', flexWrap: 'wrap'}}>
                                                {formik.values.productImg && Array.from(formik.values.productImg).map((image, index) => (
                                                    <div className='position-relative m-3' key={index}>
                                                        <img
                                                            key={index}
                                                            src={URL.createObjectURL(image)}
                                                            alt={`Image ${index + 1}`}
                                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                        />
                                                        <button type='button' className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" 
                                                        onClick={()=>handleDeleteProductproductImg(index)}><i className="las la-trash-alt  align-middle"></i></button>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            
                                        </div> 
                                        <div className="dz-message needsclick">
                                            <div className="mb-3">
                                                <i className="display-4 text-muted ri-upload-cloud-2-fill"></i>
                                            </div>

                                            <h4>Drop files here or click to upload.</h4>
                                        </div>
                                    </div>

                                        {/* <ul className="list-unstyled" id="dropzone-preview">
                                            <li className="mt-2" id="dropzone-preview-list">
                                                 This is used as the file preview template 
                                                <div className="border rounded">
                                                    <div className="d-flex p-2">
                                                        <div className="flex-shrink-0 me-3">
                                                            <div className="avatar-sm bg-light rounded">
                                                                <productImg data-dz-thumbnail className="productImg-fluid rounded d-block" src="assets/images/new-document.png" alt="img not support..." />
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <div className="pt-1">
                                                                <h5 className="fs-14 mb-1" data-dz-name>&nbsp;</h5>
                                                                <p className="fs-13 text-muted mb-0" data-dz-size></p>
                                                                <strong className="error text-danger" data-dz-errormessage></strong>
                                                            </div>
                                                        </div>
                                                        <div className="flex-shrink-0 ms-3">
                                                            <button data-dz-remove className="btn btn-sm btn-danger">Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul> */}
                                        {/* end dropzon-preview */}

                                        <div className="row">
                                            {/* <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" for="brand">Product Brand</label>
                                                    <input id="brand" name="productbrand" placeholder="Enter Product Brand" type="text" className="form-control" />
                                                </div>
                                            </div> */}
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label" for="price">Product Price</label>
                                                    <input id="price" name="productPrice" placeholder="Enter Price" type="text" className="form-control" {...formik.getFieldProps("productPrice")} />
                                                    {(formik.errors.productPrice && formik.touched.productPrice) ? <small style={{color:"red"}}>{formik.errors.productPrice}</small> : null}

                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                <label className="form-label" for="no.of inStock">inStock</label>
                                                    <input id="no.of inStock" name="inStock"  type="text" className="form-control" {...formik.getFieldProps("inStock")}/>
                                                    {(formik.errors.inStock && formik.touched.inStock) ? <small style={{color:"red"}}>{formik.errors.inStock}</small> : null}

                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            {/* <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label for="choices-single-default" className="form-label">Category</label>
                                                    <select className="form-select" data-trigger name="choices-single-category"
                                                        id="choices-single-category">
                                                        <option value="SL">Select</option>
                                                        <option value="EL">Electronic</option>
                                                        <option value="FA">Fashion</option>
                                                        <option value="FI">Fitness</option>
                                                    </select>
                                                </div>
                                            </div> */}

                                            {/* <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label for="choices-single-specifications" className="form-label">Specifications</label>
                                                    <select className="form-select" data-trigger name="choices-single-category"
                                                        id="choices-single-specifications">
                                                        <option value="HI" defaultValue>High Quality</option>
                                                        <option value="LE" defaultValue>Leather</option>
                                                        <option value="NO">Notifications</option>
                                                        <option value="SI">Sizes</option>
                                                        <option value="DI">Different Color</option>
                                                    </select>
                                                </div>
                                            </div> */}

                                            
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" for="productdesc">Product Description</label>
                                            <textarea className="form-control" id="productdesc" name='productdesc' placeholder="Enter Description" rows="4" {...formik.getFieldProps("productdesc")}></textarea>
                                            {(formik.errors.productdesc && formik.touched.productdesc) ? <small style={{color:"red"}}>{formik.errors.productdesc}</small> : null}

                                        </div>

                                        <div className="hstack gap-2 mt-4">
                                        <button type="submit" className="btn btn-primary">Save</button>
                                        {/* <button type="button" className="btn btn-light" >Discard</button> */}
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

export default AddProduct