import { useEffect, useState } from 'react';
import $ from 'jquery';
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import User from '../Assets/non-litigant.jpg';
import Search from '../Assets/search.png';
import Account from '../Assets/user.png';
import Logout from '../Assets/exit.png';
import Doc from '../Assets/google-docs.png';
import login from '../Assets/log-in.png';
import settings from '../Assets/settings.png';
import { UilApps } from '@iconscout/react-unicons';
import ProfileUpload from './ProfileUpload';


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

//Notifications
import Notifications from './Notifications'




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

const CommandBarIcons = ({ iconList,handleConvertClick, handleUploadClick}) => {
    const navigate = useNavigate();

    const handleIconClick = (route) => {
        console.log('[DEBUG] Calling Route: ', route)
        navigate(`/${route}`)
    }

    return (
        <div className="command_bar d-flex align-items-center">
            {iconList.map((icon) => (
                <CommandBarActions key={icon.id} icon={icon.png} action_name={icon.action_name} onClick={icon.action_name === 'Upload' ? handleUploadClick : icon.action_name === "Convert" ? handleConvertClick : () => handleIconClick(icon.route)} />
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

const UserProfile = () => {
    const [profileImage, setProfileImage] = useState(null);

    const handleProfileUpload = uploadFile => {
        console.log('Upload File:', uploadFile);
        setProfileImage(uploadFile)
    }
    return (
        <div>
            <h1>User Profile</h1>
            {profileImage && (
                <img 
                src={URL.createObjectURL(profileImage)}
                alt='Profile'
                style={{ width: '150', height: '150px', borderRadius: '50%' }}
                />
            )}
            <ProfileUpload onUpload={handleProfileUpload} />
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
                            {/* <img className='userProfile' src={User} alt='userImg'/> */}
                            <UserProfile />
                            <p>User Name</p>
                            <hr></hr>
                        </div>
                        <div className='userSettings d-flex flex-column align-items-start justify-content-between'> 
                            <div className='d-flex align-items-center justify-content-center mb-3'>
                                <span>
                                    <img src={Doc} alt='docsImg' style={{height: '25px'}}/>
                                </span>
                                <p className=''>My Documents</p>
                            </div>
                            <div className='d-flex align-items-center mb-3'>
                                <span>
                                    <img src={Account} alt='profileIcon' style={{height: '25px'}}/>
                                </span>
                                <p className=''>My Account</p>
                            </div>
                            <div className='d-flex align-items-center mb-3'>
                                <span>
                                    <img src={login} alt='loginImg' style={{height: '25px'}}/>
                                </span>
                                <p className='' onClick={handleButtonClick}>Sign In</p>
                            </div>
                            
                            <div className='d-flex align-items-center mb-3'>
                                <span>
                                    <img src={Logout} alt='profileIcon' style={{height: '25px'}}/>
                                </span>
                                <p className='logout'>Logout</p>
                            </div>
                            <div className='d-flex align-items-center mb-3'>
                                <span>
                                    <img className='mr-0' src={settings} alt='settingsImg' style={{height: '25px'}} />
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
    const [showUpload, setShowUpload] = useState(false);
    const [showConvert, setShowConvert] = useState(false);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [fileName, setFileName] = useState('')
    const [showFiles, setShowFiles] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isConvert, setIsConvert] = useState(false);
    const [isUpload, setIsUpload] = useState(false);
    

   

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

    const handleUploadClick = () => {
        setShowUpload(!showUpload);
        setIsUpload(true);
        setIsConvert(false);
        setShowConvert(false);
        setShowFiles(false);
     }
     
     const handleConvertClick = () => {
        setShowConvert(!showConvert);
        setIsConvert(true);
        setIsUpload(false);
        setShowUpload(false);
        setShowFiles(false);
     }

     

    const handleOnChange = (event) => {
    const file = event.target.files[0];
    console.log('File uploaded:', file.name);
    setFileName(file.name);
    setIsFileUploaded(true);
    setShowConvert(false);
    setShowUpload(false);

    // Add the file to the state
    setSelectedFiles(prevFiles => [...prevFiles, file]);

    // Call handleFileUpload after setting the file to the state
    handleFileUpload();
    };

    const handleShowFiles = () => {
        setShowFiles(true);
        setIsFileUploaded(false);
    };


      const handleFileUpload = () => {
        setIsFileUploaded(true);
        setShowFiles(false);
        setTimeout(() => {
            handleShowFiles();
            console.log('File progress complete');
        }, 8000);

     }
     

     
     const handleRemoveFile = (index) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
       };

       const getFileIcon = (fileType) => {
        if (fileType.includes('image')) {
         return <i className="bi bi-file-image" style={{fontSize: '80px'}}></i>;
        } else if (fileType.includes('pdf')) {
         return <i className="bi bi-file-pdf mx-auto" style={{fontSize: '80px'}}></i>;
        } else if (fileType.includes('doc') || fileType.includes('docx')) {
         return <i className="bi bi-file-word" style={{fontSize: '80px'}}></i>;
        } else if (fileType.includes('tiff')) {
         return <i className="bi bi-file-image" style={{fontSize: '80px'}}></i>; 
        } else {
         return <i className="bi bi-file" style={{fontSize: '80px'}}></i>;
        }
       };
       
       
      

    return (
        <div className="main-container">
            <div className="dashboard-nav p-2">
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='logo d-flex'>
                        <img  src={logo} alt='logoimg' style={{height: '45px'}}/>

                        <p className='text-bold pt-2'>Lawris</p>
                        
                    </div>    
                    <div className= 'search d-flex justify-content-center align-items-center'>    
                        <img className='searchIcon'src={Search} alt='searchIcon' style={{ height: '20px'}}/>
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
                        
                    </div>
                   
                    <div className="d-flex justify-content-end align-items-center" style={{position: 'relative'}}> 
                    
                        <div onClick={toggleDropdown} className="apps">
                        
                            {/* <img className="dev_icon" src={apps} alt="apps"></img> */}
                            <UilApps className='mr-2' />
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
            {showFiles && <Notifications time={new Date()} fileName={fileName} />}
            <div className="dms-container">
                <div className="background_image-container d-flex flex-column align-items-center">
                    <p className="lead fw-bold text-center">DOCUMENT MANAGER</p>
                    <div className="command_bar-card card">
                        <div className="card-body command_bar-container">
                        <CommandBarIcons iconList={iconList} handleConvertClick={handleConvertClick} handleUploadClick={handleUploadClick} />
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
                     {/**upload modal */}

            {showUpload && 
            <form class="file-upload-form mx-auto" style={{ zIndex: 9999 }}>
            <label for="file" class="file-upload-label">
                <div class="file-upload-design">
                <svg viewBox="0 0 640 512" height="1em">
                                <path
                                d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                ></path>
                </svg>
                <p>Drag and Drop</p>
                <p>or</p>
                <span class="browse-button">Browse file</span>
                </div>
                <input id="file" type="file" onChange={handleOnChange} />
            </label>
            </form>
            }

            {/**convert modal */}

            {showConvert && 
            <form class="file-upload-form mx-auto" style={{ zIndex: 9999 }}>
            <label for="file" class="file-upload-label">
                <div class="file-upload-design">
                <i class="bi bi-filetype-pdf" style={{fontSize: '40px'}} ></i>
                <p>Drag and Drop</p>
                <p>or</p>
                <span class="browse-button">Browse file</span>
                </div>
                <input id="file" type="file" onChange={handleOnChange} />
            </label>
            </form>}

            {isFileUploaded && 
            <form class="file-upload-form mx-auto" style={{ zIndex: 9999 }}>
            <label for="file" class="file-upload-label">
                <div class="file-upload-design">
                <div class={isUpload? 'installer' : 'installer2'}>
	                <label for="progressLinux"><input id="progressLinux" type="radio" /><span></span></label>
                </div>
                </div>
            </label>
            </form>}

            {showFiles && 
            <>
            <div style={{width: '100%'}}>
                <h1 className='text-center' style={{color: "#E5252A"}} >{isConvert ? "Converted Files" : "Uploaded Files"}</h1>
            </div>
            <form class="file-upload-form mx-auto" style={{ zIndex: 9999 }}>
                
                <div class="file-upload-label">
            <div class="file-upload-design2">
            <label className='my-auto' role="button">
            
                <form action="/upload" method="post" enctype="multipart/form-data">
                
                    <div 
                    className="file-box" 
                    data-bs-toggle="tooltip"       
                    data-bs-placement="bottom" 
                    title="Add File"  
                    >
            
                    <i class="bi bi-plus-circle m-auto" style={{fontSize: "90px"}}></i> 
                    </div>
                    <input type="file" onChange={handleOnChange} />
                    <input type="submit" value="Upload"></input>
                    </form>
                 </label>
                {selectedFiles.map((file, index) => (
                    <div  className="file-box" 
                    data-bs-toggle="tooltip"        
                    data-bs-placement="bottom" 
                    title={file.name}   
                    key={index}>
                            <span className='mx-auto'>{getFileIcon(file.type)}</span>
                            <br/>
                            <span>{file.name}</span>
                            
                            <button onClick={() => handleRemoveFile(index)}>X</button>   
                    </div>
                ))}
                

                </div>
                </div>
            </form>
            </>
            }
                    
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
