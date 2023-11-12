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
import TypeChecker from './TypeChecker';
import {getselectedUserType} from './userType';
import InputLogin from './InputLogin';


import { PersonIcon, EmailIcon, LawyerIcon, PasswordIcon, PhoneIcon, BusinessIcon, NonLitigantIcon, StudentIcon } from './Icons';

const commonInputs = [
  {
    name: 'name',
    icon: <PersonIcon />, // You can define the icon for the common inputs
    pattern: '^[A-Za-z\\s]+$',
    placeholder: 'Full Name',
    required: true,
  },
  {
    name: 'email',
    icon: <EmailIcon />,
    pattern: '^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$',
    placeholder: 'Email',
    required: true,
  },
  {
    name: 'password',
    icon: <PasswordIcon />,
    pattern: '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$',
    placeholder: 'Password',
    required: true,
  },
  {
    name: 'confirmPassword',
    icon: <PasswordIcon />,
    pattern: null, // You can set the pattern to null for confirmPassword
    placeholder: 'Confirm Password',
    required: true,
  },
  {
    name: 'phone',
    icon: <PhoneIcon />,
    pattern: '^\\+254[1-9]\\d{8}$',
    placeholder: 'Phone Number',
    required: true,
  },
];

const commonLoginInputs = [
 
  {
    name: 'email',
    icon: <EmailIcon />,
    pattern: '^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$',
    placeholder: 'Email',
    required: true,
  },
  {
    name: 'password',
    icon: <PasswordIcon />,
    pattern: '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$',
    placeholder: 'Password',
    required: true,
  }, 
];

 const userList = [
   {
    lawyer: {
       icon: <LawyerIcon />,
       name: 'LicenceNumber',
       pattern: '^12345$',
       placeholder: 'LicenceNumber',
       id: 'licenseNumberInput',
       required: true,
   },
 },
 {
   nonLitigant: {
       icon: <PersonIcon />,
       name: '',
       pattern: '',
       placeholder:'Name',

   },
 }, 
 {
   student: {
       icon: <PersonIcon />,
       name: 'studentNumber',
       pattern: '^1234$',
       placeholder:'studentNumber',
       id: 'studentNumberInput',
       required: true,
   },
 },
 {
   business: {
       icon: <BusinessIcon />,
       name: 'RegistrationNumber',
       pattern: '^1234$',
       placeholder: 'Registration Number',
       id: 'registrationNumberInput',
       required: true,
   },
  },
  {
    judiciary: {
      icon: '',
      name: 'Employeeid',
      pattern: '^1234$',
      placeholder: 'EmployeeId',
      id: 'employeeIdInput',
      required: true,
    }
  },
  {
    lawFirm: {
      icon: '',
      name: 'registrationNumber',
      pattern: '^1234$',
      placeholder: 'Registration Number',
      id: 'registrationNumberInput',
      required: true,
    },
  },
  {
    institution: {
      icon: '',
      name: 'IsoNumber',
      pattern: '^1234$',
      placeholder: 'ISO Number',
      id: 'isoNumberInput',
      required: true,
    }
  },  
  ];

  const userTypes = [
    'lawyer',
    'nonLitigant',
    'student',
    'judiciary',
    'lawFirm',
    'institution',
    'business'
  ];


const Introduction = ({userType, isSignup}) => {
  return(
      <div className='introductionContainer d-flex'>
        <div className='d-flex'>
          <div className='col-2'>
            <img src={logo} alt='logo' style={{width: '120%'}}/>
          </div>
          <div className='d-flex flex-column p-2 justify-content-center col-10'>
            <h1 className='fw-bold'>LAWRIS</h1>
            <div className='mx-left'>
              {isSignup ?  `Register as a ${userType} to get an account` : 'Login to your LAWYRIS account'}
            </div>
          </div>
        </div>
      </div>
  );
}
// const Signup = () => {
//   const [userType, setUserType] = useState('lawyer');
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     employeeId: '',
//     registrationNumber: '',
//     studentNo: '',
//     isoId: '',
//     phone: '',
//     licenceNumber: '',
//     employeeNo: '',

//   });

//   const profileImage = {
//     lawyer: lawyer,
//     judiciary: judiciary,
//     institution: institution,
//     lawFirm: lawFirm,
//     student: student,
//     nonLitigant: nonLitigant,
//     business: business
//   }

