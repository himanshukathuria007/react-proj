import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    currentaddress: "",
    permanentaddress:"",
    year:"",
    collage:"",
    course:"",
    percentage:"",
    companyname:"",
    fromdate:"",
    todate:"",
    designation:"",
    facebook:"",
    github:"",
    linkedin:"",
    hobbies:""


  });
  const { id } = useParams();
  useEffect(() => {
    loadUser().then((data)=>{

      setUser(data)
      
    })

  }, []);
  const loadUser = async () => {
    const res = await axios.get(`http://localhost:3003/api/employee/${id}`);
    //setUser(res.data);
    return res.data.user
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <h1 className="display-4">User Id: {id}</h1>
      <hr />
      <ul className="list-group w-70">
        <li className="list-group-item"><b>Personal Information</b></li>
        <li className="list-group-item">Name: {user.firstname} {user.lastname}</li>
        <li className="list-group-item">Email: {user.email}</li>
        <li className="list-group-item">Phone: {user.phone}</li>
        <li className="list-group-item">Current Address: {user.currentaddress}</li>
        <li className="list-group-item">Permanent Address: {user.permanentaddress}</li>
        <li className="list-group-item"><b>Educational Information</b></li>
        <li className="list-group-item">Course: {user.course}</li>
        <li className="list-group-item">Collage/University: {user.collage}</li>
        <li className="list-group-item">Year: {user.year}</li>
        <li className="list-group-item">Percentage: {user.percentage}</li>
        <li className="list-group-item"><b>Professional Information</b></li>
        <li className="list-group-item">Company Name: {user.companyname}</li>
        <li className="list-group-item">From: {user.fromdate}</li>
        <li className="list-group-item">To: {user.todate}</li>
        <li className="list-group-item">Designation: {user.designation}</li>
        <li className="list-group-item"><b>Social and Hobbies</b></li>
        <li className="list-group-item">Linkedin: {user.linkedin}</li>
        <li className="list-group-item">Github: {user.github}</li>
        <li className="list-group-item">Facebook: {user.facebook}</li>
        <li className="list-group-item">Hobbies: {user.hobbies}</li>
         



      </ul>
    </div>
  );
};

export default User;
