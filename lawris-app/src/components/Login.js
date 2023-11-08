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
    <div className='main'>
      <div className='contentContainer d-flex flex-column justify-content-center align-items-center'>
        <div className='card m-4 col-lg-10'>
          <div className='card-body d-flex p-0'>
            <div className='col-md-6'>
              <img
                className="card-img"
                style={{ minHeight: '100%', objectFit: 'cover' }}
                src={userTypeImages[requiredField] || userTypeImages['Non-Litigant']}
                alt={userTypeNames[requiredField]}
              />
            </div>
    
            <div className='col-md-6' style={{backgroundColor: '#8dc6ff'}}>
              <h1 className='text-white m-3'><br/>{userTypeNames[requiredField] || userTypeNames['Non-Litigant']}</h1>
              <form className='w-100 p-4 needs-validation'>
                <div className='input-group mb-3'>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
    
                <div className='input-group mb-3'>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    className='form-control mb-3' // Correct class name
                  />
                </div>
    
                {requiredField === "Lawyer" && (
                  <div className='input-group mb-3'>
                    <input
                      type="text"
                      name="licenseNumber"
                      placeholder="License Number"
                      value={licenseNumber}
                      onChange={(event) => setlicenseNumber(event.target.value)}
                      required
                      className='form-control' // Correct class name
                    />
                  </div>
                )}
    
                {requiredField === "Judiciary" && (
                  <div className='input-group mb-3'>
                    <input
                      type="text"
                      name="employeeId"
                      placeholder="Employee ID"
                      value={employeeId}
                      onChange={(event) => setemployeeId(event.target.value)}
                      required
                      className='form-control'
                    />
                  </div>
                )}
    
                {requiredField === "Student" && (
                  <div className='input-group mb-3'>
                    <input
                      type="text"
                      name="studentId"
                      placeholder="Student ID"
                      value={studentId}
                      onChange={(event) => setstudentId(event.target.value)}
                      required
                      className='form-control' 
                    />
                  </div>
                )}
    
                {requiredField === "School" && (
                  <div className='input-group mb-3'>
                    <input
                      type="text"
                      name="isoNumber"
                      placeholder="ISO Number"
                      value={isoNumber}
                      onChange={(event) => setisoNumber(event.target.value)}
                      required
                      className='form-control' 
                    />
                  </div>
                )}
    
                {requiredField === "Law Firm" && (
                  <div className='input-group mb-3'>
                    <input
                      type="text"
                      name="firmRegistrationNumber"
                      placeholder="Firm Registration Number"
                      value={firmRegistrationNumber}
                      onChange={(event) => setfirmRegistrationNumber(event.target.value)}
                      required
                      className='form-control' 
                    />
                  </div>
                )}
              
                <button className='btn btn-lg w-100 btn-outline-secondary text-white' style={{backgroundColor: '#ff9a3c'}} type="submit" onClick={handleSubmit}>Login</button>
                <div className='d-flex flex-column mt-3'>
                  <p className="lead pb-lg-2 fs-5 text-white">
                    Don't Have an Account? <span> </span>
                    <a href="/signup" style={{ color: '393f81' }}>Signup</a>
                    <button className='btn btn-lg w-100 btn-outline-secondary text-white' style={{backgroundColor: '#ff9a3c'}} onClick={handleredirect}>Create Account</button>
                  </p>
                  <a href="#terms" className="small text-muted text-white">Terms of Use</a><br></br>
                  <a href="#privacy" className="small text-muted text-white">Privacy Policy</a>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  );
  

  

  // return (
  //   <div className="'card m-2 col-lg-10'">
  //       <div className='card-body d-flex p-0'>
  //         <h1><br/>{userTypeNames[requiredField] || userTypeNames['Non-Litigant']}</h1> 
  //       </div>
  //       <div className="login-page ">
  //         <div className="animation">
  //           <img className="card-img" style={{minHeight: '100%', objectFit: 'cover',}}
  //           src={userTypeImages[requiredField] || userTypeImages['Non-Litigant']} alt={userTypeNames[requiredField]} />
  //         </div>

  //         <form onSubmit={handleSubmit} className='form'>
  //           <h1 className='login'>Login</h1>
  //           <input
  //             type="email"
  //             name="email"
  //             placeholder="Email"
  //             value={email}
  //             onChange={(event) => setEmail(event.target.value)}
  //             required
  //             className='form-control'
  //           />
  //           <input
  //             type="password"
  //             name="password"
  //             placeholder="Password"
  //             value={password}
  //             onChange={(event) => setPassword(event.target.value)}
  //             required
  //             className='form-control'
  //           />
  //           {requiredField === "Lawyer" && (
  //           <input
  //             type="text"
  //             name="licenseNumber"
  //             placeholder="License Number"
  //             value={licenseNumber}
  //             onChange={(event) => setlicenseNumber(event.target.value)}
  //             required
  //             className='input'
  //           />
  //           )}
  //           {requiredField === "Judiciary" && (
  //             <input
  //               type="text"
  //               name="employeeId"
  //               placeholder="Employee ID"
  //               value={employeeId}
  //               onChange={(event) => setemployeeId(event.target.value)}
  //               required
  //               className='input'
  //             />
  //           )}
  //           {requiredField === "Business" && (
  //             <input
  //               type="text"
  //               name="registrationNumber"
  //               placeholder="Registration Number"
  //               value={registrationNumber}
  //               onChange={(event) => setregistrationNumber(event.target.value)}
  //               required
  //               className='input'
  //             />
  //           )}
  //           {requiredField === "Student" && (
  //             <input
  //               type="text"
  //               name="studentId"
  //               placeholder="Student ID"
  //               value={studentId}
  //               onChange={(event) => setstudentId(event.target.value)}
  //               required
  //               className='input'
  //             />
  //           )}
  //           {requiredField === "School" && (
  //             <input
  //               type="text"
  //               name="isoNumber"
  //               placeholder="ISO Number"
  //               value={isoNumber}
  //               onChange={(event) => setisoNumber(event.target.value)}
  //               required
  //               className='input'
  //             />
  //           )}
  //           {requiredField === "Law Firm" && (
  //             <input
  //               type="text"
  //               name="firmRegistrationNumber"
  //               placeholder="Firm Registration Number"
  //               value={firmRegistrationNumber}
  //               onChange={(event) => setfirmRegistrationNumber(event.target.value)}
  //               required
  //               className='input'
  //             />
  //           )}
  //           <button type="submit" onClick={(event) => handleSubmit} className=''>Login</button>

  //           <div className='mt-4 text-center'>
  //             Don't have an account? 
  //           </div>
  //           <button onClick={handleredirect}>Create Account</button>
  //         </form>
  //       </div>
  //   </div>
  // );
}

export default Login;
