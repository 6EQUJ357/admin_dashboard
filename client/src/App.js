import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { lazy } from 'react'



//protect route
import ProtectedRoute from './customHook/ProtectedRoute';


//Auth 
const Login = lazy(()=>import("./pages/Auth/Login"));
const Register = lazy(()=>import("./pages/Auth/Register")); 
const ResetPassword = lazy(()=>import("./pages/Auth/ResetPassword")); 
const Profile = lazy(()=>import("./pages/Auth/Profile"));



///pages

//dashboard
const Dashboard = lazy(()=>import("./pages/dashboard/Dashboard"));

//company
const CompanyProfile = lazy(()=>import("./pages/companyProfile/companyProfile"));
const CompanyProfileForm = lazy(()=>import("./pages/companyProfile/CompanyProfileForm"));
const CompanyProfileView = lazy(()=>import("./pages/companyProfile/companyProfileView"));
const CompanyProfileEdit = lazy(()=>import("./pages/companyProfile/companyProfileEdit"));



// product

const ProductList = lazy(()=>import("./pages/products/ProductList"));
const AddProduct = lazy(()=>import("./pages/products/AddProduct"));
const ViewProduct = lazy(()=>import("./pages/products/viewProduct"));
const EditProduct = lazy(()=>import("./pages/products/editProduct"));
const InventuryList = lazy(()=>import("./pages/products/InventuryList"));

//Categoty
const Category = lazy(()=>import("./pages/products/category/category"));

//quantity
const Weight = lazy(()=>import('./pages/products/weight/weight'));


//Quotation
const QuotationList = lazy(()=>import("./pages/quotations/QuotationsList")); 







const App = () => {
  return (
    <BrowserRouter>
     
          <Routes>

            {/* Auth */}

            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/resetpassword" element={<ResetPassword />}/>
            <Route path="/profile" element={<Profile />}/>
    

              {/* components */}

              {/* dashboard */}
              <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute> }/>

              {/* company */}
              <Route path="/companyprofile" element={<ProtectedRoute> <CompanyProfile /> </ProtectedRoute> }/>
              <Route path="/companyprofileform" element={<ProtectedRoute> <CompanyProfileForm /> </ProtectedRoute> }/>
              <Route path="/companyprofileview" element={<ProtectedRoute> <CompanyProfileView /> </ProtectedRoute> }/>
              <Route path="/companyprofileedit" element={<ProtectedRoute> <CompanyProfileEdit /> </ProtectedRoute> }/>


              {/* product */}
              <Route path="/productlist" element={<ProtectedRoute> <ProductList /> </ProtectedRoute> }/>
              <Route path="/addproduct" element={<ProtectedRoute> <AddProduct /> </ProtectedRoute> }/>
              <Route path="/viewproduct" element={<ProtectedRoute> <ViewProduct /> </ProtectedRoute> }/>
              <Route path="/editproduct" element={<ProtectedRoute> <EditProduct /> </ProtectedRoute> }/>
              <Route path="/inventurylist" element={<ProtectedRoute> <InventuryList /> </ProtectedRoute> }/>

              {/* category */}
              <Route path="/category" element={<ProtectedRoute> <Category /> </ProtectedRoute> }/>

              {/* category */}
              <Route path="/weight" element={<ProtectedRoute> <Weight /> </ProtectedRoute> }/>


               {/* quotation */}
               <Route path="/quotationlist" element={<ProtectedRoute> <QuotationList /> </ProtectedRoute> }/>
              {/* <Route path="/addproduct" element={<ProtectedRoute> <AddProduct /> </ProtectedRoute> }/>
              <Route path="/viewproduct" element={<ProtectedRoute> <ViewProduct /> </ProtectedRoute> }/>
              <Route path="/editproduct" element={<ProtectedRoute> <EditProduct /> </ProtectedRoute> }/> */}



              
          </Routes>
       
    </BrowserRouter>
  )
}

export default App