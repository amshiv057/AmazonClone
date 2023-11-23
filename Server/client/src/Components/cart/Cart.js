import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import { Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {LoginContext}  from "../../Context/ContextProvider";
import CircularProgress from '@mui/material/CircularProgress';

export default function Cart() {
  const { id } = useParams("");
 
  const history =useNavigate("");

const {account,setAccount} =useContext(LoginContext);

  const [indata, setIndata] = useState("");
 
  const getindata = async () => {
    const res = await fetch(`/getproductsone/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data);
    if (res.status !== 201) {
      console.log("no data is available");
    } else {
      console.log("getdata");
      setIndata(data);
    }
  };
  useEffect(() => {
    setTimeout(getindata,1000)
  }, [id]);


const addtocart = async(id)=>{
  const checkres= await fetch(`/addcart/${id}`,{
    method:"POST",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      indata
    }),
    credentials:"include"
  });
  const data1= await checkres.json();
  console.log(data1);

  if(checkres.status===401||!data1){
    console.log("user invalid");
    alert("user invalid");
  }else{
    // alert("data added in your cart");
    history("/buynow")
    setAccount((prevAccount) => {
      return { ...prevAccount, ...data1 };
    });
    
  }
}

  return (
    <div className="cart_section">
      <div className="cart_container">
        <div className="left_cart">
          <img src={indata.detailUrl} alt="cartImage" />
          <div className="cart_btn">
            <button className="cart_btn1" onClick={()=>addtocart(indata.id)}>Add to cart</button>
            <button className="cart_btn2">Buy Now</button>
          </div>
        </div>
        <div className="right_cart">
        {indata.title && (
          <>
              <h3>{indata.title.shortTitle}</h3>
          <h4>{indata.title.longTitle}</h4>
          <Divider />
          <p className="mrp">M.R.P : ₹{indata.price.mrp}.00</p>
          <p>
            Deal of the Day : <span style={{ color: "#B12704" }}>₹{indata.price.cost}.00</span>
          </p>
          <p>
            You Save: :<span style={{ color: "#B12704" }}>₹{indata.price.mrp - indata.price.cost} ({indata.price.discount})</span>
          </p>

          <div className="discount_box">
            <h5>
              Discount:<span style={{ color: "#111" }}>{indata.discount}</span>
            </h5>
            <h4>
              Free Delivery :{" "}
              <span style={{ color: "#111", fontWeight: 600 }}> Oct 8-21</span>{" "}
              Details
            </h4>
            <p>
              Fastest Delivery:{" "}
              <span style={{ color: "#111", fontWeight: 600 }}>
                Tomorrow 11AM
              </span>
            </p>
          </div>
          <p className="description">
            About the Iteam :
            <span style={{ color: "#565959", fontSize: 14, fontWeight: 500 }}>
              {" "}
             {indata.description}
            </span>
          </p>
          </>
        )}
        </div>

        {
          !indata? <div className="cricle">
          <CircularProgress/>
          <h2>Loading...</h2>
        </div>:""
        }
      </div>
    </div>
  );
}
