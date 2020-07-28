import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import FirstStep from './steps/FirstStep';
import SecondStep from './steps/SecondStep';
import ThirdStep from './steps/ThirdStep';
import FourthStep from './steps/FourthStep';


function AddUser(){

  const [currentStep, setCurrentStep] = useState(1);

  //set hook getter and setter hook for the whole form data
  const [formData, setFormData] = useState({
      email: '',
      firstname:'',
      lastname: '',
      phone: '',
      currentaddress: '',
      permanentaddress: '',
      facebook:'www.fb.com',
      github:'www.github.com',
      linkedin:'www.linked.com',
      hobbies:'',
      year:'',
      collage:'',
      course:'',
      percentage:'',
     // dateOfBirth: '01/01/1990',
      companyname:'',
      fromdate:'',
      todate:'',
      designation:'',
      course2:'',
      collage2:'',
      year2:'',
      percentage2:''


     
  })
  
  const [visibleSteps, setVisibleSteps] = useState({
      firstStep: true,
      secondStep: false,
      thirdStep: false,
      fourthStep:false
  });
  
  let showStep = () => { // displays the current step
      if (currentStep === 2 && visibleSteps.secondStep === true) {
          return <SecondStep setFormData = { setFormData } formData = { formData } setCurrentStep = { setCurrentStep } setVisibleSteps = { setVisibleSteps } visibleSteps = { visibleSteps } />
      } else if (currentStep === 3 && visibleSteps.thirdStep === true) {
          return <ThirdStep setFormData = { setFormData } formData = { formData } setCurrentStep = { setCurrentStep } setVisibleSteps = { setVisibleSteps } visibleSteps = { visibleSteps } />
      }else if (currentStep === 4 && visibleSteps.fourthStep === true) {
        return <FourthStep setFormData = { setFormData } formData = { formData } setCurrentStep = { setCurrentStep } setVisibleSteps = { setVisibleSteps } visibleSteps = { visibleSteps } />
    }
       else {
          return <FirstStep setFormData = { setFormData } formData = { formData } setCurrentStep = { setCurrentStep } setVisibleSteps = { setVisibleSteps } visibleSteps = { visibleSteps } />
      }
  }

  return (
    <div className="container step-container">
        <h3 className="text-muted" style={{ textTransform: 'capitalize'}}> Complete Form Below </h3>
        <div className="row" style={{ margin :'25px 0 10px 0' }}>
            <div className={ currentStep === 1 ? "col col-sm-3 step-card active" : "col col-md-3 step-card" }>
            Personal Details
            </div>
            <div className={ currentStep === 2 ? "col col-sm-3 step-card active" : "col col-md-3 step-card" }>
                Educational Details
            </div>
            <div className={ currentStep === 3 ? "col col-sm-3 step-card active" : "col col-md-3 step-card" }>
                Professional Details
            </div>
            <div className={ currentStep === 4 ? "col col-sm-3 step-card active" : "col col-md-3 step-card" }>
                Social-Hobbies
            </div>
        </div>
        { showStep() }
    </div>
  );
  // return (
  //   <div className="App">
  //     <UserFormComponent />
  //   </div>
  // );
}

// const AddUser = () => {
//   let history = useHistory();
//   const [user, setUser] = useState({
//     name: "",
//     username: "",
//     email: "",  
//     phone: "",
//     website: ""
//   });

//   const { name, username, email, phone, website } = user;
//   const onInputChange = e => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async e => {
//     e.preventDefault();
//     await axios.post("http://localhost:3003/users", user);
//     history.push("/");
//   };
//   return (
//     <div className="container">
//       <div className="w-75 mx-auto shadow p-5">
//         <h2 className="text-center mb-4">Add A User</h2>
//         <form onSubmit={e => onSubmit(e)}>
//           <div className="form-group">
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               placeholder="Enter Your Name"
//               name="name"
//               value={name}
//               onChange={e => onInputChange(e)}
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               placeholder="Enter Your Username"
//               name="username"
//               value={username}
//               onChange={e => onInputChange(e)}
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="email"
//               className="form-control form-control-lg"
//               placeholder="Enter Your E-mail Address"
//               name="email"
//               value={email}
//               onChange={e => onInputChange(e)}
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               placeholder="Enter Your Phone Number"
//               name="phone"
//               value={phone}
//               onChange={e => onInputChange(e)}
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="text"
//               className="form-control form-control-lg"
//               placeholder="Enter Your Website Name"
//               name="website"
//               value={website}
//               onChange={e => onInputChange(e)}
//             />
//           </div>
//           <button className="btn btn-primary btn-block">Add User</button>
//         </form>
//       </div>
//     </div>
//   );
// };

export default AddUser;
