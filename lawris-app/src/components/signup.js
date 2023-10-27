import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/styles/signup.css';
// import law1 from '../Assets/law1.jpg';
import student from '../Assets/law students2.jpg';
import nonLitigant from '../Assets/non-litigant.jpg';
import judiciary from '../Assets/judiciary.jpg';
import institution from '../Assets/institution.jpg';
// import business from '../Assets/business.jpg';
import lawyer from '../Assets/lawyer.png';
import lawFirm from '../Assets/lawFirm.jpg';

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

  const blueprint = {
    lawyer: lawyer,
    judiciary: judiciary,
    institution: institution,
    lawFirm: lawFirm,
    student: student,
    nonLitigant: nonLitigant
  }

  const navigate = useNavigate();
  const cardStyle = {
    // width: '70rem',
    backgroundColor: 'rgb(12, 12, 47)',
    color: 'white',
    borderRadius: '1.5rem'
  };
  const header = {
    backgroundColor: 'rgb(12, 12, 47)'
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
        employeeNo: '',

      });
      alert('Registration Successful')
    }
    console.log(formData.password)
    navigate('/Login');
  };
  //const filteredItems = blueprint.filter((item) => item === userType);

  return (
     <div className="main">
      <div className='container' style={header}>
        <div className="navbar text-small">
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

          </div>

      </div>
            <h2 className='mt-3'>
              Please fill in the Registration form to continue</h2>

      <div className="card card-body row justify-content-center align-items-center col-md-6 mx-auto mt-3 p-3" style={cardStyle}>
        <div className='card card-1 text-light' style={{backgroundColor: '#acaeb4'}}>
          <div className="d-flex justify-content-start align-items-center">
          <div className='imageContainer row no-gutters col-md-6 h-4' style={{}}>
              <img className="imgContainer" style={{width: '100%', height: '90%'}} src={blueprint[userType]} alt={userType} />
            </div>
            <div className='card-body col-md-6 bg-gray-800 h-100 w-100 p-5' style={{width: '40%'}}>
              <form className='form-group d-flex flex-column justify-content-center align-items-center mb-3' onSubmit={handleSubmit}>
                  <input className='mb-3 w-4'
                  type="text"
                  name="name"
                  required
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  />

                  <input className='mb-3'
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  />
                  <input className='mb-3'
                    type="password"
                    name="password"
                    required
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    />
                    <input className='mb-3'
                    type="password"
                    name="confirmPassword"
                    required
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    />
                    {error && <div className="alert alert-danger mb-3" roll="alert">{error}</div>}

                    <input className='mb-3'
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    />
                    {userType === 'lawyer' && (
                    <input className='mb-3'
                        type="text"
                        name="licenceNumber"
                        required
                        placeholder="LicenceNumber"
                        value={formData.practicingNumber}
                        onChange={handleInputChange}
                    />
                    )}
                    {userType === 'student' && (
                        <input className='mb-3'
                        type="text"
                        name="studentId"
                        required
                        placeholder="studentId"
                        value={formData.studentId}
                        onChange={handleInputChange} />
                    )}
                    {userType === 'judiciary' && (
                        <input className='mb-3'
                        type="text"
                        name="employeeId"
                        required
                        placeholder="Employee Id"
                        value={formData.employeeId}
                        onChange={handleInputChange} />
                    )}
                    {userType === 'LawFirm' && (
                        <input className='mb-3'
                        type="text"
                        name="registrationNo"
                        required
                        placeholder="Registration Number"
                        value={formData.registrationNumber}
                        onChange={handleInputChange} />
                    )}
                    {userType === 'Institution' && (
                        <input className='mb-3'
                        type="text"
                        name="isoNo"
                        required
                        placeholder="ISO Number"
                        value={formData.isoId}
                        onChange={handleInputChange} />
                    )}
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
        </div>
      </div>




     </div>
   );

};

export default Signup;
