import React from 'react';

function InputGroup({ list, userType, formData, handleInputChange }) {
    return (
        <div>
          {list.map((item, index) => (
            <div>
                <div key={index} className='input-group mb-3'>
                    <span className='input-group-text'>
                {item.icon}
                    </span>
                    {userType === 'lawyer' && (
                    <input
                      className={`form-control ${formData[item.name].match(item.pattern) ? 'is-valid' : 'is-invalid'}`}
                      type="text"
                      name={item.name}
                      required
                      placeholder={item.placeholder}
                      value={formData[item.name]}
                      onChange={handleInputChange}
                      pattern={item.pattern}
                    />
                )}
                </div>
                <div>
                    {userType === 'student' && (
                      <input
                      className={`form-control ${formData[item.name].match(item.pattern) ? 'is-valid' : 'is-invalid'}`}
                      type="text"
                      name={item.studentId}
                      required
                      placeholder={item.studentId}
                      value={formData[item.studentId]}
                      onChange={handleInputChange} />
                      )}
                </div>
            </div>
          ))}
        </div>
      );
    }

export default InputGroup;