//   const navigate = useNavigate();
//   const cardStyle = {
//     background: 'transparent',
//     borderRadius: '16px',
//     boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
//     backdropFilter: 'blur(20px)',
//     WebkitBackdropFilter: 'blur(20px)',
//     border: '1px solid rgba(51, 204, 255, 0.34)',
//     color: 'white',
//   }
//   const header = {
//    // backgroundColor: 'rgb(12, 12, 47)',
//     color: 'white',
//     cursor: 'pointer'
//   }

//   const navbar = {
//     background: 'orange',
//     borderRadius: '10px',
//     boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
//     backdropFilter: 'blur(20px)',
//     WebkitBackdropFilter: 'blur(20px)',
//     border: '1px solid rgba(255, 154, 60, 0.34)',
//   }

//   const btnHeader = {
//     backgroundColor: '#ff9a3c',
//     color: 'white',
//     cursor: 'pointer',
//   }


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const requiredFields = ['name', 'email', 'password', 'confirmPassword', 'phone', 'licenceNumber', 'employeeId', 'registrationNumber', 'studentNo', 'isoId', 'employeeNo'];
//     const emptyFields = requiredFields.filter(field => !formData[field]);

//     if (emptyFields.length > 0) {
//       alert(`Please fill in the following fields: ${emptyFields.join(', ')}`);
//       return;
//     }

//     // Check for mismatched passwords
//     if (formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     setFormData({
//       name: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       employeeId: '',
//       registrationNumber: '',
//       studentNo: '',
//       isoId: '',
//       phone: '',
//       licenceNumber: '',
//       employeeNo: ''
//       });
//       alert('Registration Successful')

//     console.log(formData.password)
//     navigate('/Login');
//   };


 

//   return (
//      <div className="main">
//       <div className='contentContainer d-flex flex-column justify-content-center align-items-center'>
//         <div className='navbarContainer p-3 col-lg-10 mt-1' style={header}>
//             {/* <ul className='nav nav-underline text-small d-flex justify-content-between'>
//               <li className='nav-item'>
//               <a href="#lawyer"
//               className={`navbar-brand nav-link active text-light ${userType === 'lawyer' ? 'selected' : ''}`}
//               onClick={() => setUserType('lawyer')}
//               >
//                 Lawyer
//               </a>
//               </li>
//               <li className='nav-item'>
//                 <a href="#non-litigant"
//                   className={`navbar-brand nav-link text-light ${userType === 'nonLitigant' ? 'selected' : ''}`}
//                   onClick={() => setUserType('nonLitigant')}
//                 >
//                   Non-Litigant
//                 </a>

//               </li>
//               <li className='nav-item'>
//                 <a href="#student"
//                   className={`navbar-brand nav-link text-light ${userType === 'student' ? 'selected' : ''}`}
//                   onClick={() => setUserType('student')}
//                 const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const requiredFields = ['name', 'email', 'password', 'confirmPassword', 'phone', 'licenceNumber', 'employeeId', 'registrationNumber', 'studentNo', 'isoId', 'employeeNo'];
//     const emptyFields = requiredFields.filter(field => !formData[field]);

//     if (emptyFields.length > 0) {
//       alert(`Please fill in the following fields: ${emptyFields.join(', ')}`);
//       return;
//     }

//     // Check for mismatched passwords
//     if (formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }>
//                   Student
//               </a>
//               </li>
//               <li className='nav-item'>
//                 <a href="#judiciary"
//                     className={`navbar-brand nav-link text-light ${userType === 'judiciary' ? 'selected' : ''}`}
//                     onClick={() => setUserType('judiciary')}
//                   >
//                     Judiciary
//               </a>
//               </li>
//               <li className='nav-item'>
//                 <a href="#lawfirm"
//                   className={`navbar-brand nav-link text-light ${userType === 'lawFirm' ? 'selected' : ''}`}
//                   onClick={() => setUserType('lawFirm')}
//                 >
//                   Law Firm
//               </a>
//               </li>
//               <li className='nav-item'>
//                 <a href="#Institution"
//                   className={`navbar-brand nav-link text-light ${userType === 'institution' ? 'selected' : ''}`}
//                   onClick={() => setUserType('institution')}
//                 >
//                   Institution
//               </a>
//               </li>
//               <li className='nav-item'>
//                 <a href="#Business"
//                     className={`navbar-brand nav-link text-light ${userType === 'business' ? 'selected' : ''}`}
//                     onClick={() => setUserType('business')}
//                   >
//                     Business
//               </a>

