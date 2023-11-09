import React from 'react';

const userTypeOptions = [
  'lawyer',
  'nonLitigant',
  'student',
  'judiciary',
  'lawFirm',
  'institution',
  'business'
];

const Navbar = ({ userType, setUserType }) => {
  return (
    <ul className='nav nav-underline text-small d-flex justify-content-between'>
      {userTypeOptions.map(option => (
        <li className='nav-item' key={option}>
          <a
            href={`#${option}`}
            className={` nav-link ${userType === option ? 'selected' : ''}`}
            style={{ cursor: 'pointer', color: 'orange' }}
            onClick={() => setUserType(option)}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
