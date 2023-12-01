import { PersonIcon, EmailIcon, LawyerIcon, PasswordIcon, PhoneIcon, BusinessIcon, NonLitigantIcon, StudentIcon } from "../components/Icons";

const userList = [
    {lawyer: {
        icon: <LawyerIcon />,
        name: 'LicenceNumber',
        pattern: '',
        placeholder: 'LicenceNumber',
    }
},
{
    nonLitigant: {
        icon: <PersonIcon />,
        name: '',
        pattern: '',
        placeholder:'',
    }
}, 
{
    student: {
        icon: <PersonIcon />,
        name: 'studentNumber',
        pattern: '',
        placeholder:'studentNumber',
    }
},
{
    business: {
        icon: <BusinessIcon />,
        name: 'BusinessNumber',
        pattern: '',
        placeholder: 'BusinessNumber',
    }
}

];

export default userList;