import React, { useEffect, useState } from "react";
// import "./buynow.css"
export default function Right({item}) {

  const [price ,setPrice]= useState(0);

  useEffect(()=>{
    totalAmount();
  },[item])
const totalAmount =()=>{
  let price=0;
  item.map((item)=>{
    price+=item.price.cost;
  });
  setPrice(price);
}
  return (
    <div className="right_buy">
      <img
        src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png"
        alt="rightimg"
      />

      <div className="cost_right">
        <p>
          Your order is elgible for FREE Delivery. <br />
          <span style={{ color: "#565959" }}>
            Select this option at checkout.
          </span>
        </p>
        <h1>
          Subtotal ({item.length}) :<span style={{ fontWeight: 700 }}>₹{price}.00</span>
        </h1>
        <button className="rightbuy_btn">Process to buy</button>
        <div className="emi">Emi avilable</div>
      </div>
    </div>
  );
}
