import React, {useState, useEffect, lazy} from 'react'
import { VerifyPages } from "../Auth/authServices/requestBackAlongWithToken"
import { SET_ADMIN } from '../../redux/reduces/Auth_reducer/authSlice'
import { useDispatch } from "react-redux";
import { getProductData, DeleteProductData } from './productService/productService';
import { useNavigate, Link } from 'react-router-dom';
import "./product.css"







const NavBar = lazy(()=>import("../../components/navBar/NavBar"))
const SideBar = lazy(()=>import("../../components/sideBar/SideBar"))
const Footer = lazy(()=>import("../../components/footer/Footer"))
const Pagination = lazy(()=>import("../../components/pegination/pegination"))



const ProductList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

   // all products state value
  const [items, setItems] = useState([]);

  //console.log("items", items)

  // search product state value
  const [searchproduct, setSearchproduct] = useState("");



  //all products from database
  useEffect(()=>{

    const fetchData = async () => { 
                try{
                    const data = await VerifyPages();
                        //console.log("date received", data.Admin);
        
                        await dispatch(SET_ADMIN(data.Admin));
    
    
    
                        //get company data
                        const productDetails = await getProductData();
                        await setItems(productDetails.productData);
                       //console.log("date received", productDetails.productData);
                       
                    
                }
                catch(error){
        
                    console.error(error);
                }
            };
        
            fetchData();


  },[]) 




  //delete products from DB
  const deleteProductHandle = async(res)=>{
    let response = window.confirm(`you try to delete the #${res.productName}...`)
    if(response){
        let data = await DeleteProductData(res._id);
        setItems(data.productData);
    }
  }



 //update  user


 const EditProduct = (data)=>{
     navigate("/editproduct", {state : data})
 }

 //view product 
 const ViewProduct = (data)=>{
    navigate("/viewproduct", {state : data})
}





    //   Begin Pagination
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;
  
    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
  
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, items]);
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };

    //Pagination ends





  return (
    
    <div id="layout-wrapper">
      {/* Begin page */}
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
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Product List</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="">Product</a></li>
                                        <li className="breadcrumb-item active">Product List</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* end page title */}

                    <div className="row pb-4 gy-3">
                       
                            <div className="col-sm-4">
                            <Link to="/addproduct" className="btn btn-primary addtax-modal"><i className="las la-plus me-1"></i> Add Product</Link>
                            </div>
                        

                        <div className="col-sm-auto ms-auto">
                           <div className="d-flex gap-3">
                            <div className="search-box">
                                <input type="text" className="form-control" id="searchMemberList" placeholder="Search for Product Name" name="searchProducts" value={searchproduct} onChange={(e)=>setSearchproduct(e.target.value)}/>
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

                                         {/* product table */}
                                        <table className="table table-nowrap align-middle mb-0">
                                            <thead>
                                                <tr className="text-muted text-uppercase">
                                                    {/* <th style={{width: "50px"}}>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                                                        </div>
                                                    </th> */}
                                                    <th scope="col" style={{width: "400px"}}>Product Name</th>
                                                    <th scope="col">Category</th>
                                                    <th scope="col">In Stock (packets)</th>
                                                    {/* <th scope="col">Rate</th> */}
                                                    <th scope="col" style={{width: "16%"}}>Price (per packet)</th>
                                                    <th scope="col" style={{width: "6%"}}>Action</th>
                                                </tr>
                                            </thead>
        
                                            {/* mapping product list items start */} 

                                            <tbody >
                                                
                                                {currentItems.length >0 ? currentItems.filter(list=>list.productName.toLowerCase().startsWith(searchproduct.toLowerCase())).map(res=>
                                                
                                                    <tr key={res._id}>
                                                        {/* <td>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" id="check1" value="option" />
                                                            </div>
                                                        </td> */}
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                {/* <div className="flex-shrink-0 me-3 avatar-sm">
                                                                    <div className="avatar-title bg-light rounded"> <img
                                                                            src={res.img[0]} alt="img not displayed..."
                                                                            className="avatar-xs" /> </div>
                                                                </div> */}
                                                                <div className="flex-grow-1">
                                                                    <h6 className="fs-16 mb-1">{res.productName} { res.productWeight} </h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{res.productCategory}</td>
                                                         {(res.inStock != 0) ? <td>{res.inStock}</td> : <td style={{color:"red"}}>Out Of Stock</td>}  {/* sales / total stock */}
                                                        {/* <td>
                                                            <span className="badge bg-light text-body fs-12 fw-medium"><i className="mdi mdi-star text-warning me-1"></i>3.9</span>
                                                        </td> */}
                                                        <td><div>{res.productPrice}</div></td>
                                                        <td>
                                                            <div className="dropdown">
                                                                <button className="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <i className="las la-ellipsis-h align-middle fs-18"></i>
                                                                </button>
                                                                <ul className="dropdown-menu dropdown-menu-end">
                                                                    <li>
                                                                        <button type='button' onClick={()=>ViewProduct(res)} className="dropdown-item"><i className="las la-eye fs-18 align-middle me-2 text-muted"></i>
                                                                            View</button>
                                                                    </li>
                                                                    
                                                                    <li>
                                                                         
                                                                            <button type='button' onClick={()=>EditProduct(res)} className="dropdown-item" ><i className="las la-pen fs-18 align-middle me-2 text-muted"></i>
                                                                            Edit</button>
                                                                        
                                                                    </li>
                                                                    {/* <li>
                                                                        <a className="dropdown-item" href="#a"><i className="las la-file-download fs-18 align-middle me-2 text-muted"></i>
                                                                            Download</a>
                                                                    </li> */} 
                                                                    <li className="dropdown-divider"></li>
                                                                    <li>
                                                                       
                                                                        
                                                                            <button className="dropdown-item remove-item-btn" onClick={()=>deleteProductHandle(res)} >
                                                                                <i className="las la-trash-alt fs-18 align-middle me-2 text-muted"></i>
                                                                                Delete
                                                                            </button> 
                                                                           
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>
 
                                                ) 
                                                : 
                                                <tr>
                                                    <td>
                                                        <div className="form-check">
                                                            <h3 className="form-check-input">Not Yet Added...</h3>
                                                        </div> 
                                                    </td>
                                                </tr>
                                                                                          
                                                }
                                                 <br />
                                                
                                                {/* total count */}
                                                {/* {currentItems.length > 0 && 
                                                 <tr style={{fontWeight:"bolder", fontSize:"1rem"}}>
                                                    <td>Total</td>
                                                    <td></td>
                                                    <td>{currentItems.map(list=>list.inStock).reduce((a,b)=> (Number(a)+ Number(b)))}</td>  
                                                    <td>{(currentItems.map(price=> price.productPrice).reduce((a,b)=> Number(a) + Number(b)))}</td>  
                                                    <td></td>
                                                 </tr>
                                                } */}

                                            {/* mappingproduct list items end */} 
                                                                    
                                         </tbody>  {/* end tbody */}
                                                
                                        </table>{/* end table */}
                                    </div>{/* end table responsive */}
                                </div>
                            </div>

                            <div className="row align-items-center mb-4 gy-3">
                        <div className="col-md-5">
                            <p className="mb-0 text-muted">Showing <b>1</b> to <b>{itemsPerPage}</b> of <b>{currentItems.length}</b> results</p>
                        </div>

                        <div className="col-sm-auto ms-auto">


                        <Pagination 
                            onPageChange={handlePageClick} 
                            pageCount={pageCount}
                        />
                           
                           
                        </div>
                    </div>
                        </div>
                    </div>
                </div>
                {/* container-fluid */}
            </div>
            {/* End Page-content */}

            <Footer/>
        </div>
        {/* end main content*/}


    {/* END layout-wrapper */}

    {/*start back-to-top*/}
    <button onclick="topFunction()" className="btn btn-danger btn-icon" id="back-to-top">
        <i className="ri-arrow-up-line"></i>
    </button>
    {/*end back-to-top*/}

    {/*preloader*/}
    {/* // <div id="preloader">
    //     <div id="status">
    //         <div className="spinner-border text-primary avatar-sm" role="status">
    //             <span className="visually-hidden">Loading...</span>
    //         </div>
    //     </div>
    // </div> */}

   

    </div>

  )
}

export default ProductList