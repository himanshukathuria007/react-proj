import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import SweetAlert from 'sweetalert2-react';
import PropTypes from 'prop-types';

import "./package-style.css";
import { TextField } from '@material-ui/core';

function FourthStep( {formData,setFormData,visibleSteps,setVisibleSteps,setCurrentStep}  ) {

  let history = useHistory();
  
 // const [packageType, setPackageType] = useState(formData.packageType);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [linkedin, setLinkedin] = useState(formData.linkedin);
  const [linkedinErrorText, setlinkedinErrorText] = useState('');
  const [github, setGithub] = useState(formData.github);
  const [githubErrorText, setgithubErrorText] = useState('');
  const [facebook, setFacebook] = useState(formData.facebook);
  const [facebookErrorText, setfacebookErrorText] = useState('');
  const [hobbies, setHobbies] = useState(formData.hobbies);
  const [hobbiesErrorText, sethobbiesErrorText] = useState('');
  
  //handles the submit event for this step
  let submitStep =  (event) => {
      //prenvent the form from being submitted
      event.preventDefault();
    
      //constructs this step form data
      const thisFormData = {
          //packageType,
          linkedin,
          github,
          facebook,
          hobbies,
      }


      let validator = new SimpleReactValidator();
      validator.message('linkedin', linkedin, 'required');
      validator.message('github', github, 'required');
      validator.message('facebook', facebook, 'required');


      if (validator.errorMessages.linkedin !== null) {
        setlinkedinErrorText(validator.errorMessages.linkedin);
      }
      if (validator.errorMessages.github !== null) {
        setlinkedinErrorText(validator.errorMessages.github);
      }
      if (validator.errorMessages.facebook !== null) {
        setlinkedinErrorText(validator.errorMessages.facebook);
      }
      




      if (validator.allValid()) {

       
      //updates the whole form data
      setFormData({
          ...formData,
          ...thisFormData
      });
      setFormSubmitted(true);
       axios.post("http://localhost:3003/api/employee/add", formData);

    }
  


      //update the whole form submission state to true
     setFormSubmitted(true);
      //axios.post("http://localhost:3003/users", formData);

     
    

      console.log({
          ...formData,
          ...thisFormData
      }) //the whole form data could be forwarded to an api for processing
     console.log("implement data");

      return false;
  }



  let handleLinkedin = ({
    target
}) => setLinkedin(target.value);

let handleGit = ({
    target
}) => setGithub(target.value);

let handleFacebook = ({
    target
}) => setFacebook(target.value);

let handleHobbies = ({
    target
}) => setHobbies(target.value);


  return (
    
<React.Fragment>
<form onSubmit={ submitStep } className="package-form">
        <div className="form-group">
            <label> linkedin : </label>
            <input className="form-control" type="text" value={ linkedin } placeholder=" Enter Linked link" onChange={ handleLinkedin } onFocus={ () => setlinkedinErrorText('') }/>
            { linkedinErrorText && <span className="form-error"> { linkedinErrorText } </span> }
        </div>
        <div className="form-group">
            <label> Github : </label>
            <input className="form-control" type="text" value={ github } placeholder=" Enter Github link" onChange={ handleGit } onFocus={ () => setgithubErrorText('') }/>
            { githubErrorText && <span className="form-error"> { githubErrorText } </span> }
        </div>
        <div className="form-group">
            <label> Facebook : </label>
            <input className="form-control" type="text" value={ facebook } placeholder=" Enter Facebook link" onChange={ handleFacebook } onFocus={ () => setfacebookErrorText('') }/>
            { facebookErrorText && <span className="form-error"> { facebookErrorText } </span> }
        </div>
        <div className="form-group">
            <label> Hobbies : </label>
            <TextField className="form-control" type="text" value={ hobbies } placeholder=" Enter Hobbies" onChange={ handleHobbies } onFocus={ () => sethobbiesErrorText('') }/>
            
        </div>
        <div className="form-group" style={{ marginTop: '40px'}}>
            <button type="button" className="btn btn-secondary" style={{ marginRight: '10px', minWidth: '150px'}} onClick={ () => setCurrentStep(2) }> Previous </button>
            <button type="submit" className="btn btn-primary" style={{ minWidth: '150px'}}> Submit </button>
        </div>
    </form>
     <SweetAlert show={formSubmitted} title="Submission" text="Your submission has been received" onConfirm={() =>  history.push("/")} /> 
</React.Fragment>

  )
}

FourthStep.propTypes = {
  visibleSteps: PropTypes.object,
  setVisibleSteps: PropTypes.func,
  setCurrentStep: PropTypes.func,
  formData: PropTypes.object,
  setFormData: PropTypes.func
};
export default FourthStep;