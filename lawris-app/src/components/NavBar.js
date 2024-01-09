import React from 'react';

import lawyerImage from '../static/icons/lawyer.png';
import nonLitigantImage from '../static/icons/user.png';
import lawFirmImage from '../static/icons/law_firm.png';
import studentImage from '../static/icons/graduation-hat.png';
import judiciaryImage from '../static/icons/judiciary.png';
import businessImage from '../static/icons/enterprise.png';
import schoolImage from '../static/icons/school.png';

const userTypeOptions = [
  'lawyer',
  'nonLitigant',
  'student',
  'judiciary',
  'lawFirm',
  'institution',
  'business'
];

const userTypeOption = {
  lawyer: lawyerImage,
  nonLitigant: nonLitigantImage,
  student: studentImage,
  judiciary: judiciaryImage,
  lawFirm: lawFirmImage,
  institution: schoolImage, // Assuming 'institution' corresponds to 'school'
  business: businessImage,
};

const Navbar = ({ userType, setUserType }) => {
  return (
    <ul className='nav nav-underline text-small d-flex justify-content-between'>
      {userTypeOptions.map(option => (
        <li className='nav-item' key={option}>
          <a
            href={`#${option}`}
            className={`nav-link ${userType === option ? 'selected' : ''}`}
            style={{ cursor: 'pointer', color: 'black' }}
            onClick={() => setUserType(option)}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </a>
        </li>
      ))}
    </ul>
  );
};


// export const MenuNav = ({ userType, setUserType}) => {
//   return (
//     <div>
//       <ul className='nav nav-underline text-small d-flex flex-column'>
//         {userTypeOptions.map((option) => (
//           <li className='nav-item' key={option}>
//             <a
//             href={`#${option}`}
//             className={`nav-link ${userType === option ? 'selected' : ''}`}
//             style={{ cursor: 'pointer', color: 'black' }}
//             onClick={() => setUserType(option)}
//           >
//             {option.charAt(0).toUpperCase() + option.slice(1)}
//           </a>

//           </li>

//         ))}

//       </ul>
//     </div>
//   )

// };

export const MenuNav = ({ userType, setUserType }) => {
  return (
    <div>
      <ul className='nav nav-underline text-small d-flex flex-column'>
        {Object.entries(userTypeOption).map(([option, userImage]) => (
          <li className='nav-item' key={option}>
            <span
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'black' }}
              onClick={() => setUserType(option)}
            >
              <img src={userImage} alt={option} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Navbar;
