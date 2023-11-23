import React from "react";
import "./footer.css"
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="footer_container">
        <div className="footer_details_one">
          <h3>Get to Know us</h3>
          <p>About Us</p>
          <p>Careers</p>
          <p>Press Releases</p>
          <p>Amazon Cares</p>
        </div>
        <div className="footer_details_one">
          <h3>Connect with Us</h3>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>LinkedIn</p>
          <p>Twitter</p>
        </div>
        <div className="footer_details_one forres">
          <h3>Make Money with Us</h3>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>LinkedIn</p>
          <p>Twitter</p>
        </div>
        <div className="footer_details_one forres">
          <h3>Connect with Us</h3>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>LinkedIn</p>
          <p>Twitter</p>
        </div>
      </div>
      <div className="lastdetails">
        <img src="./amazon_PNG25.png" alt="logo" />
        <p>
          Conditions of Use & Sale &nbsp; &nbsp;&nbsp; Privacy Notice &nbsp;
          &nbsp;&nbsp; Interest-Based Ads &nbsp; &nbsp;&nbsp; © 1996-{year},
          Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </footer>
  );
}
