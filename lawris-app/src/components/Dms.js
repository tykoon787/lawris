import React from 'react';
// import backgroundImg from '../static/backgrounds/art.png';
import addFile from '../static/icons/dms/icons/new-file.png';
import archive from '../static/icons/dms/icons/archive.png';

// Styles
import './styles/Dms.css'

// Styling library
// import styled from 'styled-components';

// const MutedText = styled.p`
//     font-size: 16px;
// `;

// Comoonenets
import Docs from './Docs';

const Dms = () => {
    return (
        <div className="main-container">
            <div className="dashboard-nav"></div>
            <div className="dms-container">
                <div className="background_image-container d-flex flex-column align-items-center">
                    <p className="lead fw-bold text-center">DOCUMENT MANAGER</p>
                    <div className="command_bar-card card">
                        <div className="card-body command_bar-container">
                            <div className="command_bar row row-cols-lg-8 d-flex align-items-center">
                                <div className="col-1">
                                    <img alt="new-file" src={addFile} className="command_bar-icon" />
                                </div>

                                <div className="col-1">
                                    <img alt="archive" src={archive} className="command_bar-icon" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="cases_tab-container d-flex flex-row">
                        <div className="cases-tab">
                            <ul className="nav nav-underline">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/civil">Civil</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="/criminal">Criminal</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="/commercial">Commercial</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="/land">Land Law</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="/arbitration">Arbitration</a>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <Docs />
                </div>
            </div>
        </div>
    )
}

export default Dms