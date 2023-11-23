import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const [udata, setUdata] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: ""
  });
 console.log(udata);
  const adddata=(e)=>{
    const{name,value}=e.target;
    setUdata(()=>{
      return{
        ...udata,
       [name]:value
      }
    })
  }

  const senddata=async(e)=>{
    e.preventDefault();
    const{fname,email,mobile,password,cpassword}=udata;
    const res= await fetch("register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        fname,email,mobile,password,cpassword
      })
    });
    const data = await res.json();
    // console.log(data);

    if(!data||res.status===422){
      // alert("no data");
        toast.warn("Invaild data",{
          position:"top-center"
        })
    }else{
      // alert("data added successfullt");
      toast.success("data successfully added",{
             position:"top-center"
      })
      setUdata({...udata,fname:"",email:"",mobile:"",password:"",cpassword:""})
    }
  }
  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="./blacklogoamazon.png" alt="amazonlogo" />
        </div>
        <div className="sign_form">
          <form method="POST">
            <h1>Sign-Up</h1>
            <div className="form_data">
              <label htmlFor="fname">Your Name</label>
              <input type="text" name="fname" id="fname" onChange={adddata} value={udata.fname}/>
            </div>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" onChange={adddata} value={udata.email}/>
            </div>
            <div className="form_data">
              <label htmlFor="number">Mobile Number</label>
              <input type="text" name="mobile" id="mobile"  onChange={adddata} value={udata.Mobile}  />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={adddata}
                value={udata.password}
                placeholder="atleast 6 character"
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                onChange={adddata}
                value={udata.cpassword}
              />
            </div>
            <button className="signin_btn" onClick={senddata}>Continue</button>
            <div className="signin_info">
              <p>Already have an account?</p>
              <NavLink to="/login">SignIn</NavLink>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
}
