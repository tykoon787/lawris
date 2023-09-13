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
                    <div className="row g-3 justify-content-center">
                        <div className="card col-2 user-card" id="lawyer-card" onClick={handleCardClick}>
                            <div className="card-body">
                                <div className="row flex-column align-items-center">
                                    <img alt="lawyer" src={lawyerImage} className="user-icon" />
                                    <p className="lead fw-bold text-center mt-1 mb-0">Lawyer</p>
                                </div>
                            </div>
                        </div>

                        <div className="card col-2 user-card" id="non-litigant-card" onClick={handleCardClick}>
                            <div className="card-body">
                                <div className="row flex-column align-items-center">
                                    <img alt="non-litigant" src={nonLitigantImage} className="user-icon" />
                                    <p className="lead fw-bold text-center mt-1 mb-0">Non-Litigant</p>
                                </div>
                            </div>
                        </div>

                        <div className="card col-2 user-card" id="law_firm-card" onClick={handleCardClick}>
                            <div className="card-body">
                                <div className="row flex-column align-items-center">
                                    <img alt="law_firm" src={lawFirmImage} className="user-icon" />
                                    <p className="lead fw-bold text-center mt-1 mb-0">Law Firm</p>
                                </div>
                            </div>
                        </div>

                        <div className="card col-2 user-card" id="judiciary-card" onClick={handleCardClick}>
                            <div className="card-body">
                                <div className="row flex-column align-items-center">
                                    <img alt="judiciary" src={judiciaryImage} className="user-icon" />
                                    <p className="lead fw-bold text-center mt-1 mb-0">Judiciary</p>
                                </div>
                            </div>
                        </div>

                        <div className="card col-2 user-card" id="business-card">
                            <div className="card-body">
                                <div className="row flex-column align-items-center">
                                    <img alt="enterprise" src={businessImage} className="user-icon" />
                                    <p className="lead fw-bold text-center mt-1 mb-0">Business</p>
                                </div>
                            </div>
                        </div>

                        <div className="card col-2 user-card" id="educational_institution-card">
                            <div className="card-body">
                                <div className="row flex-column align-items-center">
                                    <img alt="school" src={schoolImage} className="user-icon" />
                                    <p className="lead fw-bold text-center mt-1 mb-0">University</p>
                                </div>
                            </div>
                        </div>

                        <div className="card col-2 user-card" id="student-card">
                            <div className="card-body">
                                <div className="row flex-column align-items-center">
                                    <img alt="student" src={studentImage} className="user-icon" />
                                    <p className="lead fw-bold text-center mt-1 mb-0">Student</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SelectUser;