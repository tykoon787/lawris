import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    userType: 'lawyer', // Specify the user type directly
    email: '',
    password: '',
    practicingNumber: '',
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the login submission here, including sending the data to your server for authentication.
    if (!formData.email || !formData.password) {
      setError('Please fill in the required fields.');
    } else if (formData.userType === 'lawyer' && !formData.practicingNumber) {
      setError('Please enter your practicing number.');
    } else {
      setError(null);
      // Simulate a successful login
      alert('Login Successful');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="userType"
          value={formData.userType}
          onChange={handleInputChange}
        >
          <option value="lawyer">Lawyer</option>
          <option value="non-lawyer">Non-Litigant</option>
          {/* Add other user types here */}
        </select>
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
        {formData.userType === 'lawyer' && (
          <input
            type="text"
            name="practicingNumber"
            required
            placeholder="Practicing Number"
            value={formData.practicingNumber}
            onChange={handleInputChange}
          />
        )}
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
