import React, { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import PropTypes from 'prop-types';

function FirstStep( {visibleSteps,setVisibleSteps,setCurrentStep,formData,setFormData} ) {

  const [email, setEmail] = useState(formData.email);
  const [emailErrorText, setEmailErrorText] = useState('');
  const [firstname, setFirstName] = useState(formData.firstname);
  const [firstnameErrorText, setfirstnameErrorText] = useState('');
  const [lastname, setlastName] = useState(formData.lastname);
  const [lastNameErrorText, setlastNameErrorText] = useState('');
  const [phone, setPhone] = useState(formData.phone);
  const [phoneErrorText, setphoneErrorText] = useState('');
  const [currentaddress, setCurrentAddress] = useState(formData.currentaddress);
  const [currentaddressErrorText, setCurrentAddressErrorText] = useState('');
  const [permanentaddress, setPermanentAddress] = useState(formData.permanentaddress);
  const [permanentaddressErrorText, setPermanentAddressErrorText] = useState('');
  const [img, setImg] = useState(formData.img);
  const [imgErrorText, setimgErrorText] = useState('');
  
  
  let submitStep = (event) => {
      //prevent the form from submission
      event.preventDefault();
  
      //constructs the form data object
      const thisFormData = {
          email,
          firstname,
          lastname,
          phone,
          currentaddress,
          permanentaddress,
          img
      };
  
      //initialize the validator
      let validator = new SimpleReactValidator();
  
      //validates the email value as required and must match being an email
      validator.message('email', email, 'required|email');
      validator.message('firstname', firstname, 'required|min:3|max:10');
      validator.message('lastname', lastname, 'required|min:3|max:10');
      validator.message('phone', phone, 'required|max:10');
      validator.message('currentaddress', currentaddress, 'required');
      validator.message('permanentaddress', permanentaddress, 'required');
  
      //checks if email validation if
      //if failed, it sets the email error message using the setEmailErrorText hook
      if (validator.errorMessages.email !== null) {
          setEmailErrorText(validator.errorMessages.email);
      }

      //checks if name validation if
      if (validator.errorMessages.firstname !== null) {
        setfirstnameErrorText(validator.errorMessages.firstname);
      }

      //checks if password and confirm password value matches
      if (validator.errorMessages.lastname !== null) {
        setlastNameErrorText(validator.errorMessages.lastname);
    }
  
    if (validator.errorMessages.phone !== null) {
        setphoneErrorText(validator.errorMessages.phone);
    }

    if (validator.errorMessages.currentaddress !== null) {
        setCurrentAddressErrorText(validator.errorMessages.currentaddress);
    }

    if (validator.errorMessages.permanentaddress !== null) {
        setPermanentAddressErrorText(validator.errorMessages.permanentaddress);
    }







      // checks if all validations were passed
      if (validator.allValid()) {

        //enables second form step to be viewed
          setVisibleSteps({
              ...visibleSteps,
              secondStep: true
          });
        
        //updates the form data for the whole step
          setFormData({
              ...formData,
              ...thisFormData
          });

        // switches view to the second step
          setCurrentStep(2);
      }
  
      return false;
  }

  //handle the email onchange event handler and set the email value using the setEmail hook
  let handleEmail = ({
      target
  }) => setEmail(target.value);

  //handles the password onchange event handler and set the name value using the setPassword hook
  let handlefirstName = ({
      target
  }) => setFirstName(target.value);
  

  //handles the password onchange event handler and set the uname value using the setPassword hook
  let handlelastName = ({
      target
  }) => setlastName(target.value);

  let handlephone = ({
    target
}) => setPhone(target.value);

let handlecurrentAddress = ({
    target
}) => setCurrentAddress(target.value);

let handlepermanentaddress = ({
    target
}) => setPermanentAddress(target.value);

let handleimg = ({
    target
}) => {
    
    console.log(target.files);
    handleImgChange(target.files[0]);
}



const handleImgChange =(imgData) => {
 
        let reader = new FileReader()
        reader.onloadend = () => {
          setImg(  URL.createObjectURL(imgData) )
        }
        reader.readAsDataURL(imgData)
      
  }


  return (
    <form onSubmit={ submitStep }>
        <div className="form-group">
            <label> Email Address : </label>
            <input className="form-control" type="text" value={ email } placeholder=" Enter email address" onChange={ handleEmail } onFocus={ () => setEmailErrorText('') } />
            { emailErrorText && <span className="form-error"> { emailErrorText } </span> }
        </div>
        <div className="form-group">
            <label> Firstname : </label>
            <input className="form-control" type="text" value={ firstname } placeholder=" Enter FirstName" onChange={ handlefirstName } onFocus={ () => setfirstnameErrorText('') }/>
            { firstnameErrorText && <span className="form-error"> { firstnameErrorText } </span> }
        </div>
        <div className="form-group">
            <label> Lastname : </label>
            <input className="form-control" type="text" value={ lastname } placeholder=" Enter Lastname" onChange={ handlelastName } onFocus={ () => setlastNameErrorText('') }/>
            { lastNameErrorText && <span className="form-error"> { lastNameErrorText } </span> }
        </div>

        <div className="form-group">
            <label> phone number : </label>
            <input className="form-control" type="Number" maskChar={null} value={ phone } placeholder=" Enter Phone Number" onChange={ handlephone } onFocus={ () => setphoneErrorText('') }/>
            { phoneErrorText && <span className="form-error"> { phoneErrorText } </span> }
        </div>

        <div className="form-group">
            <label> Current Address : </label>
            <input className="form-control" type="text" value={ currentaddress } placeholder=" Enter Current Address" onChange={ handlecurrentAddress } onFocus={ () => setCurrentAddressErrorText('') }/>
            { currentaddressErrorText && <span className="form-error"> { currentaddressErrorText } </span> }
        </div>

        <div className="form-group">
            <label> Permanent Address : </label>
            <input className="form-control" type="text" value={ permanentaddress } placeholder=" Enter Permanent Address" onChange={ handlepermanentaddress } onFocus={ () => setPermanentAddressErrorText('') }/>
            { permanentaddressErrorText && <span className="form-error"> { permanentaddressErrorText } </span> }
        </div>

        <div className="form-group">
            <label> Upload Image : </label>
            <input className="form-control" type="file"  onChange={ handleimg } onFocus={ () => setimgErrorText('') }/>

        </div>




        <div className="form-group" style={{ marginTop: '40px'}}>
            <button className="btn btn-secondary" style={{ marginRight: '10px', minWidth: '150px'}} disabled> Previous </button>
            <button type="submit" className="btn btn-primary" style={{ minWidth: '150px'}}> Next </button>
        </div>
    </form>
  );
}

FirstStep.propTypes = {
  visibleSteps: PropTypes.object,
  setVisibleSteps: PropTypes.func,
  setCurrentStep: PropTypes.func,
  formData: PropTypes.object,
  setFormData: PropTypes.func
};

export default FirstStep;