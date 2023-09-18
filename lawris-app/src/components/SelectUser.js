import React from 'react';
import { useNavigate } from 'react-router-dom';

// Styles
import './styles/SelectUser.css';

// Images 
import lawyerImage from '../static/icons/lawyer.png';
import nonLitigantImage from '../static/icons/user.png';
import lawFirmImage from '../static/icons/law_firm.png';
import studentImage from '../static/icons/graduation-hat.png';
import judiciaryImage from '../static/icons/judiciary.png';
import businessImage from '../static/icons/enterprise.png';
import schoolImage from '../static/icons/school.png';

const usersList = [
    { id: 1, name: "Lawyer", png: lawyerImage },
    { id: 2, name: "Non-Litigant", png: nonLitigantImage },
    { id: 3, name: "Law Firm", png: lawFirmImage },
    { id: 4, name: "Student", png: studentImage },
    { id: 5, name: "Judiciary", png: judiciaryImage },
    { id: 6, name: "Business", png: businessImage },
    { id: 7, name: "School", png: schoolImage }
]

const UserCard = ({ usersList, onClick }) => {
    return (
        <div className="row g-3 justify-content-center">
            {
                usersList.map((user) => (
                    <div className="card col-2 user-card" onClick={onClick}>
                        <div key={user.id} className="card-body" id={user.name}>
                            <div className="d-flex flex-column align-items-center">
                                <img alt={user.name} src={user.png} className="user-icon" />
                                <p className="lead fw-bold text-center mt-1 mb-0">{user.name}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

const SelectUser = () => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate('/dms_dashboard')
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h1 className="text-center fw-bold">Who are you?</h1>
                </div>

                <div className="card-body">
                    <UserCard usersList={usersList} onClick={handleCardClick} />
                </div>
            </div>

        </div>
    )
}

export default SelectUser;