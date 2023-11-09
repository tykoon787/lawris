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
    <div>
      {requiredField === 'Lawyer' && (
        <InputLogin
          type="text"
          name="licenseNumber"
          placeholder="License Number"
          value={licenseNumber}
          onChange={(event) => setLicenseNumber(event.target.value)}
        />
      )}

      {requiredField === 'Judiciary' && (
        <InputLogin
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(event) => setEmployeeId(event.target.value)}
        />
      )}

      {requiredField === 'Student' && (
        <InputLogin
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={studentId}
          onChange={(event) => setStudentId(event.target.value)}
        />
      )}

      {requiredField === 'School' && (
        <InputLogin
          type="text"
          name="isoNumber"
          placeholder="ISO Number"
          value={isoNumber}
          onChange={(event) => setIsoNumber(event.target.value)}
        />
      )}

      {requiredField === 'Law Firm' && (
        <InputLogin
          type="text"
          name="firmRegistrationNumber"
          placeholder="Firm Registration Number"
          value={firmRegistrationNumber}
          onChange={(event) => setFirmRegistrationNumber(event.target.value)}
        />
      )}

      {requiredField === 'Business' && (
        <InputLogin
          type="text"
          name="registrationNumber"
          placeholder="Firm Registration Number"
          value={registrationNumber}
          onChange={(event) => setRegistrationNumber(event.target.value)}
        />
      )}
    </div>
  );
};

export default TypeChecker;
