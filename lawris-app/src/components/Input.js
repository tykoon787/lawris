import React from "react";

function Input({ icon, name, placeholder, pattern,inputType, id, formData, handleInputChange }) {
    return (
        <div className="input-group mb-3">
        <span className="input-group-text" >
           {icon} 
        </span>
        <input
            type="text"
            className={`form-control ${formData[inputType].match({pattern}) ? 'is-valid' : 'is-invalid'}`}
            aria-describedby='inputFeedback'
            id={id}
            name={name}
            placeholder={placeholder}
            pattern={pattern}
            value={formData.inputType}
            onChange={handleInputChange}
            required
        />
        </div>
  );
}

export default Input