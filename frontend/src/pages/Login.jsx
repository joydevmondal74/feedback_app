import React from 'react'
import "./Login.css";
import axios from "axios";
import { useState } from "react";

export const Login = () => {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    feedback:"",
  });

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

    try {

      const res = await axios.post(
        "http://localhost:5000/submit",
        formData
      );

      alert(res.data);

      setFormData({
        name: "",
        phone: "",
        email: "",
        feedback:"",
      });

    } catch (error) {

      console.log(error);
      alert("Something went wrong");

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
        <div className="icon-box">
          <i className="bi bi-chat-dots-fill"></i>
        </div>

        {/* Heading */}
        <h1 className="title">We Value Your Feedback</h1>

        <p className="subtitle">
          Please share your thoughts and suggestions with us.
          <br />
          Your feedback helps us improve!
        </p>

        <hr />

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Name */}
          <label className="form-label">Full Name</label>

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

          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-telephone"></i>
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Enter your phone number"
              name='phone'
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <label className="form-label">Email Address</label>

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
          {/* feedback */}
          <label className="form-label">Your Feedback</label>
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

          {/* Button */}
          <button className="submit-btn">
            <i className="bi bi-send-fill me-2"></i>
            Submit Response
          </button>

        </form>

      </div>
    </div>
  );
}
