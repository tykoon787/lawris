import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';
import { getselectedUserType } from './userType';

//image import
const userTypeImages = {
  Lawyer: require('../Assets/lawyer.png'),
  Judiciary: require('../Assets/judiciary.jpg'),
  Business: require('../Assets/business.jpg'),
  Student: require('../Assets/law students2.jpg'),
  School: require('../Assets/institution.jpg'),
  'Law Firm': require('../Assets/lawFirm.jpg'),
  "Non-Litigant": require('../Assets/non-litigant.jpg'),
};



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [licenseNumber, setlicenseNumber] = useState('');
  const [employeeId, setemployeeId] = useState('');
  const [registrationNumber, setregistrationNumber] = useState('');
  const [studentId, setstudentId] = useState('');
  const [isoNumber, setisoNumber] = useState('');
  const [firmRegistrationNumber, setfirmRegistrationNumber] = useState('');
  
  
  const [requiredField] = useState(getselectedUserType);
  const navigate = useNavigate();


  const userTypeNames = {
    Lawyer: 'Lawyer',
    Judiciary: 'Judge',
    Business: 'Business Owner',
    Student: 'Student',
    School: 'School',
    'Law Firm': 'Firm',
    "Non-Litigant": "Non-Litigant",
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/dms_dashboard')
    alert('Login Successful');
  };

  const handleredirect = (event) => {
    event.preventDefault();
    navigate('/SignUp')
  }

  

  return (
    <div className="body">
        <div className='h1s'>
          <h1><br/>{userTypeNames[requiredField] || userTypeNames['Non-Litigant']}</h1> 
        </div>
        <div className="login-page">
          <div className="animation">
            <img src={userTypeImages[requiredField] || userTypeImages['Non-Litigant']} alt={userTypeNames[requiredField]} className="court"/>
          </div>

          <form onSubmit={handleSubmit} className='form'>
            <h1 className='login'>Login</h1>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className='input'
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className='input'
            />
            {requiredField === "Lawyer" && (
            <input
              type="text"
              name="licenseNumber"
              placeholder="License Number"
              value={licenseNumber}
              onChange={(event) => setlicenseNumber(event.target.value)}
              required
              className='input'
            />
            )}
            {requiredField === "Judiciary" && (
              <input
                type="text"
                name="employeeId"
                placeholder="Employee ID"
                value={employeeId}
                onChange={(event) => setemployeeId(event.target.value)}
                required
                className='input'
              />
            )}
            {requiredField === "Business" && (
              <input
                type="text"
                name="registrationNumber"
                placeholder="Registration Number"
                value={registrationNumber}
                onChange={(event) => setregistrationNumber(event.target.value)}
                required
                className='input'
              />
            )}
            {requiredField === "Student" && (
              <input
                type="text"
                name="studentId"
                placeholder="Student ID"
                value={studentId}
                onChange={(event) => setstudentId(event.target.value)}
                required
                className='input'
              />
            )}
            {requiredField === "School" && (
              <input
                type="text"
                name="isoNumber"
                placeholder="ISO Number"
                value={isoNumber}
                onChange={(event) => setisoNumber(event.target.value)}
                required
                className='input'
              />
            )}
            {requiredField === "Law Firm" && (
              <input
                type="text"
                name="firmRegistrationNumber"
                placeholder="Firm Registration Number"
                value={firmRegistrationNumber}
                onChange={(event) => setfirmRegistrationNumber(event.target.value)}
                required
                className='input'
              />
            )}
            <button type="submit" onClick={(event) => handleSubmit} className=''>Login</button>

            <div className='mt-4 text-center'>
              Don't have an account? 
            </div>
            <button onClick={handleredirect}>Create Account</button>
          </form>
        </div>
    </div>
  );
}

export default Login;
