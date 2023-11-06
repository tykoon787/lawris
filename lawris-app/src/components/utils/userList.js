import { LawyerIcon, PasswordIcon, PhoneIcon, NonLitigantIcon,  } from '../Icons';


const userList = [
    {
        lawyer: {
            icon: <LawyerIcon/>,
            name: 'licenseNumber',
            pattern: '^1234$',
            placeholder: 'LicenseNumber',
        }
    },
    {
        nonLitigant : {
            icon: <NonLitigantIcon/>,
            name: 'nonLitigant',
            pattern: 'your-pattern-here',
            placeholder: 'Enter your ID No.',
        }
    }
]

export default userList;


// const inputList = [
//   {userType: 'lawyer'},
//   {
//     icon: <LawyerIcon/>,
//     name: 'licenceNumber',
//     pattern: '^1234$',
//     placeholder: 'LicenceNumber',
//   },
//   {
//     userType: 'nonLitigant',
//     icon: <NonLitigantIcon />,
//     name: 'nonLitigantField',
//     pattern: 'your-pattern-here',
//     placeholder: 'Non-Litigant Field',
//   },
//   {
//     userType: 'student',
//     icon: <StudentIcon />,
//     name: 'studentId',
//     pattern: null,
//     placeholder: 'Student ID',
//   },
//   {
//     userType: 'business',
//     icon: <BusinessIcon />,
//     name: 'registrationNumber',
//     pattern: null,
//     placeholder: 'Registration Number',
//   },
//   {
//     icon: <PersonIcon/>,
//     name: 'name',
//     pattern: '^[A-Za-z\\s]+$',
//     placeholder: 'Full Name',
//   },
//   {
//     icon: <EmailIcon/>,
//     name: 'email',
//     pattern: '^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$',
//     placeholder: 'Email',
//   },
//   {
//     icon: <PasswordIcon/>,
//     name: 'password',
//     pattern: '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$',
//     placeholder: 'Password',
//   },
//   {
//     icon: <PasswordIcon/>,
//     name: 'confirmPassword',
//     pattern: null,
//     placeholder: 'Confirm Password',
//   },
//   {
//     icon: <PhoneIcon/>,
//     name: 'phone',
//     pattern: '^\\+254[1-9]\\d{8}$',
//     placeholder: 'Phone Number',
//   },
// ];