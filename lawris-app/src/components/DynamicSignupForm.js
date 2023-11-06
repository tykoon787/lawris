import React from 'react';

import userList from './utils/userList';

// Testing
const InputGroupComponent = ( userList ) => {
  return (
      <div className="input-group mb-3">
        {
          userList.map((user, index) => (
            Object.entries(user).forEach(([key, value]) => {
              <DynamicInputField />
            })
          ))
        }
        <span>
          {/* icon goes here */}
        </span>
        <input className="form-control" />
      </div>
  )
}

const DynamicInputField = ( icon, name, placeholder, pattern) => {
  return (
    <div className="input-group mb-3" id="dynamicInput">
      <span>
        {icon}
      </span>
      <input className="form-control mb-3" placeholder={placeholder} pattern={pattern}>
        
      </input>
    </div>
  )
}


// function InputGroup({ list, userType, formData, handleInputChange }) {
//     return (
//         <div>
//           {list.map((item, index) => (
//             <div>
//                 <div key={index} className='input-group mb-3'>
//                     <span className='input-group-text'>
//                 {item.icon}
//                     </span>
//                     {userType === 'lawyer' && (
//                       <DynamicInputField key="lawyer"/>
//                     )}

//                     {userType === 'lawyer' && (
//                     <input
//                       className={`form-control ${formData[item.name].match(item.pattern) ? 'is-valid' : 'is-invalid'}`}
//                       type="text"
//                       name={item.name}
//                       required
//                       placeholder={item.placeholder}
//                       value={formData[item.name]}
//                       onChange={handleInputChange}
//                       pattern={item.pattern}
//                     />
//                 )}
//                 </div>
//                 <div>
//                     {userType === 'student' && (
//                       <input
//                       className={`form-control ${formData[item.name].match(item.pattern) ? 'is-valid' : 'is-invalid'}`}
//                       type="text"
//                       name={item.studentId}
//                       required
//                       placeholder={item.studentId}
//                       value={formData[item.studentId]}
//                       onChange={handleInputChange} />
//                       )}
//                 </div>
//             </div>
//           ))}
//         </div>
//       );
//     }

export default InputGroup;
