import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "../../Context/ContextProvider";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
import "./rightheader.css"
import LogoutIcon from "@mui/icons-material/Logout";

const Rightheader = ({logClose,logoutuser}) => {

    const {account,setAccount}=  useContext(LoginContext);
  return (
    <>
      <div className="rightheader">
        <div className="right_nav">
          {account ? (
            <Avatar className="avtar2">
              {account.fname && account.fname.length > 0
                ? account.fname[0].toUpperCase()
                : ""}
            </Avatar>
          ) : (
            <Avatar className="avtar"></Avatar>
          )}
          {account && account.fname ? <h3>Hello, {account.fname.toUpperCase()}</h3> : ""}
        </div>
        <div className="nav_btn" onClick={()=>logClose()}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/">Shop By Category</NavLink>
            <Divider style={{width:"100%",marginLeft:"-20px"}}/>
            <NavLink to="/">today's Deal</NavLink>

            {
                account ? <NavLink to="/">Your Orders</NavLink>: <NavLink to="/login">Your Orders</NavLink>
            } 
          
            <Divider style={{width:"100%",marginLeft:"-20px"}}/>
             <div className="flag">
             <NavLink to="/">Settings</NavLink>
             </div>
        {
          account ?
          <div className="flag">
             <LogoutIcon style={{fontSize:18,marginRight:4}}/>
             <h3 onClick={()=>logoutuser()} style={{cursor:"pointer",fontWeight:500}}>Logout</h3>
          </div>:
           <NavLink to="login">SignIN</NavLink>
        }
      </div>
      </div>
    </>
  );
};

export default Rightheader;
