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
    width: '70%',
    padding: '4rem'
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
      <div className='container' style={header}>
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
      <h2 className='mt-3'>
        Please fill in the Registration form to continue</h2>

      <div className='card mx-auto m-2' style={cardStyle}>
        <div className='card card-1 p-3 m-1' style={{borderRadius: '1rem', backgroundColor: 'rgb(12, 12, 47)'}}>
          <div className='row no-gutters' style={{width: '100%'}}>
            <div className='col-md-6'>
              <img className="card-img m-1" style={{minHeight: '100%', objectFit: 'cover'}} src={profileImage[userType]} alt={userType} />
            </div>
            <div className='col-md-6' style={{backgroundColor: '#cbc9bd'}}>
              <div className='card-body' style={{paddingTop: "5rem", paddingRight: "1rem", paddingBottom: "5rem", paddingLeft: "8rem" }}>
                <form className='w-100' onSubmit={handleSubmit}>
                  <div className='form-group d-flex flex-column justify-content-center align-tems-center' style={{width: '70%'}}>
                    <input
                    className='form-control mb-3'
                    // style={{width: '50%'}}
                    type="text"
                    name="name"
                    required
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    />
                    <input
                    className='form-control mb-3'
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    />
                    <input
                    className='form-control mb-3'
                    type="password"
                    name="password"
                    required
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    />
                    <input
                    className='form-control mb-3'
                    type="password"
                    name="confirmPassword"
                    required
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    />
                    {error && <div className="alert alert-danger mb-3" role="alert">{error}</div>}
                    <input
                    className='form-control mb-3'
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    />
                    {userType === 'lawyer' && (
                    <input
                    className='form-control mb-3'
                    type="text"
                    name="licenceNumber"
                    required
                    placeholder="LicenceNumber"
                    value={formData.practicingNumber}
                    onChange={handleInputChange}
                    />
                    )}
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
                    <button className='btn btn-lg' style={btnHeader} type="submit">Register</button>
                  </div>

                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>

     </div>
   );

};

export default Signup;
