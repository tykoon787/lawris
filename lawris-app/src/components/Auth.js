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


// Handle signup logic using firebase 
import { signInWithGoogle, signInWithMicrosoft }  from './OAuth';
import { auth, db } from './Firebase';
import { useDispatch } from 'react-redux';
import { setUser} from '../redux/userSlice';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';



import Navbar from './NavBar';
// import TypeChecker from './TypeChecker';

import InputLogin from './InputLogin';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

//icons import
import Google from '../Assets/google.png';
import LinkedIn from '../Assets/microsoft.png';


import { PersonIcon, EmailIcon, LawyerIcon, PasswordIcon, PhoneIcon } from './Icons';

const commonInputs = [
  {
    name: 'full_name',
    type: 'text',
    icon: <PersonIcon />, // You can define the icon for the common inputs
    pattern: '^[A-Za-z\\s]+$',
    placeholder: 'Full Name',
    required: true,
    errorMessage: 'Please enter a valid name with only letters and spaces.',
  },
  {
    name: 'email',
    type: 'email',
    icon: <EmailIcon />,
    placeholder: 'Email',
    required: true,
    errorMessage: 'Please enter a valid email address.',
  },
  {
    name: 'password',
    type: 'password',
    icon: <PasswordIcon />,
    pattern: '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/',
    placeholder: 'Password',
    required: true,
    errorMessage: 'password should be 8 characters, include special characters and a capital letters.',
  },
  {
    name: 'confirm_password',
    type: 'password',
    icon: <PasswordIcon />,
    pattern: null, // You can set the pattern to null for confirmPassword
    placeholder: 'Confirm Password',
    required: true,
    errorMessage: 'Passwords must match.',
  },
  {
    name: 'phone_number',
    type: 'text',
    icon: <PhoneIcon />,
    pattern: '^\\+254[1-9]\\d{8}$',
    placeholder: 'Phone Number',
    required: true,
    errorMessage: 'Phone Number must start with +254.',
  },
];

const commonLoginInputs = [
 
  {
    name: 'email',
    icon: <EmailIcon />,
    pattern: '/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/',
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
       name: 'license_number',
       type: 'text',
       pattern: '^12345$',
       placeholder: 'Licence Number',
       id: 'licenseNumberInput',
       required: true,
   },
 },

 {
   student: {
       icon: <PersonIcon />,
       name: 'student_id',
       type: 'text',
       pattern: '^1234$',
       placeholder:'studentNumber',
       id: 'studentNumberInput',
       required: true,
   },
 },
 {
   business: {
       icon: <LawyerIcon />,
       type: 'text',
       name: 'registration_number',
       pattern: '^1234$',
       placeholder: 'Registration Number',
       id: 'registrationNumberInput',
       required: true,
   },
  },
  {
    judiciary: {
      icon: <LawyerIcon />,
      type: 'text',
      name: 'employee_id',
      pattern: '^1234$',
      placeholder: 'Employee Id',
      id: 'employeeIdInput',
      required: true,
    }
  },
  {
    lawFirm: {
      icon: <LawyerIcon />,
      type: 'text',
      name: 'registration_number',
      pattern: '^1234$',
      placeholder: 'Registration Number',
      id: 'registrationNumberInput',
      required: true,
    },
  },
  {
    institution: {
      icon: <LawyerIcon />,
      type: 'text',
      name: 'Iso_number',
      pattern: '^1234$',
      placeholder: 'ISO Number',
      id: 'isoNumberInput',
      required: true,
    }
  },  
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



// ... other imports ...

const Auth = () => {
  const [userType, setUserType] = useState('lawyer');
  const [formData, setFormData] = useState({
    // ... other form fields ...
  });
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate();
  // ... other functions ...

  const handleLogin = async (e) => {
    e.preventDefault();
    const requiredFields = []; // you can factor this when doing validation
        const emptyFields = requiredFields.filter(field => !formData[field]);
    
        if (emptyFields.length > 0) {
          alert(`Please fill in the following fields: ${emptyFields.join(', ')}`);
          return;
        }
    const apiUrl = 'http://localhost:8000/auth/login/';

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      
        if (!response.ok) {
          // Handle the case where the server returns an error
          throw new Error('Login failed');
        }

  
      navigate('/dms_dashboard');
      alert('Login Successful');
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  }

  

  const handleModeSwitch = () => {
    console.log("Is Signup", isSignup);
    setIsSignup((prev) => !prev);
    console.log("Is Signup", isSignup);
    // Reset form data when switching modes
    setFormData({
    });
  };

  const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      }; 
     
     
      const handleSignup =  async (e) => {
        e.preventDefault();
    
        const formDataWithUserType = {
          ...formData,
          user_type: userType.toLowerCase(),
        };
    
        console.log(formDataWithUserType);
    
        const signUpUrl = 'http://localhost:8000/auth/register/'; // Replace 'your-endpoint' with the actual endpoint 
    
      const requiredFields = ['full_name', 'email', 'password', 'confirm_password', 'phone_number'];
      const emptyFields = requiredFields.filter(field => !formData[field]);
    
        if (emptyFields.length > 0) {
          Swal.fire(`Please fill in the following fields: ${emptyFields.join(', ')}`);
          return;
        } else {
          try {
            const response = await fetch(signUpUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formDataWithUserType),
            });
        
            if (!response.ok) {
            // Handle the case where the server returns an error
              const responseData = await response.json();
              if (responseData.errors) {
                if (responseData.errors.password) {
                  Swal.fire('Password is too common. Please use a different one')
                } else if (responseData.errors.email) {
                  Swal.fire('Email is aleady taken. Please use a different one')
                } else {
                  Swal.fire('Registrationfailed. Please check your inputs');
    
                }
              } else {
                throw new Error('Registration failed')
              }
            } else {
              Swal.fire('Registration Sussesful!')
              setIsSignup(false);
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
            }
    
          } catch (error) {
            console.error('Error during registration:', error.message);
            const errorMessage = error.message || 'Something went wrong. Please try again later.';
            const errorDetails = error.details || '';
    
            const fullErrorMessage = `${errorMessage}\n${errorDetails}`;
            // Handle the error, show a message to the user, or perform other actions
            Swal.fire(fullErrorMessage);
          }
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
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        // border: '1px solid rgba(51, 204, 255, 0.34)',
      }
    
      const btnHeader = {
        backgroundColor: '#ff9a3c',
        color: 'white',
        cursor: 'pointer',
      }

      const btnSwitch = {
        cursor: 'pointer',
        color: 'black',
      }
 

