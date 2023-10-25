import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/styles/signup.css';
import law1 from '../Assets/law1.jpg';

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
  const navigate = useNavigate();
  const cardStyle = {
    width: '50rem',
    backgroundColor: 'rgb(12, 12, 47)', // Set background color to dark blue
    color: 'white' // Set text color to white for better visibility on dark background
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

  return (
     <div>
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
              className={`navbar-brand text-light ${userType === 'non-lawyer' ? 'selected' : ''}`}
              onClick={() => setUserType('non-lawyer')}
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
              className={`navbar-brand text-light ${userType === 'Law Firm' ? 'selected' : ''}`}
              onClick={() => setUserType('Law Firm')}
            >
              Law Firm
            </a>
            <a href="#Institution"
              className={`navbar-brand text-light ${userType === 'Institution' ? 'selected' : ''}`}
              onClick={() => setUserType('Institution')}
            >
              Institution
            </a>      

          </div> 

      </div>
            <h2 className=''>
              Please fill in the Registration form to continue</h2>

      <section className='card mx-auto' style={cardStyle}> 
        <div className='d-flex justify-content-start align-items-center p-5'>
          <div>
            <img className="w-50" src={law1} alt="law" />
          </div>
          <div className='formContainer'> 
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="name"
                required
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                />
                
                <input
                type="email"
                name="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  />
                  <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  />
                  <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  />
                  {userType === 'lawyer' && (
                  <input
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
                      type="text"
                      name="studentId"
                      required
                      placeholder="studentId"
                      value={formData.studentId}
                      onChange={handleInputChange} />
                  )}
                  {userType === 'judiciary' && (
                      <input
                      type="text"
                      name="employeeId"
                      required
                      placeholder="Employee Id"
                      value={formData.employeeId}
                      onChange={handleInputChange} />
                  )}
                  {userType === 'Law Firm' && (
                      <input
                      type="text"
                      name="registrationNo"
                      required
                      placeholder="Registration Number"
                      value={formData.registrationNumber}
                      onChange={handleInputChange} />
                  )}
                  {userType === 'Institution' && (
                      <input
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
            
          {error && <p style={{ color: 'red' }}>{error}</p>}

        </div>
       

      </section>
 
        


     </div> 
   );

};

export default Signup;
