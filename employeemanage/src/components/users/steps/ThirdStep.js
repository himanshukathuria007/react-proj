import React, { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import InputMask from 'react-input-mask';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import axios from 'axios'
//import SweetAlert from 'sweetalert2-react';
import PropTypes from 'prop-types';

import "./package-style.css";


const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));




function ThirdStep( {formData,setFormData,visibleSteps,setVisibleSteps,setCurrentStep}  ) {

    const classes = useStyles();
  
    const [companyname, setCompanyName] = useState(formData.companyname);
    const [companyErrorText, setCompanyErrorText] = useState('');
    const [fromdate, setFromdate] = useState(formData.fromdate);
    const [fromdateErrorText, setfromdateErrorText] = useState('');
    const [todate, setTodate] = useState(formData.todate);
    const [todateErrorText, settodateErrorText] = useState('');
    const [designation, setDesignation] = useState(formData.designation);
    const [designationErrorText, setdesignationErrorText] = useState('');
  
    //handles this step submission
    let submitStep = (event) => {
        //prevent the form from being submitted
        event.preventDefault();
       
        
        
        //constructs this step form data
        const thisFormData = {
            companyname,
            fromdate,
            todate,
            designation
        };
        
        //initilizie the validator with custom validaton rules
        let validator = new SimpleReactValidator({
            validators: {
               
                from: { // name the rule
                    message: 'The :attribute must be a valid date.',
                    rule: (val, params, validator) => {
                        return val.trim().match(/^([0-2][0-9]|(3)[0-1])(\/)(((0?)[0-9])|((1)[0-2]))(\/)\d{4}$/g) !== null
                    },
                    messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params)), // optional
                    required: true // optional
                }
            }
        });
  
        //validates the company valueas required
        validator.message('companyname',companyname, 'required');
      
        validator.message('fromdate', fromdate, 'required');
      
        validator.message('todate', todate, 'required');

        validator.message('designation',designation, 'required');
  
        //checks if address value validation failed
        //if failed, it set the address error text using the setAddressErrorText hook
        if (validator.errorMessages.company !== null) {
            setCompanyErrorText(validator.errorMessages.company);
        }
  
        if (validator.errorMessages.fromdate !== null) {
            setfromdateErrorText(validator.errorMessages.fromdate);
        }
  
       
        if (validator.errorMessages.todate !== null) {
            settodateErrorText(validator.errorMessages.todate);
        }

        if (validator.errorMessages.designation !== null) {
            setdesignationErrorText(validator.errorMessages.designation);
        }
  
       
        //checks if all validations were passed
        if ( validator.allValid()) {
            //enables the third step to be viewed
            setVisibleSteps({
                ...visibleSteps,
                fourthStep: true
            });
  
            //updates the whole form data
            setFormData({
                ...formData,
                ...thisFormData
            });
  
            //switches view to the third step
            setCurrentStep(4);
        }
  
        return false;
    }
  
    //handles the address onchange event handler by setting the address value using the setAddress hook
    let handleCompany = ({
        target
    }) => setCompanyName(target.value);
  
    //handles the phone number onchange event handler by setting the phone number value using the setPhoneNumber hook
    let handleFromdate = ({
        target
    }) => setFromdate(target.value);
  
    //handles the date of birth onchange event handler by setting the date of birth using the setDateOfBirth hook
    let handleTodate = ({
        target
    }) => setTodate(target.value);

    let handleDesignation = ({
        target
    }) => setDesignation(target.value);
  
  
  
    
    return (
      <form onSubmit={ submitStep }>
          <div className="form-group">
              <label> Company Name : </label>
              <input className="form-control" value={ companyname } placeholder=" Enter Company Name" onChange={ handleCompany } onFocus={ () => setCompanyErrorText('') } />
              { companyErrorText && <span className="form-error"> { companyErrorText } </span> }
          </div>
          
          <div className="form-group">
              <label> From : </label>
              <div className="customDateOfBirthPickerWidth">

              <TextField
        id="date"
        label="from"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        value={ fromdate}
        onChange={handleFromdate}
        className="form-control"
        InputLabelProps={{
          shrink: true,
        }}
      />  
              </div>
              { fromdateErrorText && <span className="form-error"> { fromdateErrorText } </span> }
          </div>
         

          <div className="form-group">
              <label> To : </label>
              <div className="customDateOfBirthPickerWidth">

              <TextField
        id="date"
        label="to"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        value={ todate}
        onChange={handleTodate}
        className="form-control"
        InputLabelProps={{
          shrink: true,
        }}
      />  
              </div>
              { todateErrorText && <span className="form-error"> { todateErrorText } </span> }
          </div>






          <div className="form-group">
              <label> Designation : </label>
              <input className="form-control" value={ designation } placeholder=" Enter Designation" onChange={ handleDesignation } onFocus={ () => setdesignationErrorText('') } />
              { designationErrorText && <span className="form-error"> { designationErrorText } </span> }
          </div>
          <div className="form-group" style={{ marginTop: '40px'}}>
              <button type="button" className="btn btn-secondary" style={{ marginRight: '10px', minWidth: '150px'}} onClick={ () => setCurrentStep(2) }> Previous </button>
              <button type="submit" className="btn btn-primary" style={{ minWidth: '150px'}}> Next </button>
          </div>
      </form>
    );
  }
  

ThirdStep.propTypes = {
  visibleSteps: PropTypes.object,
  setVisibleSteps: PropTypes.func,
  setCurrentStep: PropTypes.func,
  formData: PropTypes.object,
  setFormData: PropTypes.func
};
export default ThirdStep;