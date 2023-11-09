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
    <div className="navbar text-small ">
      {userTypeOptions.map(option => (
        <a
          key={option}
          href={`#${option}`}
          className={`navbar-brand text-light ${userType === option ? 'selected' : ''}`}
          onClick={() => setUserType(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </a>
      ))}
    </div>
  );
};

export default Navbar;
