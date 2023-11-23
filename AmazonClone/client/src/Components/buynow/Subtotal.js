import React, { useEffect, useState } from 'react'

export default function Subtotal({item}) {

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
   <div className="sub_item">
  <h3>Subtotal ({item.length} ):<strong style={{fontWeight:700,color:"#111"}}></strong>₹{price}.00</h3>
   </div>
  )
}
