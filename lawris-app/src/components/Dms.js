import { useEffect, useState } from 'react';
import $ from 'jquery';
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { Button, Dropdown, DropdownButton, MenuItem, Offcanvas } from 'react-bootstrap';
import User from '../Assets/non-litigant.jpg';
import Search from '../Assets/search.png';

import { UilApps } from '@iconscout/react-unicons';
// import { UisHouseUser } from '@iconscout/react-unicons'




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
import { logout } from './Auth';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';

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

//  const NavItem = ({ href, name, active }) => {

//      const classes = `nav-link ${active ? 'active' : ''}`
//      return (
//           <li className="nav-item">
//               {/* <a className={classes} aria-current="page" href={href} onClick={() => onClick(name)}>{name}</a> */}
//               <a className={classes} aria-current="page" href={href}>{name}</a>
//          </li>
//      )
//   }

const NavItem = ({ href, name, active, handleNavItemClick }) => {
    const classes = `nav-link ${active ? 'active' : ''}`;

    return (
        <li className="nav-item">
            <a className={classes} aria-current="page" href={href} onClick={() => handleNavItemClick(name)}>
                {name}
            </a>
        </li>
    );
};



//   const NavList = () => {
//         return (
//             <ul className="nav nav-underline">
//                 {navList.map((navItem) => (
//                    <NavItem key={navItem.id} href={navItem.href} name={navItem.name} active={navItem.active}
//                    />
//                ))}
//            </ul>
//       )
//    }
const NavList = ({ handleNavItemClick }) => {
    return (
        <ul className="nav nav-underline">
            {navList.map((navItem) => (
                <NavItem
                    key={navItem.id}
                    href={navItem.href}
                    name={navItem.name}
                    active={navItem.active}
                    handleNavItemClick={handleNavItemClick} // Pass the handleNavItemClick function
                />
            ))}
        </ul>
    );
};




const ProfileSideBar = () => {
    const [show, setShow] = useState(false);
    const userInfo = useSelector(selectUser)
    
    const handleToggle = () => {
        setShow(!show); 
        console.log('closed')// Toggle the show state
      };
    const handleClose= () => setShow(false);
    return (
        <div>
            <div onClick={handleToggle} className="profile align-self-end">
                {/* <UilUser className='usericon mb-2' /> */}
                <img  className='profileImg' src={userInfo.image} alt='user profile'/>
               
                <Offcanvas show={show} onHide={handleClose} className='bgCanvas' placement='end'> 
                    <Offcanvas.Header className='close' closeButton>
                        <Offcanvas.Title className='text-center'></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className=''>
                        <div>
                            {/* <UserProfile /> */}
                            <img className='profileImg' src={userInfo.image} alt='profileIMg'/>
                            <p>{userInfo.name}</p>
                            <hr></hr>
                        </div>
                        <div className='userSettings d-flex flex-column align-items-start justify-content-between'> 
                            <div className='d-flex align-items-center justify-content-center mb-3'>
                                <span>
                                    {/* <img src={Doc} alt='docsImg' style={{height: '25px'}}/> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-code-fill" viewBox="0 0 16 16">
                                         <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M6.646 7.646a.5.5 0 1 1 .708.708L5.707 10l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zm2.708 0 2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 10 8.646 8.354a.5.5 0 1 1 .708-.708z"/>
                                    </svg>
                                </span>
                                <p className='ml-2'>My Documents</p>
                            </div>
                            <div className='d-flex align-items-center mb-3'>
                                <span>
                                    {/* <img src={Account} alt='profileIcon' style={{height: '25px'}}/> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                    </svg>
                                </span>
                                <p className='ml-2'>My Account</p>
                            </div>
                            
                            <div className='d-flex align-items-center mb-3'>
                                <span>
                                    {/* <img src={Logout} alt='profileIcon' style={{height: '25px'}}/> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                    </svg>
                                </span>
                                <p className='logout ml-2'>Logout</p>
                            </div>
                            <div className='d-flex align-items-center mb-3'>
                                <span>
                                    {/* <img className='mr-0' src={settings} alt='settingsImg' style={{height: '25px'}} /> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                                    </svg>
                                </span>
                                <Dropdown className='dropDownSettings'>
                                    <Dropdown.Toggle as='span' id='dropdown-basic'>
                                    Settings & Support
                                    </Dropdown.Toggle>
                                </Dropdown>
                            </div>
                            
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
    const userInfo = useSelector(selectUser);
   

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisisble)
    }

    

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

   

    // console.log("IsEditModalOpen", isEditDocModalOpen);
    // console.log("Selected Card", selectedCard);

     
      // Filtering function based on the search input
    const filterDocuments = () => (
        documentList.filter((document) => 
            document.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            document.category_of_law === activeCategory
        )
    )

    const handleNavItemClick = (category_of_law) => {
        setActiveCategory(category_of_law);
        console.log("Selected Category:", category_of_law);
      };


    const handleSearch = (e) => {
        e.preventDefault() ;
        const filterDocs = filterDocuments();
        setDocumentList(filterDocs)

    };


    return (
        <div className="main-container">
            <div className="dashboard-nav navbar navbar-expand-lg">
                <div className='container-fluid pt-1'>
                    <div className='logo d-flex navbar-brand'>
                        <img  src={logo} alt='logoimg' style={{height: '50px'}}/>

                        <p className='intro text-bold pt-2'>Lawris</p>
                        
                    </div>    
                    <div className= 'search d-flex justify-content-center align-items-center'> 
                        <form onSubmit={(e) => handleSearch(e)} className='d-flex'>
                            {/* <img className='searchIcon'src={Search} alt='searchIcon' style={{ height: '20px'}}/> */}
                            <input
                                className="form-control mt-1"
                                type='search'
                                placeholder='search...'
                                value={searchTerm}
                                onChange={(e) => setSEarchTerm(e.target.value)} 
                            />
                            <button className="btn btn-outline-secondary ml-1 mt-1" type="submit">Search</button>
                        </form>   
                        
                        
                    </div>
                   
                    <div className="d-flex justify-content-end align-items-center" style={{position: 'relative'}}> 
                    
                        <div onClick={toggleDropdown} className="apps">
                            {/* <svg  className='usericon mr-2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                            </svg> */}
                        
                            {/* <img className="dev_icon" src={apps} alt="apps"></img> */}
                        {/* <UisHouseUser className='usericon mr-2' />     */}
                        
                        <UilApps className='usericon mr-2 mb-2' />
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
                <p className='welcomeIntro'>
                    Welcome {userInfo?.name}
                </p>
                <div className="background_image-container d-flex flex-column align-items-center">
                    {/* <WelcomeMessage /> */}
                    
                    <p className="lead fw-bold text-center text-white">DOCUMENT MANAGER</p>
                    <div className="command_bar-card card">
                        <div className="card-body command_bar-container">
                            <CommandBarIcons iconList={iconList} />
                        </div>
                    </div>
                </div>
                <div className='docsLayout'>
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
        </div>
    )
}

export default Dms
