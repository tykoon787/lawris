import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/styles/signup.css';
// import law1 from '../Assets/law1.jpg';
import student from '../Assets/law students2.jpg';
import nonLitigant from '../Assets/non-litigant.jpg';
import judiciary from '../Assets/judiciary.jpg';
import institution from '../Assets/institution.jpg';
import business from '../Assets/business.jpg';
import lawyer from '../Assets/lawyer.png';
import lawFirm from '../Assets/lawFirm.jpg';
import logo from '../Assets/transparentLawrisLogo.png';

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
    // width: '70rem',
    backgroundColor: 'rgb(12, 12, 47)',
    color: 'white',
    borderRadius: '1.5rem',
    // width: '70%',
    // padding: '4rem'
  };
  const header = {
    backgroundColor: 'rgb(12, 12, 47)',
    color: 'white',
    cursor: 'pointer'
  }

  const btnHeader = {
    backgroundColor: 'rgb(12, 12, 47)',
    color: 'white',
    cursor: 'pointer',
  }

  const [error, setError] = useState(null);


  //  const handleUserTypeChange = (newType) => {
  //   setUserType(newType);
  //   setFormData({
  //     name: '',
  //    email: '',
  //    password: '',
  //    confirmPassword: '',
  //    employeeId: '',
  //    registrationNumber: '',
  //    studentNo: '',
  //    isoId: '',
  //    phone: '',
  //    licenceNumber: '',
  //    employeeNo: '',

  //    });
  //    setError(null);
  //  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here, including sending the data to your server for registration.
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    } else if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in the required fields.')

    } else {
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
    }
    console.log(formData.password)
    navigate('/Login');
  };
  //const filteredItems = blueprint.filter((item) => item === userType);

  return (
     <div className="main">
      <div className='contentContainer d-flex flex-column justify-content-center align-items-center'>
        <div className='navbarContainer p-2 col-lg-10 mt-4' style={header}>
          <div className="navbar text-small ">
            <a href="#lawyer"
              className={`navbar-brand text-light ${userType === 'lawyer' ? 'selected' : ''}`}
              onClick={() => setUserType('lawyer')}
            >
              Lawyer
            </a>
              {/* <div className='radioContainer'>
              <label>
              <input
                  type="radio"
                  value="lawyer"
                  checked={userType === 'lawyer'}
                  onChange={() => handleUserTypeChange('lawyer')}
              />
              Lawyer
              </label>  */}
              <a href="#non-litigant"
                className={`navbar-brand text-light ${userType === 'nonLitigant' ? 'selected' : ''}`}
                onClick={() => setUserType('nonLitigant')}
              >
                Non-Litigant
              </a>
              <a href="#student"
                className={`navbar-brand text-light ${userType === 'student' ? 'selected' : ''}`}
                onClick={() => setUserType('student')}
              >
                Student
              </a>
              <a href="#judiciary"
                  className={`navbar-brand text-light ${userType === 'judiciary' ? 'selected' : ''}`}
                  onClick={() => setUserType('judiciary')}
                >
                  Judiciary
              </a>
              <a href="#lawfirm"
                className={`navbar-brand text-light ${userType === 'lawFirm' ? 'selected' : ''}`}
                onClick={() => setUserType('lawFirm')}
              >
                Law Firm
              </a>
              <a href="#Institution"
                className={`navbar-brand text-light ${userType === 'institution' ? 'selected' : ''}`}
                onClick={() => setUserType('institution')}
              >
                Institution
              </a>
              <a href="#Business"
                  className={`navbar-brand text-light ${userType === 'business' ? 'selected' : ''}`}
                  onClick={() => setUserType('business')}
                >
                  Business
              </a>

            </div>

        </div>
        {/* <h2 className='mt-3'>
          Please fill in the Registration form to continue</h2> */}

        <div className='card m-2 col-lg-10' style={cardStyle}>
          {/* <div className='card card-1' style={{borderRadius: '1rem', backgroundColor: 'white'}}> */}
          <div className='card-body d-flex p-0'>
              <div className='col-md-6'>
                <img className="card-img" style={{minHeight: '100%', objectFit: 'cover', borderTopLeftRadius: '1.5rem', borderBottomLeftRadius: '1.5rem'}} src={profileImage[userType]} alt={userType} />
              </div>
              <div className='col-md-6 p-2' style={{backgroundColor: '#cbc9bd', borderTopRightRadius: '1.5rem', borderBottomRightRadius: '1.5rem'}}>
                <Introduction />
                  <form className='w-100 p-4 needs-validation' onSubmit={handleSubmit}>
                  <div className='input-group mb-3'>
                    <label htmlFor='validationCustom01' className='form-label'></label>
                      <span className='input-group-text'>
                        <i class="bi bi-briefcase-fill"></i>
                      </span>
                      {userType === 'lawyer' && (
                      <input
                      className='form-control is-valid'
                      id="validationCustom01"
                      aria-describedby='inputFeedback'
                      type="text"
                      name="licenceNumber"
                      required
                      placeholder="LicenceNumber"
                      value={formData.practicingNumber}
                      onChange={handleInputChange}
                      />
                      
                      )}
                      <div id='inputFeedback' className='valid-feedback'>
                        Looks good!
                      </div>
                    </div>
                    <div className='input-group mb-3'>
                      <span className='input-group-text'>
                        <i class="bi bi-person-fill"></i>
                      </span>
                      <input
                      className='form-control'
                      type="text"
                      name="name"
                      required
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      />
                    </div>
                    <div className='input-group mb-3'>
                      <span className='input-group-text'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                        </svg>
                      </span>
                      <input
                      className='form-control'
                      type="email"
                      name="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      />
                    </div>
                    <div className='input-group mb-3'>
                      <span className='input-group-text'>
                        <i class="bi bi-key-fill"></i>
                      </span>
                      <input
                      className='form-control'
                      type="password"
                      name="password"
                      required
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      />
                      <span className='input-group-text'>
                        <i class="bi bi-eye-fill"></i>
                      </span>
                    </div>
                    <div className='input-group mb-3'>
                      <span className='input-group-text'>
                        <i class="bi bi-key-fill"></i>
                      </span>
                      <input
                      className='form-control'
                      type="password"
                      name="confirmPassword"
                      required
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      />
                      <span className='input-group-text'>
                        <i class="bi bi-eye-fill"></i>
                      </span>
                      {error && <div className="alert alert-danger mb-3" role="alert">{error}</div>}
                    </div>
                    <div className='input-group mb-3'>
                      <span className='input-group-text'>
                        <i class="bi bi-telephone-fill"></i>
                      </span>
                      <input
                      className='form-control'
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      />
                    </div>
                      {userType === 'student' && (
                      <input
                      className='form-control mb-3'
                      type="text"
                      name="studentId"
                      required
                      placeholder="studentId"
                      value={formData.studentId}
                      onChange={handleInputChange} />
                      )}
                      {userType === 'judiciary' && (
                      <input
                      className='form-control mb-3'
                      type="text"
                      name="employeeId"
                      required
                      placeholder="Employee Id"
                      value={formData.employeeId}
                      onChange={handleInputChange} />
                      )}
                      {userType === 'Law Firm' && (
                      <input
                      className='form-control mb-3'
                      type="text"
                      name="registrationNo"
                      required
                      placeholder="Registration Number"
                      value={formData.registrationNumber}
                      onChange={handleInputChange} />
                      )}
                      {userType === 'Institution' && (
                      <input
                      className='form-control mb-3'
                      type="text"
                      name="isoNo"
                      required
                      placeholder="ISO Number"
                      value={formData.isoId}
                      onChange={handleInputChange} />
                      )}
                      {userType === 'business' && (
                      <input
                      className='form-control mb-3'
                      type="text"
                      name="registrationNumber"
                      required
                      placeholder="Registration Number"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      />
                      )}
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
   );

};

export default Signup;
