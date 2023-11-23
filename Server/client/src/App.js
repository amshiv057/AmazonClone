import "./App.css";
import Navbar from "./Components/Header/Navbar";
import Newnav from "./Components/Newnavbar/Newnav";
import Maincomp from "./Components/Home/Maincomp";
import Footer from "./Components/footer/Footer";
import SignIn from "./Components/signup_signin/SignIn";
import SignUp from "./Components/signup_signin/SignUp";
import Buynow from "./Components/buynow/Buynow";
import Cart from "./Components/cart/Cart";
import { Routes, Route } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
function App() {

  const[data,setData]=useState(false);


  useEffect(()=>{
    setTimeout(()=>{
      setData(true)
    },2000)
  },[])

  return (
    <>
    {
      data ?(
        <>
        <Navbar />
      <Newnav />
      <Routes>
        <Route path="/" element={<Maincomp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/getproductsone/:id" element={<Cart />} />
        <Route path="/buynow" element={<Buynow />} />
      </Routes>
      <Footer />
      </>
      ):(
        <div className="cricle">
          <CircularProgress/>
          <h2>Loading...</h2>
        </div>
      )
    }
     
    </>
  );
}

export default App;
