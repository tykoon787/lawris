import React from "react";

import { PersonIcon, EmailIcon, LawyerIcon, PasswordIcon, BusinessIcon, NonLitigantIcon, StudentIcon } from './Icons';

function InputLogin({ 
  handleInputChange,
  formData,
  commonLoginInputs,
}) {

  return (
    <div>
        {commonLoginInputs.map((input, index) => (
          <div key={index} className="input-group mb-3">
            <span className="input-group-text color" >{input.icon}</span>
            <input
              className={`form-control ${
                formData[input.name] && formData[input.name].match(input.pattern) ? 'is-valid' : 'is-invalid'
              }`}
              type={input.name}
              name={input.name}
              required
              placeholder={input.placeholder}
              value={formData[input.name] || ''}
              onChange={handleInputChange}
              pattern={input.pattern}
              
            />
          </div>
        ))}
      </div>
  );
}

export default InputLogin;
