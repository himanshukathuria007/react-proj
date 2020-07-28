import React, { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
 
function SecondStep( {formData,setFormData,visibleSteps,setVisibleSteps,setCurrentStep}  ) {


    const [inputList, setInputList] = useState([{ course2: "", collage2: "",year2:"",percentage2:"" }]);
  const [course, setCourse] = useState(formData.course);
  const [CourseErrorText, setCourseErrorText] = useState('');
  const [collage, setCollage] = useState(formData.collage);
  const [CollageErrorText, setCollageErrorText] = useState('');
  const [year, setYear] = useState(formData.year);
  const [YearErrorText, setYearErrorText] = useState('');
  const [percentage, setPercentage] = useState(formData.percentage);
  const [percentageErrorText, setPercentageErrorText] = useState('');

  //handles this step submission
  let submitStep = (event) => {
      //prevent the form from being submitted
      event.preventDefault();
      
      //constructs this step form data
      const thisFormData = {
          course,
          collage,
          year,
          percentage
      };
      
      //initilizie the validator with custom validaton rules
      let validator = new SimpleReactValidator({
          validators: {
           
              year: { // name the rule
                  message: 'The :attribute must be a valid year.',
                  rule: (val, params, validator) => {
                      return val.trim().match(/\d{4}/) !== null
                  },
                  messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params)), // optional
                  required: true // optional
              },
              percent: { // name the rule
                message: 'The :attribute must be a valid year.',
                rule: (val, params, validator) => {
                    return val.trim().match(/\d{3}/) !== null
                },
                messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params)), // optional
                required: true // optional
            }
            
          }
      });

      
      validator.message('course', course, 'required');
     
      validator.message('collage', collage, 'required');
      
      validator.message('year', year, 'required|year');

      validator.message('percentage', year, 'required|percent');
      

      
      if (validator.errorMessages.course !== null) {
        setCourseErrorText(validator.errorMessages.course);
      }

      
      if (validator.errorMessages.collage !== null) {
          setCollageErrorText(validator.errorMessages.collage);
      }

      
      if (validator.errorMessages.year !== null) {
          setYearErrorText(validator.errorMessages.year);
      }

      if (validator.errorMessages.percentage !== null) {
        setPercentageErrorText(validator.errorMessages.percentage);
    }

      //checks if all validations were passed
      if ( validator.allValid()) {
          //enables the third step to be viewed
          setVisibleSteps({
              ...visibleSteps,
              thirdStep: true
          });

          //updates the whole form data
          setFormData({
              ...formData,
              ...thisFormData
          });

          //switches view to the third step
          setCurrentStep(3);
      }

      return false;
  }

  //handles the address onchange event handler by setting the address value using the setAddress hook
  let handleCourse = ({
      target
  }) => setCourse(target.value);

  //handles the phone number onchange event handler by setting the phone number value using the setPhoneNumber hook
  let handleCollage = ({
      target
  }) => setCollage(target.value);

  //handles the date of birth onchange event handler by setting the date of birth using the setDateOfBirth hook
  let handleYear = ({
      target
  }) => setYear(target.value);


  let handlePercentage = ({
    target
}) => setPercentage(target.value);



const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
 
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
 
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { course2:"", collage2: "" }]);
  };


  
  return (
    <form onSubmit={ submitStep }>
        <div className="form-group">
            <label> Course : </label>
            <input className="form-control" value={ course } placeholder=" Enter course" onChange={ handleCourse } onFocus={ () => setCourseErrorText('') } />
            { CourseErrorText && <span className="form-error"> { CourseErrorText } </span> }
        </div>
        <div className="form-group">
            <label> Collage/University : </label>
            <input className="form-control" value={ collage } placeholder=" Enter Collage/university" onChange={ handleCollage } onFocus={ () => setCollageErrorText('') } />
            { CollageErrorText && <span className="form-error"> { CollageErrorText } </span> }
        </div>
        {/* <div className="form-group">
            <label> Date of Birth : </label>
            <div className="customDateOfBirthPickerWidth">
                <InputMask mask="99/99/9999" maskChar={null} value={dateOfBirth} onChange={handleDateOfBirth} placeholder=" Enter Date of Birth" onFocus={ () => setDateOfBirthErrorText('') } className="form-control" />
            </div>
            { dateOfBirthErrorText && <span className="form-error"> { dateOfBirthErrorText } </span> }
        </div> */}
        <div className="form-group">
            <label> Year of passing : </label>
            <InputMask mask="9999" value={year} onChange={handleYear} onFocus={ () => setYearErrorText('') } placeholder=" Enter Year" maskChar={null} className="form-control" />
            { YearErrorText && <span className="form-error"> { YearErrorText } </span> }
        </div>

        <div className="form-group">
            <label> Percentage : </label>
            <InputMask mask="999" value={percentage} onChange={handlePercentage} onFocus={ () => setPercentageErrorText('') } placeholder=" Enter Percentage" maskChar={null} className="form-control" />
            { percentageErrorText && <span className="form-error"> { percentageErrorText } </span> }
        </div>





        {inputList.map((x, i) => {
        return (

            
          <div >


<div className="form-group">
            <label> Course : </label>
            <input className="form-control" 
            placeholder=" Enter course" value={x.course2}
              onChange={e => handleInputChange(e, i)} />
            
        </div>
           
        <div className="form-group">
            <label> Collage/University : </label>
            <input className="form-control" placeholder=" Enter collage/University" value={x.collage2}
              onChange={e => handleInputChange(e, i)} />
           
        </div>
           
            <div className="form-group" style={{ marginTop: '40px'}}>
              {inputList.length !== 1 && <button type="button" className="btn btn-secondary" style={{ marginRight: '10px', minWidth: '150px'}}
                onClick={() => handleRemoveClick(i)}>Remove</button>}
              {inputList.length - 1 === i && <button type="button" className="btn btn-secondary" style={{ marginRight: '10px', minWidth: '150px'}} onClick={handleAddClick}>Add fields</button>}
            </div>
          </div>
        );
      })}
 {/* <div style={{ marginTop: 20 }}>{Object.keys(inputList).map(e =>{
     return(
         <React.Fragment><div className="form-group">
         <label>{e}  </label>
         <input className="form-control" placeholder=" Enter collage/University" value={x.collage2}
           onChange={event => handleInputChange(event,e)} />
        
     </div></React.Fragment>
     )
      
 })}</div> */}

 
        <div className="form-group" style={{ marginTop: '40px'}}>
            <button type="button" className="btn btn-secondary" style={{ marginRight: '10px', minWidth: '150px'}} onClick={ () => setCurrentStep(1) }> Previous </button>
            <button type="submit" className="btn btn-primary" style={{ minWidth: '150px'}}> Next </button>
        </div>
    </form>
  );
}

SecondStep.propTypes = {
  visibleSteps: PropTypes.object,
  setVisibleSteps: PropTypes.func,
  setCurrentStep: PropTypes.func,
  formData: PropTypes.object,
  setFormData: PropTypes.func
};

export default SecondStep;