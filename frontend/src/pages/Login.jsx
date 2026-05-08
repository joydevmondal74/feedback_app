import React from 'react'
import "./Login.css";
import axios from "axios";
import { useState } from "react";
import API from '../api.js';

export const Login = () => {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    feedback:"",
    address:"",
  });


    // state to track submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* Handle Input */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };
  /* Handle Submit */

  const handleSubmit = async (e) => {

    e.preventDefault();

/* Phone Validation */

if (formData.phone.length !== 10) {
  alert("Phone number must be exactly 10 digits");
  return;
}
// Start Submission process
    setIsSubmitting(true);

    try {
      const res = await axios.post("https://feedback-backend-x0b8.onrender.com/submit",formData); 
      alert(res.data);
      setFormData({
        name: "",
        phone: "",
        email: "",
        feedback:"",
        address:"",
      });

    } catch (error) {

      console.log(error);
      alert("Something went wrong");
    }finally{
      // Re-enable button after response( success or error)
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main-container">

      {/* Decorative Circles */}
      <div className="circle1"></div>
      <div className="circle2"></div>

      {/* Card */}
      <div className="feedback-card">

        {/* Icon */}
        <div className="card-container">
        <div className='logo-wrapper'>
          <img src='/logo.png' alt='logo' className='rounded-logo'/>
        </div>
        </div>

        {/* Heading */}
        <h1 className="title">Public Walfare Service</h1>
        <h5 className='title1'>(জনসেবামূলক সমাজসেবা)</h5>


        <p className="title2">
          Tell us about the problems in your area.
          <br/>
          Together we will move toward solutions.
          <br/>
        </p>
        <p className='title3'>
          অনুগ্রহ করে আপনার চিন্তাভাবনা এবং পরামর্শ আমাদের সাথে শেয়ার করুন।
          <br/>
          আপনার মতামত আমাদের আরও উন্নত করতে সাহায্য করে!
        </p>
        <hr />

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Name */}
          <label className="form-label">Full Name</label>
          <label>(আপনার পুরো নাম লিখুন)</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-person"></i>
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              
            />
          </div>

          {/* Phone */}
          <label className="form-label">Phone Number</label>
          <label>(আপনার ফোন নম্বরটি লিখুন)</label>

          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-telephone"></i>
            </span>

            <input
              type="tel"
              className="form-control"
              placeholder="Enter your phone number"
              name='phone'
              value={formData.phone}
              onChange={(e)=>{
                const value=e.target.value;
                // Allow only numbers and max 10 Digits
                if(/^\d{0,10}$/.test(value)){
                  setFormData({
                    ...formData,
                    phone:value,
                  })
                }
              }}
            />
          </div>

          {/* Email */}
          <label className="form-label">Email Address</label>
          <label>(আপনার ইমেল দিন)</label>

          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-envelope"></i>
            </span>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email address"
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {/* Address */}
          <label className="form-label">Address</label>
          <label>(আপনার ঠিকানা দিন)</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-person"></i>
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Enter your address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              
            />
          </div>
          {/* feedback */}
          <label className="form-label">Your Feedback</label>
          <label>(আপনার মতামত এখানে লিখুন...)</label>
          <div className='feedback-textarea'>
            <textarea 
            className='form-control feedback-input'
            rows="5"
            placeholder='Write your feedback here...'
            name='feedback'
            value={formData.feedback}
            onChange={handleChange}
            ></textarea>
          </div>


            {/* warning message */}
          <p class="submit-warning">
            <i class="bi bi-exclamation-triangle"></i>
            অনুগ্রহ করে একবারই চাপুন, একাধিকবার 'Submit' করবেন না।
            <br/>
            <span>(Please tap only once, do not submit multiple times.)</span>
          </p>


          {/* Button with loading state */}
        
          <button 
          className="submit-btn"
          type='submit'
          disabled={isSubmitting}>
            <i className={`bi ${isSubmitting ? 'bi-hourglass-split' : 'bi-send-fill'} me-2`}></i>
            {isSubmitting? "Processing..." : "Submit Response"}
          </button>

        </form>

      </div>
    </div>
  );
}
