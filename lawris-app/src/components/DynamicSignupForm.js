import React from 'react';
import userList from './utils/userList.js';
import { PersonIcon, EmailIcon, LawyerIcon, PasswordIcon, PhoneIcon, BusinessIcon, NonLitigantIcon, StudentIcon } from "../components/Icons";

const InputGroup = ( userType) => {
  return (
    <div className="input-group mb-3">
      <span>

      </span>

      <input className="form-control"/>
    </div>
  )
}




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
//  function InputGroup({ userList, userType, formData, handleInputChange }) {
//   return (
//     <div>
//       {userList.map((user, index) => {
//         const [userTypeKey, userProps] = Object.entries(user)[0]; // Get the key-value pair for the user type

//         return (
//           <div key={index} className="input-group mb-3">
//             <span className="input-group-text">{userProps.icon}</span>
//             {userType === userTypeKey && (
//               <input
//                 className={`form-control ${
//                   formData[userProps.name] && formData[userProps.name].match(userProps.pattern) ? 'is-valid' : 'is-invalid'
//                 }`}
//                 type="text"
//                 name={userProps.name}
//                 required
//                 placeholder={userProps.placeholder}
//                 value={formData[userProps.name] || ''}
//                 onChange={handleInputChange}
//                 pattern={userProps.pattern}
//               />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }
                
     


export default InputGroup;
