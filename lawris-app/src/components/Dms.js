import { useEffect, useState } from 'react';
import $ from 'jquery';
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import User from '../Assets/non-litigant.jpg';
import Search from '../Assets/search.png';
import Account from '../Assets/user.png';
import Logout from '../Assets/exit.png';
import Doc from '../Assets/google-docs.png';


// import backgroundImg from '../static/backgrounds/art.png';
import addFile from '../static/icons/dms/icons/new-file.png';
import archive from '../static/icons/dms/icons/archive.png';
import upload from '../static/icons/dms/icons/upload.png';
import pdf from '../static/icons/dms/icons/pdf.png';
import apps from '../static/icons/dms/icons/apps.svg';
import logo from '../Assets/transparentLawrisLogo.png';

//importing app icons
import video from '../Assets/video-camera.png';
import edit from '../Assets/edit.png';
import community from '../Assets/care.png';

// Styles
import './styles/Dms.css'

// Componenets
import Docs from './Docs';
import EditDocMainContainer from './EditDoc';

// Icons
import { UserIcon } from './Icons';

// Edit Doc
// import EditDoc from '../components/EditDoc';
import form78 from '../static/docs/[Form 78]-Petition for probate of written will or for proof of oral will.pdf'

import { useNavigate } from 'react-router-dom';


const iconList = [
    { id: 1, png: addFile, action_name: "New File", route: "file_new_case" },
    { id: 2, png: archive, action_name: "Open", route: "file_manager" },
    { id: 3, png: upload, action_name: "Upload", route: "upload" },
    { id: 4, png: pdf, action_name: "Convert", route: "pdf_converter" }
]

