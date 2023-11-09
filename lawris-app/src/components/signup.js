import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/styles/signup.css';
import student from '../Assets/law students2.jpg';
import nonLitigant from '../Assets/non-litigant.jpg';
import judiciary from '../Assets/judiciary.jpg';
import institution from '../Assets/institution.jpg';
import business from '../Assets/business.jpg';
import lawyer from '../Assets/lawyer.png';
import lawFirm from '../Assets/lawFirm.jpg';
import logo from '../Assets/transparentLawrisLogo.png';
import InputGroup from './DynamicSignupForm';
import Input from './Input';
import Navbar from './NavBar';

import { PersonIcon, EmailIcon, LawyerIcon, PasswordIcon, PhoneIcon, BusinessIcon, NonLitigantIcon, StudentIcon } from './Icons';

const commonInputs = [
  {
    name: 'name',
    icon: <PersonIcon />, // You can define the icon for the common inputs
    pattern: '^[A-Za-z\\s]+$',
    placeholder: 'Full Name',
  },
  {
    name: 'email',
    icon: <EmailIcon />,
    pattern: '^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$',
    placeholder: 'Email',
  },
  {
    name: 'password',
    icon: <PasswordIcon />,
    pattern: '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$',
    placeholder: 'Password',
  },
  {
    name: 'confirmPassword',
    icon: <PasswordIcon />,
    pattern: null, // You can set the pattern to null for confirmPassword
    placeholder: 'Confirm Password',
  },
  {
    name: 'phone',
    icon: <PhoneIcon />,
    pattern: '^\\+254[1-9]\\d{8}$',
    placeholder: 'Phone Number',
  },
];

 const userList = [
   {
    lawyer: {
       icon: <LawyerIcon />,
       name: 'LicenceNumber',
       pattern: '',
       placeholder: 'LicenceNumber',
   },
 },
 {
   nonLitigant: {
       icon: <PersonIcon />,
       name: '',
       pattern: '',
       placeholder:'',
   },
 }, 
 {
   student: {
       icon: <PersonIcon />,
       name: 'studentNumber',
       pattern: '',
       placeholder:'studentNumber',
   },
 },
 {
   business: {
       icon: <BusinessIcon />,
       name: 'RegistrationNumber',
       pattern: '',
       placeholder: 'Registration Number',
   },
  },
  {
    judiciary: {
      icon: '',
      name: 'Employeeid',
      pattern: '',
      placeholder: 'EmployeeId',
    }
  },
  {
    lawFirm: {
      icon: '',
      name: 'registrationNumber',
      pattern: '',
      placeholder: 'Registration Number',
    },
  },
  {
    institution: {
      icon: '',
      name: 'IsoNumber',
      pattern: '',
      placeholder: 'ISO Number',
    }
  },

    
  ];