//               </li>
//             </ul> */}
          
//         <div className='navbarContainer p-2 col-lg-10 mt-2' style={navbar}>
//          <Navbar userType={userType} setUserType={setUserType} /> 
//         </div>
//         <div className='card m-2 col-lg-10' style={cardStyle}>
//           <div className='card-body d-flex p-0'>
//               <div className='col-md-6'>
//                 <img className="card-img" style={{minHeight: '100%', objectFit: 'cover', borderTopLeftRadius: '1.5rem', borderBottomLeftRadius: '1.5rem'}} src={profileImage[userType]} alt={userType} />
//               </div>
//               <div className='col-md-6 p-2 formInput' style={{borderTopRightRadius: '1rem', borderBottomRightRadius: '1rem'}}>
//                 <Introduction />
//                 {/* <inputGroup userList={userList} /> */}
                
//                   <form className='w-100 p-4 needs-validation' noValidate onSubmit={handleSubmit}>
//                     <InputGroup userList={userList} commonInputs={commonInputs} userType={userType} formData={formData} handleInputChange={handleInputChange} />
//                    {/* <div className='input-group mb-3'>
//                       <span className='input-group-text'>
//                         <i className="bi bi-briefcase-fill"></i>
//                       </span>
//                       {userType === 'lawyer' && (
//                       <input
//                       className={`form-control ${formData.licenceNumber.match(/^1234$/) ? 'is-valid' : 'is-invalid'}`}
//                       id="licenseNumberInput"
//                       aria-describedby='inputFeedback'
//                       type="text"
//                       name="licenceNumber"
//                       required
//                       placeholder="LicenceNumber"
//                       value={formData.practicingNumber}
//                       onChange={handleInputChange}
//                       pattern="^1234$"
//                       />
//                       )}
//                   </div> */}
//                      {/* <div className='input-group mb-3'>
//                       <span className='input-group-text'>
//                         <i className="bi bi-person-fill"></i>
//                       </span>
//                       <input
//                       className={`form-control ${formData.name.match(/^[A-Za-z\s]+$/) ? 'is-valid' : 'is-invalid'}`}
//                       type="text"
//                       name="name"
//                       required
//                       placeholder="Full Name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       pattern="^[A-Za-z\s]+$"
//                       />
//                     </div>  */}
//                      {/* <div className='input-group mb-3'>
//                       <span className='input-group-text'>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
//                         <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
//                         </svg>
//                       </span>
//                       <input
//                       className={`form-control ${formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/) ? 'is-valid' : 'is-invalid'}`}
//                       type="email"
//                       name="email"
//                       required
//                       placeholder="Email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       pattern="^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$"
//                       />
//                     </div> */}
//                     {/* <div className='input-group mb-3'>
//                       <span className='input-group-text'>
//                         <i className="bi bi-key-fill"></i>
//                       </span>
//                       <input
//                       className={`form-control ${formData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/) ? 'is-valid' : 'is-invalid'}`}
//                       type="password"
//                       name="password"
//                       required
//                       placeholder="Password"
//                       value={formData.password}
//                       onChange={handleInputChange}
//                       pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$"
//                       />
//                       <span className='input-group-text'>
//                         <i className="bi bi-eye-fill"></i>
//                       </span>
//                       <div className="invalid-feedback">
//                         Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.
//                       </div>
//                     </div> */}
//                     {/* <div className='input-group mb-3'>
//                       <span className='input-group-text'>
//                         <i className="bi bi-key-fill"></i>
//                       </span>
//                       <input
//                       className={`form-control ${formData.confirmPassword === formData.password ? 'is-valid' : 'is-invalid'}`}
//                       type="password"
//                       name="confirmPassword"
//                       required
//                       placeholder="Confirm Password"
//                       value={formData.confirmPassword}
//                       onChange={handleInputChange}
//                       />
//                       <span className='input-group-text'>
//                         <i className="bi bi-eye-fill"></i>
//                       </span>
//                       <div className="invalid-feedback">
//                         Passwords do not match.
//                       </div>
//                     </div> */}
//                     {/* <div className='input-group mb-3'>
//                       <span className='input-group-text'>
//                         <i className="bi bi-telephone-fill"></i>
//                       </span>
//                       <input
//                       className={`form-control ${formData.phone.match(/^\+254[1-9]\d{8}$/
//                       ) ? 'is-valid' : 'is-invalid'}`}
//                       type="tel"
//                       name="phone"
//                       placeholder="Phone Number"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       pattern='/^\+254[1-9]\d{8}$/'
//                       />
//                       <div className="invalid-feedback">
//                         Phone number must be in the format +2547XXXXXXXX
//                       </div>
//                      <div> 
//                      </div> 
//                      </div>  */}
//                       {/* {userType === 'student' && (
//                       <input
//                       className='form-control mb-3'
//                       type="text"
//                       name="studentId"
//                       required
//                       placeholder="studentId"
//                       value={formData.studentId}
//                       onChange={handleInputChange} />
//                       )} */}
//                       {/* {userType === 'judiciary' && (
//                       <input
//                       className='form-control mb-3'
//                       type="text"
//                       name="employeeId"
//                       required
//                       placeholder="Employee Id"
//                       value={formData.employeeId}
//                       onChange={handleInputChange} />
//                       )} */}
//                       {/* {userType === 'Law Firm' && (
//                       <input
//                       className='form-control mb-3'
//                       type="text"
//                       name="registrationNo"
//                       required
//                       placeholder="Registration Number"
//                       value={formData.registrationNumber}
//                       onChange={handleInputChange} />
//                       )} */}
//                       {/* {userType === 'Institution' && (
//                       <input
//                       className='form-control mb-3'
//                       type="text"
//                       name="isoNo"
//                       required
//                       placeholder="ISO Number"
//                       value={formData.isoId}
//                       onChange={handleInputChange} />
//                       )} */}
//                       {/* {userType === 'business' && (
//                       <input
//                       className='form-control mb-3'
//                       type="text"
//                       name="registrationNumber"
//                       required
//                       placeholder="Registration Number"
//                       value={formData.registrationNumber}
//                       onChange={handleInputChange}
//                       /> */}
//                       {/* )} */}
//                       <button className='btn btn-lg w-100 btn-outline-secondary' style={btnHeader} type="submit">Register</button>
//                       <div className='d-flex flex-column mt-3'>
//                         <p className="lead pb-lg-2 fs-5">
//                           Already Have an Account? <span> </span>
//                           <a href="/login" style={{color:'393f81'}}>Login</a>
//                         </p>
//                         <p>
//                         <a href="#terms" className="small text-muted">Terms of Use</a>
//                         &nbsp; &nbsp;
//                         <a href="#privacy" className="small text-muted">Privacy Policy</a>
//                         </p>
//                       </div>
//                     </form>
//                 {/* </div> */}
//               </div>
//             {/* </div> */}
//           </div>
//         </div>

