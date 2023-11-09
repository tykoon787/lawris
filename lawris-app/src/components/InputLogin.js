import React from "react";

function InputLogin({ type, name, placeholder, value, onChange, className, error }) {
 

  return (
    <div className="input-group mb-3">
      <input
        type={type}
        className={className} 
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default InputLogin;
