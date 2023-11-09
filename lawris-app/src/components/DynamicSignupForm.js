import React from 'react';
import userList from './utils/userList.js';
import { PersonIcon, EmailIcon, LawyerIcon, PasswordIcon, PhoneIcon, BusinessIcon, NonLitigantIcon, StudentIcon } from "../components/Icons";






// const inputGroup = (userList) => {
  
//   return (
//     <div>
//       {userList.length > 0 && Object.entries(userList[0].map(([key, value]) => (
//         <DynamicInputField 
//         key={key}
//         icon={value.icon}
//         name={value.name}
//         placeholder={value.placeholder}
//         pattern={value.pattern}
//         />
//       )))
//       }
//       {userList.slice(1).map((user, index) => (
//         <DynamicInputField
//         key={index}
//         icon={user.icon}
//         name={user.name}
//         placeholder={user.placeholder}
//         pattern={user.pattern} />
//       ))}
    
//     </div>

//   )

// }

// const DynamicInputField = ({ icon, name, placeholder, pattern }) => {
//   return (
//     <div className="input-group mb-3" id="dynamicInput">
//       <span>
//         {icon}
//       </span>
//       <input className="form-control mb-3" name={name} placeholder={placeholder} pattern={pattern} />
//     </div>
//   );
 //};
 function InputGroup({ userList, commonInputs, userType, formData, handleInputChange }) {
  const glassEffect = {
    background: 'transparent',
    borderRadius: '6px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 154, 60, 0.34)',
}
  return (
    <>
      {userList.map((user, index) => {
        const [userTypeKey, userProps] = Object.entries(user)[0]; // Get the key-value pair for the user type

        return (
          <div key={index} className="input-group_container">
            {userType === userTypeKey && (
              <div className='input-group mb-3'
              >
                <span className="input-group-text color" style={glassEffect}>{userProps.icon}</span>
                <input
                className={`form-control ${
                  formData[userProps.name] && formData[userProps.name].match(userProps.pattern) ? 'is-valid' : 'is-invalid'
                }`}
                type="text"
                name={userProps.name}
                required={userProps.required}
                placeholder={userProps.placeholder}
                value={formData[userProps.name] || ''}
                onChange={handleInputChange}
                pattern={userProps.pattern}
                style={glassEffect}
                id={userProps.id}
                aria-describedby='inputFeedback'
              />
              

              </div>

             
            )}
          </div>
        );
      })}
      <div>
        {commonInputs.map((input, index) => (
          <div key={index} className="input-group mb-3">
            <span className="input-group-text color" style={glassEffect}>{input.icon}</span>
            <input
              className={`form-control ${
                formData[input.name] && formData[input.name].match(input.pattern) ? 'is-valid' : 'is-invalid'
              }`}
              type="text"
              name={input.name}
              required
              placeholder={input.placeholder}
              value={formData[input.name] || ''}
              onChange={handleInputChange}
              pattern={input.pattern}
              style={glassEffect}
            />
          </div>
        ))}
      </div>
    </>
  );
}
                
     


export default InputGroup;
