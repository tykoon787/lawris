import { useEffect, useState } from 'react';
import $ from 'jquery';

// import backgroundImg from '../static/backgrounds/art.png';
import addFile from '../static/icons/dms/icons/new-file.png';
import archive from '../static/icons/dms/icons/archive.png';
import upload from '../static/icons/dms/icons/upload.png';
import pdf from '../static/icons/dms/icons/pdf.png';

// Styles
import './styles/Dms.css'

// Componenets
import Docs from './Docs';
import EditDocMainContainer from './EditDoc';

// Edit Doc
// import EditDoc from '../components/EditDoc';
// import form78 from '../static/docs/[Form 78]-Petition for probate of written will or for proof of oral will.pdf'

import { useNavigate } from 'react-router-dom';


const iconList = [
    { id: 1, png: addFile, action_name: "New File", route: "file_new_case" },
    { id: 2, png: archive, action_name: "Open", route: "file_manager" },
    { id: 3, png: upload, action_name: "Upload", route: "upload" },
    { id: 4, png: pdf, action_name: "Convert", route: "pdf_converter" }
]

const navList = [
    { id: 1, name: "Civil", href: "/civil", active: true },
    { id: 2, name: "Criminal", href: "/criminal", active: false }, // Set this item as active
    { id: 3, name: "Commercial", href: "/commercial", active: false },
    { id: 4, name: "Land Law", href: "/land_law", active: false },
    { id: 5, name: "Arbitration", href: "/arbitration", active: false },
]

const CommandBarActions = ({ icon, action_name, onClick }) => {
    return (
        <div className="col-1">
            <div className="d-flex flex-column align-items-center">
                <div className="icon-container">
                    <img alt="new-file" src={icon} className="command_bar-icon" onClick={onClick} />
                </div>
                <p className="command_bar-text fw-bold">{action_name}</p>
            </div>
        </div>
    )
}

const CommandBarIcons = ({ iconList }) => {
    const navigate = useNavigate();

    const handleIconClick = (route) => {
        console.log('[DEBUG] Calling Route: ', route)
        navigate(`/${route}`)
    }

    return (
        <div className="command_bar d-flex align-items-center">
            {iconList.map((icon) => (
                <CommandBarActions key={icon.id} icon={icon.png} action_name={icon.action_name} onClick={() => handleIconClick(icon.route)} />
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

const NavList = () => {
    return (
        <ul className="nav nav-underline">
            {navList.map((navItem) => (
                <NavItem key={navItem.id} href={navItem.href} name={navItem.name} active={navItem.active}
                />
            ))}
        </ul>
    )
}

const Dms = () => {
    const [documentList, setDocumentList] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isEditDocModalOpen, setIsEditDocModalOpen] = useState(false);


    // Load templates on render
    useEffect(() => {
        $.ajax({
            url: 'http://127.0.0.1:8000/dms/api/templates/',
            method: 'GET',
            dataType: 'json',
            success: (data) => {
                setDocumentList(data);
            },
            error: (error) => {
                console.log("Error fetching data: ", error);
            }
        })
    }, [])

    const handleCardClick = async (documentId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/dms/api/templates/${documentId}/`);
            const data = await response.json();

            console.log("Template Data: ", data)

            setSelectedCard({
                docUrl: data.pdf_preview_file,
                title: data.title,
                formFields: Object.values(data.form_fields)
            });


            setIsEditDocModalOpen(true)

        } catch (error) {
            console.error("Error fetching document data:", error);
        }
    };

    const closeModal = () => {
        setIsEditDocModalOpen(false);
    };

    console.log("IsEditModalOpen", isEditDocModalOpen);
    console.log("Selected Card", selectedCard);


    return (
        <div className="main-container">
            <div className="dashboard-nav"></div>
            <div className="dms-container">
                <div className="background_image-container d-flex flex-column align-items-center">
                    <p className="lead fw-bold text-center">DOCUMENT MANAGER</p>
                    <div className="command_bar-card card">
                        <div className="card-body command_bar-container">
                            <CommandBarIcons iconList={iconList} />
                        </div>
                    </div>
                </div>

                <div className="cases_tab-container d-flex flex-row">
                    <div className="cases-tab">
                        <NavList />
                    </div>
                </div>
                <Docs documentList={documentList} handleCardClick={handleCardClick} />
                {isEditDocModalOpen && selectedCard && (
                    <EditDocMainContainer title={selectedCard.title} docUrl={selectedCard.docUrl} formFields={selectedCard.formFields} isOpen={isEditDocModalOpen}
                    closeModal={closeModal} />
                )}
            </div>
        </div>
    )
}

export default Dms