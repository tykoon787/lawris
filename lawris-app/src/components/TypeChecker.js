import React from 'react';
import InputLogin from './InputLogin'; // Import the InputField component

const TypeChecker = ({
  requiredField,
  licenseNumber,
  setLicenseNumber,
  employeeId,
  setEmployeeId,
  studentId,
  setStudentId,
  isoNumber,
  setIsoNumber,
  firmRegistrationNumber,
  setFirmRegistrationNumber,
  registrationNumber,
  setRegistrationNumber,
}) => {
  return (
    <div className='input-group mb-3' >
      {requiredField === 'Lawyer' && (
        <InputLogin
          type="text"
          name="licenseNumber"
          placeholder="License Number"
          value={licenseNumber}
          className="form-control"
          onChange={(event) => setLicenseNumber(event.target.value)}
        />
      )}

      {requiredField === 'Judiciary' && (
        <InputLogin
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          value={employeeId}
          className="form-control"
          onChange={(event) => setEmployeeId(event.target.value)}
        />
      )}

      {requiredField === 'Student' && (
        <InputLogin
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={studentId}
          className="form-control"
          onChange={(event) => setStudentId(event.target.value)}
        />
      )}

      {requiredField === 'School' && (
        <InputLogin
          type="text"
          name="isoNumber"
          placeholder="ISO Number"
          value={isoNumber}
          className="form-control"
          onChange={(event) => setIsoNumber(event.target.value)}
        />
      )}

      {requiredField === 'Law Firm' && (
        <InputLogin
          type="text"
          name="firmRegistrationNumber"
          placeholder="Firm Registration Number"
          value={firmRegistrationNumber}
          className="form-control"
          onChange={(event) => setFirmRegistrationNumber(event.target.value)}
        />
      )}

      {requiredField === 'Business' && (
        <InputLogin
          type="text"
          name="registrationNumber"
          placeholder="Firm Registration Number"
          value={registrationNumber}
          className="form-control"
          onChange={(event) => setRegistrationNumber(event.target.value)}
        />
      )}
    </div>
  );
};

export default TypeChecker;