const Introduction = () => {
  return(
      <div className='introductionContainer d-flex'>
        <div className='d-flex'>
          <div className='col-2'>
            <img src={logo} alt='logo' style={{width: '120%'}}/>
          </div>
          <div className='d-flex flex-column p-2 justify-content-center col-10'>
            <h1 className='fw-bold'>LAWRIS</h1>
            <h5 className='lead'>Register as a Lawyer to get an account</h5>
          </div>
        </div>
      </div>
  );
}
const Signup = () => {
  const [userType, setUserType] = useState('lawyer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    employeeId: '',
    registrationNumber: '',
    studentNo: '',
    isoId: '',
    phone: '',
    licenceNumber: '',
    employeeNo: '',

  });

  const profileImage = {
    lawyer: lawyer,
    judiciary: judiciary,
    institution: institution,
    lawFirm: lawFirm,
    student: student,
    nonLitigant: nonLitigant,
    business: business
  }

  const navigate = useNavigate();
  const cardStyle = {
    backgroundColor: 'rgb(4, 4, 94)',
    color: 'white',
    borderRadius: '1.5rem',
  };
  const header = {
   // backgroundColor: 'rgb(12, 12, 47)',
    color: 'white',
    cursor: 'pointer'
  }

  const btnHeader = {
    backgroundColor: '#ff9a3c',
    color: 'white',
    cursor: 'pointer',
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      employeeId: '',
      registrationNumber: '',
      studentNo: '',
      isoId: '',
      phone: '',
      licenceNumber: '',
      employeeNo: ''
      });
      alert('Registration Successful')

    console.log(formData.password)
    navigate('/Login');
  };


 

  return (
     <div className="main">
      <div className='contentContainer d-flex flex-column justify-content-center align-items-center'>
        <div className='navbarContainer p-3 col-lg-10 mt-4' style={header}>
            {/* <ul className='nav nav-underline text-small d-flex justify-content-between'>
              <li className='nav-item'>
              <a href="#lawyer"
              className={`navbar-brand nav-link active text-light ${userType === 'lawyer' ? 'selected' : ''}`}
              onClick={() => setUserType('lawyer')}
              >
                Lawyer
              </a>
              </li>
              <li className='nav-item'>
                <a href="#non-litigant"
                  className={`navbar-brand nav-link text-light ${userType === 'nonLitigant' ? 'selected' : ''}`}
                  onClick={() => setUserType('nonLitigant')}
                >
                  Non-Litigant
                </a>

              </li>
              <li className='nav-item'>
                <a href="#student"
                  className={`navbar-brand nav-link text-light ${userType === 'student' ? 'selected' : ''}`}
                  onClick={() => setUserType('student')}
                >
                  Student
              </a>
              </li>
              <li className='nav-item'>
                <a href="#judiciary"
                    className={`navbar-brand nav-link text-light ${userType === 'judiciary' ? 'selected' : ''}`}
                    onClick={() => setUserType('judiciary')}
                  >
                    Judiciary
              </a>
              </li>
              <li className='nav-item'>
                <a href="#lawfirm"
                  className={`navbar-brand nav-link text-light ${userType === 'lawFirm' ? 'selected' : ''}`}
                  onClick={() => setUserType('lawFirm')}
                >
                  Law Firm
              </a>
              </li>
              <li className='nav-item'>
                <a href="#Institution"
                  className={`navbar-brand nav-link text-light ${userType === 'institution' ? 'selected' : ''}`}
                  onClick={() => setUserType('institution')}
                >
                  Institution
              </a>
              </li>
              <li className='nav-item'>
                <a href="#Business"
                    className={`navbar-brand nav-link text-light ${userType === 'business' ? 'selected' : ''}`}
                    onClick={() => setUserType('business')}
                  >
                    Business
              </a>

              </li>
            </ul> */}
          
        <div className='navbarContainer p-2 col-lg-10 mt-4' style={header}>
         <Navbar userType={userType} setUserType={setUserType} /> 
        </div>
        <div className='card m-2 col-lg-10' style={cardStyle}>
          <div className='card-body d-flex p-0'>
              <div className='col-md-6'>
                <img className="card-img" style={{minHeight: '100%', objectFit: 'cover', borderTopLeftRadius: '1.5rem', borderBottomLeftRadius: '1.5rem'}} src={profileImage[userType]} alt={userType} />
              </div>
              <div className='col-md-6 p-2' style={{backgroundColor: '#8dc6ff', borderTopRightRadius: '1.5rem', borderBottomRightRadius: '1.5rem'}}>
                <Introduction />
                {/* <inputGroup userList={userList} /> */}
                
                  <form className='w-100 p-4 needs-validation' noValidate onSubmit={handleSubmit}>
                    <InputGroup userList={userList} commonInputs={commonInputs} userType={userType} formData={formData} handleInputChange={handleInputChange} />
                   {/* <div className='input-group mb-3'>
                      <span className='input-group-text'>
                        <i className="bi bi-briefcase-fill"></i>
                      </span>
                      {userType === 'lawyer' && (
                      <input
                      className={`form-control ${formData.licenceNumber.match(/^1234$/) ? 'is-valid' : 'is-invalid'}`}
                      id="licenseNumberInput"
                      aria-describedby='inputFeedback'
                      type="text"
                      name="licenceNumber"
                      required
                      placeholder="LicenceNumber"
                      value={formData.practicingNumber}
                      onChange={handleInputChange}
                      pattern="^1234$"
                      />
                      )}
                  </div> */}
                     {/* <div className='input-group mb-3'>
                      <span className='input-group-text'>
                        <i className="bi bi-person-fill"></i>
                      </span>
                      <input
                      className={`form-control ${formData.name.match(/^[A-Za-z\s]+$/) ? 'is-valid' : 'is-invalid'}`}
                      type="text"
                      name="name"
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      pattern="^[A-Za-z\s]+$"
                      />
                    </div>  */}
                     {/* <div className='input-group mb-3'>
                      <span className='input-group-text'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                        </svg>
                      </span>
                      <input
                      className={`form-control ${formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/) ? 'is-valid' : 'is-invalid'}`}
                      type="email"
                      name="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      pattern="^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$"
                      />
                    </div> */}
                    {/* <div className='input-group mb-3'>
                      <span className='input-group-text'>
                        <i className="bi bi-key-fill"></i>
                      </span>
                      <input
                      className={`form-control ${formData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/) ? 'is-valid' : 'is-invalid'}`}
                      type="password"
                      name="password"
                      required
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$"
                      />
                      <span className='input-group-text'>
                        <i className="bi bi-eye-fill"></i>
                      </span>
                      <div className="invalid-feedback">
                        Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.
                      </div>
                    </div> */}
                    {/* <div className='input-group mb-3'>
                      <span className='input-group-text'>
                        <i className="bi bi-key-fill"></i>
                      </span>
                      <input
                      className={`form-control ${formData.confirmPassword === formData.password ? 'is-valid' : 'is-invalid'}`}
                      type="password"
                      name="confirmPassword"
                      required
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      />
                      <span className='input-group-text'>
                        <i className="bi bi-eye-fill"></i>
                      </span>
                      <div className="invalid-feedback">
                        Passwords do not match.
                      </div>
                    </div> */}
                    {/* <div className='input-group mb-3'>
                      <span className='input-group-text'>
                        <i className="bi bi-telephone-fill"></i>
                      </span>
                      <input
                      className={`form-control ${formData.phone.match(/^\+254[1-9]\d{8}$/
                      ) ? 'is-valid' : 'is-invalid'}`}
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      pattern='/^\+254[1-9]\d{8}$/'
                      />
                      <div className="invalid-feedback">
                        Phone number must be in the format +2547XXXXXXXX
                      </div>
                     <div> 
                     </div> 
                     </div>  */}
                      {/* {userType === 'student' && (
                      <input
                      className='form-control mb-3'
                      type="text"
                      name="studentId"
                      required
                      placeholder="studentId"
                      value={formData.studentId}
                      onChange={handleInputChange} />
                      )} */}
                      {/* {userType === 'judiciary' && (
                      <input
                      className='form-control mb-3'
                      type="text"
                      name="employeeId"
                      required
                      placeholder="Employee Id"
                      value={formData.employeeId}
                      onChange={handleInputChange} />
                      )} */}
                      {/* {userType === 'Law Firm' && (
                      <input
                      className='form-control mb-3'
                      type="text"
                      name="registrationNo"
                      required
                      placeholder="Registration Number"
                      value={formData.registrationNumber}
                      onChange={handleInputChange} />
                      )} */}
                      {/* {userType === 'Institution' && (
                      <input
                      className='form-control mb-3'
                      type="text"
                      name="isoNo"
                      required
                      placeholder="ISO Number"
                      value={formData.isoId}
                      onChange={handleInputChange} />
                      )} */}
                      {/* {userType === 'business' && (
                      <input
                      className='form-control mb-3'
                      type="text"
                      name="registrationNumber"
                      required
                      placeholder="Registration Number"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      /> */}
                      {/* )} */}
                      <button className='btn btn-lg w-100 btn-outline-secondary' style={btnHeader} type="submit">Register</button>
                      <div className='d-flex flex-column mt-3'>
                        <p className="lead pb-lg-2 fs-5">
                          Already Have an Account? <span> </span>
                          <a href="/login" style={{color:'393f81'}}>Login</a>
                        </p>
                        <a href="#terms" className="small text-muted">Terms of Use</a><br></br>
                        <a href="#privacy" className="small text-muted">Privacy Policy</a>
                      </div>
                    </form>
                {/* </div> */}
              </div>
            {/* </div> */}
          </div>
        </div>

      </div>
     </div>
     </div>
   );

};

export default Signup;