const dispatch = useDispatch();
        
// Function to handle Google sign-in and email verification
const handleGoogleSignIn = async () => {
    try {
        const { user, email } = await signInWithGoogle();
        // Dispatch user information to Redux store
        dispatch(
            setUser({
                _id: user.uid,
                name: user.displayName,
                email: user.email,
                image: user.photoURL,
            })
        );

        const response = await fetch('http://localhost:8000/auth/verify_email/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify({ email }), // Sending user's email for verification
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Email verification successful:', data);
            // Redirect to the dashboard after successful login
            navigate('/dms_dashboard', { state: { isAuthenticated: true } });
        } else {
            // Handle the case where email verification fails
            console.error('Email verification failed');
            // Implement the necessary logic, such as displaying an error message
        }
    } catch (error) {
        console.error('Error during Google sign-in:', error);
        // Handle errors for Google sign-in, such as displaying an error message
    }
};

// Function to handle Microsoft sign-in and email verification
const handleMicrosoftSignIn = async () => {
    try {
        const { user, email } = await signInWithMicrosoft(); // Sign in with Microsoft and retrieve email

        // Dispatch user details to set in the Redux store
        dispatch(
            setUser({
                _id: user.uid,
                name: user.displayName,
                email: email, // Ensure email is retrieved correctly
                image: user.photoURL,
            })
        );

        // Send a POST request to your Django endpoint for email verification
        const response = await fetch('http://localhost:8000/auth/verify_email/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }), // Sending user's email for verification
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Email verification successful:', data);

            navigate('/dms_dashboard', { state: { isAuthenticated: true } });
            // Redirect or perform actions after successful email verification
            // e.g., navigate to dashboard or set user in Redux state
        } else {
            // Handle the case where email verification fails
            console.error('Email verification failed');
            // Implement error handling logic
        }
    } catch (error) {
        console.error('Error during Microsoft sign-in:', error);
        // Handle errors for Microsoft sign-in, such as displaying an error message
    }
};


  return (
    <div className="main">
      <div className="contentContainer d-flex flex-column g-3 justify-content-center align-items-center p-3 col-lg-12">
        <div className="navbarContainer p-2 col-lg-10 mb-2" style={navbar}>
          <Navbar userType={userType} setUserType={setUserType} />
        </div>
        <div className="auth-card card col-lg-10" style={cardStyle}>
          <div className="card-body d-flex p-0" style={{height: '700px'}}>
            
            <div className="imageCard col-md-6 d-sm-block">
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
                  <a className={`nav-link text-dark ${isSignup ? 'active' : ''}`} href="#li" onClick={() => handleModeSwitch(true)}>
                    Signup
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link text-dark ${!isSignup ? 'active' : ''}`} href="#li" onClick={() => handleModeSwitch(false)}>
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
                  
                  
                </>
                    )}
                <button className="btn btn-lg w-100 btn-outline-secondary" style={btnHeader} type="submit">
                  {isSignup ? 'Register' : 'Login'}
                </button>
                <br />
                <br />
                

                {isSignup ? '' : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <div className='d-flex flex-column align-items-center justify-content center'>
                    <div className='signin mb-3' onClick={handleGoogleSignIn}>
                      <img src={Google} alt='googleImg' style={{ width: '2em', height: '2em' }} />
                      <span>
                        Sign in with Google
                      </span>
                    </div>
                    <div className='signin' onClick={handleMicrosoftSignIn}>
                      <img  src={LinkedIn} alt='linkedin' style={{ width: '2em', height: '2em' }} />
                      <span>
                        Sign in with Microsoft
                      </span>
                    </div>
                </div>
                </div>
                }
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
  );
}

export default Auth;