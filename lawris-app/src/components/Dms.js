import React, { useState } from 'react';
// import backgroundImg from '../static/backgrounds/art.png';
import addFile from '../static/icons/dms/icons/new-file.png';
import archive from '../static/icons/dms/icons/archive.png';
import upload from '../static/icons/dms/icons/upload.png';
import pdf from '../static/icons/dms/icons/pdf.png';

// Styles
import './styles/Dms.css'

// Comoonenets
import Docs from './Docs';

import $ from 'jquery';

const iconList = [
    {
        id: 1,
        png: addFile,
        action_name: "New File"
    },
    {
        id: 2,
        png: archive,
        action_name: "Open"
    },
    { id: 3, png: upload, action_name: "Upload" },
    { id: 4, png: pdf, action_name: "Convert" }
]

const navList = [
    { id: 1, name: "Civil", href: "/civil", active: true },
    { id: 2, name: "Criminal", href: "/criminal", active: false }, // Set this item as active
    { id: 3, name: "Commercial", href: "/commercial", active: false },
    { id: 4, name: "Land Law", href: "/land_law", active: false },
    { id: 5, name: "Arbitration", href: "/arbitration", active: false },
]

const CommandBarActions = ({ icon, action_name }) => {
    return (
        <div className="col-1">
            <div className="d-flex flex-column align-items-center">
                <div className="icon-container">
                    <img alt="new-file" src={icon} className="command_bar-icon" />
                </div>
                <p className="command_bar-text fw-bold">{action_name}</p>
            </div>
        </div>
    )
}

const CommandBarIcons = () => {
    return (
        <div className="command_bar d-flex align-items-center">
            {iconList.map((icon) => (
                <CommandBarActions key={icon.id} icon={icon.png} action_name={icon.action_name} />
            ))}
        </div>
    )
}

const NavItem = ({ href, name, active }) => {

    const classes = `nav-link ${active ? 'active' : ''}`
    return (
        <li className="nav-item">
            <a className={classes} aria-current="page" href={href}>{name}</a>
        </li>
    )
}

// Nav Item on click
$('.docs-container').children().hide();
$('.docs-container').children(':eq(0)').show()

// const navigationHandler = () => {
//     // Get the clicked item ID
//     const itemId = $(this).atrr('id');

//     // Hide all template gallery content
//     $('.docs-container').children().hide();

//     // Show the corresponding template gallery
//     const contentToShow = $(`.docs-container#${itemId}`)
//     contentToShow.show();

//     // Update the active state of the navigation
//     $('.nav-item').removeClass('active');
//     $(this).addClass('active');
// }

const NavList = ({ activeSection, onClick }) => {
    return (
        <ul className="nav nav-underline">
            {navList.map((navItem) => (
                <NavItem key={navItem.id} href={navItem.href} name={navItem.name} active={navItem.active === activeSection}
                    OnClick={() => onClick(navItem.name)} />
            ))}
        </ul>
    )
}

const Dms = () => {
    const [activeSection, setActiveSection] = useState('Civil');

    // Function to hande navigation and update the active section

    const navigationHandler = (sectionName) => {
        setActiveSection(sectionName);
    };

    return (
        <div className="main-container">
            <div className="dashboard-nav"></div>
            <div className="dms-container">
                <div className="background_image-container d-flex flex-column align-items-center">
                    <p className="lead fw-bold text-center">DOCUMENT MANAGER</p>
                    <div className="command_bar-card card">
                        <div className="card-body command_bar-container">
                            <CommandBarIcons />
                        </div>
                    </div>
                </div>

                <div className="cases_tab-container d-flex flex-row">
                    <div className="cases-tab">
                        <NavList activeSection={activeSection} onClick={navigationHandler} />
                    </div>
                </div>
                <Docs activeSection={activeSection} />
            </div>
        </div>
    )
}

export default Dms