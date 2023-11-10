import React from 'react';
import InputLogin from './InputLogin'; // Import the InputField component

const TypeChecker = ({
  userList,
  userType,
  formData,
  handleInputChange,
}) => {
  return (
    <>
     {userList.map((user, index) => {
        const [userTypeKey, userProps] = Object.entries(user)[0]; // Get the key-value pair for the user type

        return (
          <div key={index} className="input-group_container">
            {userType === userTypeKey && (
              <div className='input-group mb-3'
              >
                <span className="input-group-text color" >{userProps.icon}</span>
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
                
                id={userProps.id}
                aria-describedby='inputFeedback'
              />
              

              </div>

             
            )}
          </div>
        );
      })}  
    </>
  );
};

export default TypeChecker;