const navList = [
    { id: 1, name: "Civil", href: "/civil", active: false},
    { id: 2, name: "Criminal", href: "/criminal", active: true }, // Set this item as active
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

const Menu = () => {
    return (
        <div>
            <div className='menuItems d-flex align-items-center'>
                <Dropdown className='dropDown'>
                    <Dropdown.Toggle as='span' id='dropdown-basic'>
                        Services
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href='#doc'>Document retrival</Dropdown.Item>
                        <Dropdown.Item href='#doc'>Affidavits</Dropdown.Item>
                        <Dropdown.Item href='#doc'>Case files</Dropdown.Item>
                    </Dropdown.Menu>
                            
                </Dropdown>
                <Dropdown className='dropDown'>
                    <Dropdown.Toggle as='span' id='dropdown-basic'>
                        About

                    </Dropdown.Toggle>
                </Dropdown>
                <Dropdown className='dropDown'>
                    <Dropdown.Toggle as='span' id='dropdown-basic'>
                        Contact
                    </Dropdown.Toggle>
                </Dropdown>

            </div>
            

        </div>
    )
}

const ProfileSideBar = () => {
    const [show, setShow] = useState(false);
     const navigate = useNavigate();

     const handleButtonClick = () => {
        navigate('/auth');
    }


    const handleToggle = () => {
        setShow(!show); 
        console.log('closed')// Toggle the show state
      };
    const handleClose= () => setShow(false);
    return (
        <div>
            <div onClick={handleToggle} className="profile align-self-end">
                <UserIcon />
                <Offcanvas show={show} onHide={handleClose} className='bgCanvas' placement='end'> 
                    <Offcanvas.Header className='close' closeButton>
                        <Offcanvas.Title className='text-center'>My Profile</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className=''>
                        <div>
                            <img className='userProfile' src={User} alt='userImg'/>
                            <p>User Name</p>
                            <hr></hr>
                        </div>
                        <div className='userSettings d-flex flex-column align-items-start justify-content-between'> 
                            <div className='d-flex align-items-center justify-content-center'>
                                <span>
                                    <img src={Doc} alt='docsImg' style={{height: '25px'}}/>
                                </span>
                                <p className='mb-3'>My Documents</p>
                            </div>
                            <div className='d-flex align-items-center'>
                                <span>
                                    <img src={Account} alt='profileIcon' style={{height: '25px'}}/>
                                </span>
                                <p className='mb-3'>My Account</p>
                            </div>
                            <p className='mb-3' onClick={handleButtonClick}>Sign In</p>
                            <div className='d-flex align-items-center'>
                                <span>
                                    <img src={Logout} alt='profileIcon' style={{height: '25px'}}/>
                                </span>
                                <p className='logout'>Logout</p>
                            </div>
                            <Dropdown className='dropDownSettings'>
                            <Dropdown.Toggle as='span' id='dropdown-basic'>
                                Settings & Support
                            </Dropdown.Toggle>
                        </Dropdown>
                        </div>          
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </div>
    )

    
}

const Dms = () => {
    const [documentList, setDocumentList] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isEditDocModalOpen, setIsEditDocModalOpen] = useState(false);
    const [isDropdownVisisble, setDropdownVisible] = useState(false);
    const [activeCategory, setActiveCategory] = useState("Civil");
    const [searchTerm, setSEarchTerm] = useState('');
   

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisisble)
    }

    const handleNavItemClick = (category_of_law) => {
        console.log("Selected Category:", category_of_law);
        setActiveCategory(category_of_law);
      };


    // Load templates on render
    useEffect(() => {
        $.ajax({
            url: 'http://127.0.0.1:8000/dms/api/templates/',
            method: 'GET',
            dataType: 'json',
            success: (data) => {
                setDocumentList(data);
                console.log(data)

                data.forEach((document) => {
                    console.log("Category of Law:", document.category_of_law);
                });
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
                templateId: documentId,
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

    // Add a helper function to filter documents by category
    // const filterDocumentsByCategory = (documentList, category_of_law) => {
    //     return documentList.filter((document) => document.category_of_law === category_of_law);
    // };

    console.log("IsEditModalOpen", isEditDocModalOpen);
    console.log("Selected Card", selectedCard);

      // Filtering function based on the search input
    const filterDocuments = () => (
        documentList.filter((document) => 
            document.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            document.category_of_law === activeCategory
        )
    )


    return (
        <div className="main-container">
            <div className="dashboard-nav p-2">
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='logo d-flex'>
                        <img  src={logo} alt='logoimg' style={{height: '45px'}}/>

                        <p className='text-bold pt-2'>Lawris</p>
                        
                    </div>    
                    <div className= 'search d-flex justify-content-center align-items-center'>
                        
                            <span>
                                <img src={Search} alt='searchIcon' style={{ height: '20px'}}/>
                            </span>
                            
                            <input
                            className="input-group"
                        
                            type='search'
                            placeholder='search...'
                            value={searchTerm}
                            onChange={(e) => setSEarchTerm(e.target.value)} 
                            />  

                        
                       
                    </div>
                    <div className='menuItems d-flex align-items-center'>
                        <Menu />
                        {/* <Dropdown className='dropDown'>
                            <Dropdown.Toggle variant='success' id='dropdown-basic'>
                                Services
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href='#doc'>Document retrival</Dropdown.Item>
                                <Dropdown.Item href='#doc'>Affidavits</Dropdown.Item>
                                <Dropdown.Item href='#doc'>Case files</Dropdown.Item>
                            </Dropdown.Menu>
                           
                        </Dropdown>
                        <Dropdown className='dropDown'>
                            <Dropdown.Toggle variant='success' id='dropdown-basic'>
                                About

                            </Dropdown.Toggle>
                        </Dropdown>
                        <Dropdown className='dropDown'>
                            <Dropdown.Toggle variant='success' id='dropdown-basic'>
                                Contact
                            </Dropdown.Toggle>
                        </Dropdown> */}
                        
                    </div>
                   
                    <div className="d-flex justify-content-end align-items-center" style={{position: 'relative'}}> 
                    
                        <div onClick={toggleDropdown} className="apps">
                            <img className="dev_icon" src={apps} alt="apps"></img>
                        </div>
                        {isDropdownVisisble && (
                            <div className='app d-flex'>
                                <img src={video} alt='videoImg' style={{ height:'30px' }} />
                                <img style={{height: '30px'}} src={edit} alt='editingTool'/>
                                <img  style={{height: '30px'}} src={community} alt='communityImg'/>
                            </div>
                        )}
                        <ProfileSideBar />
                    </div>

                </div>
                
            </div>
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
                        {/* <NavList /> */}
                        <NavList handleNavItemClick={handleNavItemClick} />
                    </div>
                </div>
                {/* <Docs documentList={documentList} handleCardClick={handleCardClick} /> */}
                {/* <Docs documentList={filterDocumentsByCategory(documentList, activeCategory)} handleCardClick={handleCardClick} /> */}
                <Docs documentList={filterDocuments()} handleCardClick={handleCardClick} />
                {isEditDocModalOpen && selectedCard && (
                    <EditDocMainContainer templateId={selectedCard.templateId} title={selectedCard.title} docUrl={form78} formFields={selectedCard.formFields} isOpen={isEditDocModalOpen}
                        closeModal={closeModal} />
                )}
            </div>
        </div>
    )
}

export default Dms
