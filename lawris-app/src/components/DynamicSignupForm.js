import React from 'react';
//import userList from '../utils/userList';
import { PersonIcon, EmailIcon, LawyerIcon, PasswordIcon, PhoneIcon, BusinessIcon, NonLitigantIcon, StudentIcon } from "../components/Icons";

<<<<<<< HEAD
=======
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
>>>>>>> eb1a3215765e4a409cb7be3f86fecc71794eccf1




const inputGroup = (userList) => {
  
  return (
    <div>
      {userList.length > 0 && Object.entries(userList[0].map(([key, value]) => (
        <DynamicInputField 
        key={key}
        icon={value.icon}
        name={value.name}
        placeholder={value.placeholder}
        pattern={value.pattern}
        />
      )))
      }
      {userList.slice(1).map((user, index) => (
        <DynamicInputField
        key={index}
        icon={user.icon}
        name={user.name}
        placeholder={user.placeholder}
        pattern={user.pattern} />
      ))}
    
    </div>

  )

}

const DynamicInputField = ({ icon, name, placeholder, pattern }) => {
  return (
    <div className="input-group mb-3" id="dynamicInput">
      <span>
        {icon}
      </span>
      <input className="form-control mb-3" name={name} placeholder={placeholder} pattern={pattern} />
    </div>
  );
};
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

const userList = [
  {lawyer: {
      icon: <LawyerIcon />,
      name: 'LicenceNumber',
      pattern: '',
      placeholder: 'LicenceNumber',
  }
},
{
  nonLitigant: {
      icon: <PersonIcon />,
      name: '',
      pattern: '',
      placeholder:'',
  }
}, 
{
  student: {
      icon: <PersonIcon />,
      name: 'studentNumber',
      pattern: '',
      placeholder:'studentNumber',
  }
},
{
  business: {
      icon: <BusinessIcon />,
      name: 'BusinessNumber',
      pattern: '',
      placeholder: 'BusinessNumber',
  }
}

];

export default inputGroup;
