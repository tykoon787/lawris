import React, { useState, useEffect } from 'react';
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
import { auth, db } from './Firebase';
import { signInWithGoogle, signInWithFacebook, handleSIgnout }  from './OAuth';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser, removeUser } from '../redux/userSlice';

import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';


import Navbar from './NavBar';
// import TypeChecker from './TypeChecker';

import InputLogin from './InputLogin';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

//icons import
import Google from '../Assets/google.png';
import Microsoft from '../Assets/microsoft.png';
import LinkedIn from '../Assets/linkedin.png';
import facebook from '../Assets/facebook.png';



import { PersonIcon, EmailIcon, LawyerIcon, PasswordIcon, PhoneIcon, BusinessIcon, NonLitigantIcon, StudentIcon } from './Icons';

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
    //pattern: '^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$',
    
    placeholder: 'Email',
    required: true,
    errorMessage: 'Please enter a valid email address.',
  },
  {
    name: 'password',
    type: 'password',
    icon: <PasswordIcon />,
    pattern: '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$',
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

  const userTypes = [
    'lawyer',
    'nonlitigant',
    'student',
    'judiciary',
    'lawfirm',
    'institution',
    'business'
  ];

 


// export const UserProfile = () => {
//     const [userProfileImage, setUserProfileImage] = useState('');
  
//     useEffect(() => {
//       // Check if the user is authenticated
//       const unsubscribe = onAuthStateChanged(auth, async (user) => {
//         if (user) {
//           // User is signed in
//           const userDocRef = doc(db, 'users', user.uid);
//           const userDocSnap = await getDoc(userDocRef);
  
//           if (userDocSnap.exists()) {
//             const userData = userDocSnap.data();
//             setUserProfileImage(userData.profileImage);
//           }
//         } else {
//           // User is signed out
//           setUserProfileImage('');
//         }
//       });
  
//       return () => unsubscribe();
//     }, [auth, db]);
  
//     return <img src={userProfileImage} alt="User Profile" />;
//   };
  
// export  const WelcomeMessage = () => {
//     const [userName, setUserName] = useState('');
  
//     useEffect(() => {
//       // Check if the user is authenticated
//       const unsubscribe = onAuthStateChanged(auth, async (user) => {
//         if (user) {
//           // User is signed in
//           const userDocRef = doc(db, 'users', user.uid);
//           const userDocSnap = await getDoc(userDocRef);
  
//           if (userDocSnap.exists()) {
//             const userData = userDocSnap.data();
//             setUserName(userData.displayName);
//           }
//         } else {
//           // User is signed out
//           setUserName('');
//         }
//       });
  
//       return () => unsubscribe();
//     }, [auth, db]);
  
//     return <p className="welcome-message">Welcome, {userName}!</p>;
//   };
// export const logout = () => {
//   handleSIgnout()
//     .then(() => {
//       dispatch(removeUser());
//     })
//     .catch(error => {
//       // Handle errors if needed
//       console.error('Logout error:', error);
//     });
// };



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
    setIsSignup((prev) => !prev);
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
              throw new Error('Registration failed');
            }
  
          } catch (error) {
            console.error('Error during registration:', error.message);
            // Handle the error, show a message to the user, or perform other actions
          }
          Swal.fire('Registration Successful') 
          setIsSignup(false)
         }
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
        border: '1px solid rgba(51, 204, 255, 0.34)',
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
// Function to handle provider login
const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle()
      dispatch(setUser({
        _id: user.uid,
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      }))
        
      navigate('/dms_dashboard', { state: { isAuthenticated: true } });
        
      
      // Call the Google sign-in function

      // Redirect to the dashboard after successful login

      

    } catch (error) {
      // Handle errors for Google sign-in
      console.error('Google Authentication error:', error);
      // Display specific error messages or handle the error cases
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithFacebook(); // Call the Facebook sign-in function
      // Perform actions after successful Facebook authentication
    } catch (error) {
      // Handle errors for Facebook sign-in
      console.error('Facebook Authentication error:', error);
      // Display specific error messages or handle the error cases
    }
  };

 

  return (
    <div className="main">
      <div className="contentContainer d-flex flex-column justify-content-center align-items-center">
        <div className="surround0Container p-3 col-lg-10 mt-1" style={header}>
          <div className="navbarContainer p-2 col-lg-10 mt-2" style={navbar}>
            <Navbar userType={userType} setUserType={setUserType} />
          </div>
          <div className="card col-lg-10" style={cardStyle}>
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
                    <a className={`nav-link text-dark ${isSignup ? 'active' : ''}`} href="#" onClick={() => handleModeSwitch(true)}>
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
                    
                    {/* <TypeChecker
                      userType={userType}
                      handleInputChange={handleInputChange}
                      userList={userList}
                      formData={formData}
                    /> */}
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
                          Sign in with google
                        </span>
                      </div>
                      <div className='signin mb-3' onClick={handleFacebookSignIn}>
                        <img  src={facebook} alt='fbImg' style={{ width: '2em', height: '2em' }}/>
                        <span>
                          Sign in with Facebook
                        </span>
                      </div>
                      <div className='signin'>
                        <img  src={LinkedIn} alt='linkedin' style={{ width: '2em', height: '2em' }} />
                        <span>
                          sign in with Linkedin
                        </span>
                      </div>
                  </div>

                    {/* <img src={Google} alt="google" className="mx-2" style={{ width: '2em', height: '2em' }} />
                    <img src={Microsoft} alt="microsoft" className="mx-2" style={{ width: '2em', height: '2em' }} />
                    <img src={LinkedIn} alt="linkedin" className="mx-2" style={{ width: '2em', height: '2em' }} /> */}
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
