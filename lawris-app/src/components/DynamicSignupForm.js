import React from 'react';
import userList from './utils/userList.js';
import { PersonIcon, EmailIcon, LawyerIcon, PasswordIcon, PhoneIcon, BusinessIcon, NonLitigantIcon, StudentIcon } from "../components/Icons";

 function InputGroup({ userList, commonInputs, userType, formData, handleInputChange }) {

  return (
    <>
      {userList.map((user, index) => {
        const [userTypeKey, userProps] = Object.entries(user)[0]; // Get the key-value pair for the user type

        return (
          <div key={index} className="input-group_container">
            {userType === userTypeKey && (
              <div className='input-group mb-3'>
                <span className="input-group-text color" >{userProps.icon}</span>
                {userTypeKey !== 'nonLitigant' && (
                   <input
                   className={`form-control ${
                     formData[userProps.name] && formData[userProps.name].match(userProps.pattern) ? 'is-valid' : 'is-invalid'
                   }`}
                   type={userProps.type}
                   name={userProps.name}
                   required
                   placeholder={userProps.placeholder}
                   value={formData[userProps.name] || ''}
                   onChange={handleInputChange}
                   pattern={userProps.pattern}
                   id={userProps.id}
                   aria-describedby='inputFeedback'
                 />
                )} 
                {/* <label htmlFor={userProps.id}>{userProps.placeholder}</label> */}
                <div id='inputFeedback' className='invalid-feedback'>
                  Number must start with 12345
                  {formData[userProps.name] && !formData[userProps.name].match(userProps.pattern) && (
                    <span>{`${userProps.placeholder} is invalid.`}</span>
                  )}

                </div>
              </div>  
            )}
          </div>
        );
      })}
      <div>
        {commonInputs.map((input, index) => (
          <div key={index} className="input-group mb-3">
            <span className="input-group-text color" >{input.icon}</span>
            <input
              className={`form-control ${
                formData[input.name] && 
                (input.name === 'confirm_password' ? formData.confirm_password === formData.password : formData[input.name].match(input.pattern)) 
                ? 'is-valid' : 'is-invalid'}`}
              type={input.type}
              name={input.name}
              required
              placeholder={input.placeholder}
              value={formData[input.name] || ''}
              onChange={handleInputChange}
              pattern={input.pattern}
              
            />
            <div id={`${input.name}Feedback`} className='invalid-feedback'>
              {formData[input.name] && !formData[input.name].match(input.pattern) && (
                <span>{input.errorMessage}</span>
              )}

            </div>
          </div>
        ))}
      </div>
    </>
  );
}
                
     


export default InputGroup;