//       </div>
//      </div>
//      </div>
//    );

// };



// ... other imports ...

const Auth = () => {
  const [userType, setUserType] = useState('lawyer');
  const [formData, setFormData] = useState({
    // ... other form fields ...
  });
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate();
  // ... other functions ...

  const handleLogin = (e) => {
    e.preventDefault();
    const requiredFields = ['email', 'password', 'phone', 'licenceNumber', 'employeeId', 'registrationNumber', 'studentNo', 'isoId', 'employeeNo'];
        const emptyFields = requiredFields.filter(field => !formData[field]);
    
        if (emptyFields.length > 0) {
          alert(`Please fill in the following fields: ${emptyFields.join(', ')}`);
          return;
        }
    if (validateForm()) {
      navigate('/dms_dashboard');
      alert('Login Successful');
    }
  };

  const [LoginformState, setLoginFormState] = useState({
    email: '',
    password: '',
    licenseNumber: '',
    employeeId: '',
    registrationNumber: '',
    studentId: '',
    isoNumber: '',
    firmRegistrationNumber: '',
    requiredField: '',
  });

  const [error, setError] = useState({ email: '', password: '' });

  const handleModeSwitch = () => {
    setIsSignup((prev) => !prev);
    // Reset form data when switching modes
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
      employeeNo: '',
    });
  };

  const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginFormState({
          ...LoginformState,
          [name]: value,
        });
        if (!validateForm()) { 
          return error;
      };
    }

      const validateForm = () => {
        let isValid = true;
        const newError = { email: '', password: '' };
    
        // Email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(LoginformState.email)) {
            newError.email = 'Invalid email format';
            isValid = false;
        }
    
        // Password validation using regex (minimum 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(LoginformState.password)) {
            newError.password = 'Invalid password format';
            isValid = false;
        }
    
        setLoginFormState((prevState) => ({ ...prevState, error: newError }));
        return isValid;
    };
    
    
      const handleSignup = (e) => {
        e.preventDefault();
    
        const requiredFields = ['name', 'email', 'password', 'confirmPassword', 'phone', 'licenceNumber', 'employeeId', 'registrationNumber', 'studentNo', 'isoId', 'employeeNo'];
        const emptyFields = requiredFields.filter(field => !formData[field]);
    
        if (emptyFields.length > 0) {
          alert(`Please fill in the following fields: ${emptyFields.join(', ')}`);
          return;
        }
    
        // Check for mismatched passwords
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match');
          return;
        }
      };

     

  const profileImage = {
        lawyer: lawyer,
        judiciary: judiciary,
        institution: institution,
        lawFirm: lawFirm,
        student: student,
        nonLitigant: nonLitigant,
        business: business
  }

  const cardStyle = {
        background: 'transparent',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(51, 204, 255, 0.34)',
        color: 'white',
      }
      const header = {
       // backgroundColor: 'rgb(12, 12, 47)',
        color: 'white',
        cursor: 'pointer'
      }
    
      const navbar = {
        background: 'transparent',
        borderRadius: '10px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 154, 60, 0.34)',
      }
    
      const btnHeader = {
        backgroundColor: '#ff9a3c',
        color: 'white',
        cursor: 'pointer',
      }

      const btnSwitch = {
        cursor: 'pointer',
      }

  return (
    <div className="main">
      <div className="contentContainer d-flex flex-column justify-content-center align-items-center">
        <div className="navbarContainer p-3 col-lg-10 mt-1" style={header}>
          <div className="navbarContainer p-2 col-lg-10 mt-2" style={navbar}>
            <Navbar userType={userType} setUserType={setUserType} />
          </div>
          <div className="card m-2 col-lg-10" style={cardStyle}>
            <div className="card-body d-flex p-0">
              
              <div className="col-md-6">
                <img
                  className="card-img"
                  style={{
                    minHeight: '100%',
                    objectFit: 'cover',
                    borderRadius: '1.1rem 0 0 1.1rem'

                  }}
                  src={profileImage[userType]}
                  alt={userType}
                />
              </div>
              <div
                className="col-md-6 p-2 formInput"
                style={{ borderTopRightRadius: '1rem', borderBottomRightRadius: '1rem' }}
              >
                <div className="d-flex justify-content-center">
                <ul className="nav nav-underline justify-content-center" style={btnSwitch}>
                  <li className="nav-item">
                    <a className={`nav-link text-light ${isSignup ? 'active' : ''}`} href="#" onClick={() => handleModeSwitch(true)}>
                      Signup
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={`nav-link text-light ${!isSignup ? 'active' : ''}`} href="#" onClick={() => handleModeSwitch(false)}>
                      Login
                    </a>
                  </li>
                </ul>


                </div>
                <Introduction userType={userType} isSignup={isSignup}/>
                
                <form
                  className="w-100 p-4 needs-validation"
                  noValidate
                  onSubmit={isSignup ? handleSignup : handleLogin}
                >
                  {isSignup ? (
                  <InputGroup
                    userList={userList}
                    commonInputs={commonInputs}
                    userType={userType}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    isSignup={isSignup} // Pass mode to input group for conditional rendering
                  />
                  ) : (
                    <>
                    <InputLogin 
                      handleInputChange={handleInputChange}
                      formData={formData}
                      commonLoginInputs={commonLoginInputs}
                      />
                    
                    <TypeChecker
                      userType={userType}
                      handleInputChange={handleLoginInputChange}
                      userList={userList}
                      formData={formData}
                    />
                  </>
                      )}
                  <button className="btn btn-lg w-100 btn-outline-secondary" style={btnHeader} type="submit">
                    {isSignup ? 'Register' : 'Login'}
                  </button>
                  <br />
                  <br />
                  <p className='text-center'> {isSignup ? '' : 'Or'}</p>

                  {isSignup ? '' : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <i className="bi bi-google mx-2" style={{fontSize: '2em'}}></i>
                    <i className="bi bi-linkedin mx-2" style={{fontSize: '2em'}}></i>
                    <i className="bi bi-microsoft mx-2" style={{fontSize: '2em'}}></i>
                  </div>}
                  <div className="d-flex flex-column mt-3">
                    <p>
                      <a href="#terms" className="small text-muted">
                        Terms of Use
                      </a>
                      &nbsp; &nbsp;
                      <a href="#privacy" className="small text-muted">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
