<div className="card mx-auto mt-4 p-4" style={cardStyle}>
        <div className='card card-1 bg-dark text-light p-4 m-2'>
          <div className="d-flex justify-content-start align-items-center">
          <div className='bg-black' style={{width: '60%'}}>
              <img className="w-100 mx-auto" style={{width: '60%'}} src={images[userType]} alt={userType} />
            </div>
            <div className='formContainer bg-gray-800 h-100 w-100' style={{width: '40%'}}>
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
        </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

        </div>


      </div>
