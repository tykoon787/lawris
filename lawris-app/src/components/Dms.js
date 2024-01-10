import { useEffect, useState, useMemo, useCallback } from "react";
import $ from "jquery";
import Dropdown from "react-bootstrap/Dropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
// import User from '../Assets/non-litigant.jpg';
import { UilApps } from "@iconscout/react-unicons";
import user from "../Assets/user.png";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";

import { logout } from "./OAuth";

// import backgroundImg from '../static/backgrounds/art.png';
import addFile from "../static/icons/dms/icons/new-file.png";
import archive from "../static/icons/dms/icons/archive.png";
import upload from "../static/icons/dms/icons/upload.png";
import pdf from "../static/icons/dms/icons/pdf.png";
// import apps from '../static/icons/dms/icons/apps.svg';

import logo from "../Assets/transparentLawrisLogo.png";

//importing app icons
import video from "../Assets/video-camera.png";
import edit from "../Assets/edit.png";
import community from "../Assets/care.png";

// Styles
import "./styles/Dms.css";

// Componenets
import Docs from "./Docs";
import EditDocMainContainer from "./EditDoc";

// Icons
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";

// Edit Doc
// import EditDoc from '../components/EditDoc';
import form78 from "../static/docs/previewFile.pdf";

import { useNavigate } from "react-router-dom";

//Notifications
import Notifications from "./Notifications";

//Word File Viewer
// import WordFileViewer from './WordFileViewer';

//default user profile
import User from "../Assets/user.png";

const iconList = [
{ id: 1, png: addFile, action_name: "New File", route: "file_new_case" },
{ id: 2, png: archive, action_name: "Open", route: "file_manager" },
{ id: 3, png: upload, action_name: "Upload", route: "upload" },
{ id: 4, png: pdf, action_name: "Convert", route: "pdf_converter" },
];

const navList = [
{ id: 1, name: "Civil", active: true }, // Set this item as active
{ id: 2, name: "Criminal", active: false },
{ id: 3, name: "Commercial", active: false },
{ id: 4, name: "Land Law", active: false },
{ id: 5, name: "Arbitration", active: false },
];

const CommandBarActions = ({ icon, action_name, onClick }) => {
return (
    <div className="col-1">
    <div className="d-flex flex-column align-items-center">
        <div className="icon-container">
        <img
            alt="new-file"
            src={icon}
            className="command_bar-icon"
            onClick={onClick}
        />
        </div>
        <p className="command_bar-text fw-bold">{action_name}</p>
    </div>
    </div>
);
};

const CommandBarIcons = ({
iconList,
handleConvertClick,
handleUploadClick,
}) => {
const navigate = useNavigate();

const handleIconClick = (route) => {
    console.log("[DEBUG] Calling Route: ", route);
    navigate(`/${route}`);
};

return (
    <div className="command_bar d-flex align-items-center">
    {iconList.map((icon) => (
        <CommandBarActions
        key={icon.id}
        icon={icon.png}
        action_name={icon.action_name}
        onClick={
            icon.action_name === "Upload"
            ? handleUploadClick
            : icon.action_name === "Convert"
            ? handleConvertClick
            : () => handleIconClick(icon.route)
        }
        />
    ))}
    </div>
);
};

const NavItem = ({ href, name, active, handleNavItemClick }) => {
const classes = `nav-link ${active ? "active" : ""}`;

return (
    <li className="nav-item">
    <a
        className={classes}
        aria-current="page"
        href={href}
        onClick={() => handleNavItemClick(name)}
    >
        {name}
    </a>
    </li>
);
};

const NavList = ({ handleNavItemClick }) => {
return (
    <ul className="nav nav-underline">
    {navList.map((navItem) => (
        <NavItem
        key={navItem.id}
        name={navItem.name}
        href={navItem.href}
        active={navItem.active}
        handleNavItemClick={handleNavItemClick} // Pass the handleNavItemClick function
        />
    ))}
    </ul>
);
};

const ProfileSideBar = () => {
const { navigate } = useNavigate();
const [show, setShow] = useState(false);

//false data
const defaultUserInfo = {
    image: User,
    name: "Kakai",
};

const userInfo = useSelector(selectUser) || defaultUserInfo;

const handleToggle = () => {
    setShow(!show);
    console.log("closed"); // Toggle the show state
};
const handleClose = () => setShow(false);

const handleSignOut = () => {
    try {
    logout();
    navigate("/");
    } catch {
    console.log("Logout unsuccsessful");
    }
};
return (
    <div>
    <div onClick={handleToggle} className="profile align-self-end pl-2">
        {userInfo ? (
        <img
            className="profileImg mr-2"
            src={userInfo?.image}
            alt="user profile"
        />
        ) : (
        <img
            className="mb-2"
            src={user}
            alt="user"
            style={{ height: "25px" }}
        />
        )}

        <Offcanvas
        show={show}
        onHide={handleClose}
        className="bgCanvas"
        placement="end"
        >
        <Offcanvas.Header className="close" closeButton>
            <Offcanvas.Title className="text-center"></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="">
            <div>
            {userInfo ? (
                <img
                className="profileImg"
                src={userInfo?.image}
                alt="user profile"
                style={{ height: "40px" }}
                />
            ) : (
                <img
                className="usericon"
                src={user}
                alt="user"
                style={{ height: "20px" }}
                />
            )}
            <p>{userInfo ? `${userInfo.name}` : `Username`}</p>
            <hr></hr>
            </div>
            <div className="userSettings d-flex flex-column align-items-start justify-content-between">
            <div className="element d-flex align-items-center justify-content-center mb-3">
                <span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-file-earmark-code-fill"
                    viewBox="0 0 16 16"
                >
                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M6.646 7.646a.5.5 0 1 1 .708.708L5.707 10l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zm2.708 0 2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 10 8.646 8.354a.5.5 0 1 1 .708-.708z" />
                </svg>
                </span>
                <p className="ml-2">My Documents</p>
            </div>
            <div className="element d-flex align-items-center mb-3">
                <span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-person-fill"
                    viewBox="0 0 16 16"
                >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
                </span>
                <p className="ml-2">My Account</p>
            </div>

            <div className="element d-flex align-items-center mb-3">
                <span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                >
                    <path
                    fill-rule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                    />
                    <path
                    fill-rule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                    />
                </svg>
                </span>
                <p className="logout ml-2" onClick={handleSignOut}>
                Logout
                </p>
            </div>
            <div className="element d-flex align-items-center mb-3">
                <span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-gear-fill"
                    viewBox="0 0 16 16"
                >
                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                </svg>
                </span>
                <Dropdown className="dropDownSettings">
                <Dropdown.Toggle as="span" id="dropdown-basic">
                    Settings & Support
                </Dropdown.Toggle>
                </Dropdown>
            </div>
            </div>
        </Offcanvas.Body>
        </Offcanvas>
    </div>
    </div>
);
};

const Dms = () => {
const [documentList, setDocumentList] = useState([]);
const [selectedCard, setSelectedCard] = useState(null);
const [isEditDocModalOpen, setIsEditDocModalOpen] = useState(false);
const [isDropdownVisisble, setDropdownVisible] = useState(false);
const [activeCategory, setActiveCategory] = useState("Civil");
const [searchTerm, setSEarchTerm] = useState("");
const [showUpload, setShowUpload] = useState(false);
const [showConvert, setShowConvert] = useState(false);
const [isFileUploaded, setIsFileUploaded] = useState(false);
const [fileName, setFileName] = useState("");
const [showFiles, setShowFiles] = useState(false);
const [selectedFiles, setSelectedFiles] = useState([]);
const [isConvert, setIsConvert] = useState(false);
const [isUpload, setIsUpload] = useState(false);
const [showProgressbar, setShowProgressbar] = useState(false);
const [showNotification, setShowNotification] = useState(false);
const [isWordFile, setIsWordFile] = useState(false);
const [file, setFile] = useState(null);
const [formData, setFormData] = useState([]);

const userInfo = useSelector(selectUser);
const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisisble);
};
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(15);

// Load templates on render
useEffect(() => {
    $.ajax({
    url: "http://127.0.0.1:8000/dms/api/templates/",
    method: "GET",
    dataType: "json",
    success: (data) => {
        setDocumentList(data);
        console.log(data);

        data.forEach((document) => {
        console.log("Category of Law:", document.category_of_law);
        });
    },
    error: (error) => {
        console.log("Error fetching data: ", error);
    },
    });
}, []);

const handleCardClick = async (documentId) => {
    try {
    const response = await fetch(
        `http://127.0.0.1:8000/dms/api/templates/${documentId}/`
    );
    const data = await response.json();

    console.log("Template Data: ", data);

    setSelectedCard({
        templateId: documentId,
        docUrl: data.pdf_preview_file,
        title: data.title,
        formFields: Object.values(data.form_fields),
    });

    setFormData(Object.values(data.form_fields));

    setIsEditDocModalOpen(true);
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
const filterDocuments = useCallback(() => {
    return documentList.filter(
    (document) =>
        document.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        document.category_of_law === activeCategory
    );
}, [activeCategory, documentList, searchTerm]);

// Function to calculate the total number of pages based on itemsPerPage
const totalPages = Math.ceil(filterDocuments().length / itemsPerPage);

const handleUploadClick = () => {
    setShowUpload(!showUpload);
    setIsUpload(true);
    setIsConvert(false);
    setShowConvert(false);
    setShowFiles(false);
};

const handleConvertClick = () => {
    setShowConvert(!showConvert);
    setIsConvert(true);
    setIsUpload(false);
    setShowUpload(false);
    setShowFiles(false);
};

const handleOnChange = (event) => {
    const file = event.target.files[0];
    console.log("File uploaded:", file.name);
    setFileName(file.name);
    setIsFileUploaded(true);
    setShowConvert(false);
    setShowUpload(false);

    // Add the file to the state
    setTimeout(() => {
    // Add the file to the state
    setSelectedFiles((prevFiles) => [...prevFiles, file]);
    }, 8000);

    // Call handleFileUpload after setting the file to the state
    handleFileUpload();
};

const handleShowFiles = () => {
    setShowFiles(true);
    setIsWordFile(false);
    setIsFileUploaded(false);
    setShowProgressbar(false);
};

const handleFileUpload = () => {
    setIsFileUploaded(true);
    setShowFiles(false);
    setTimeout(() => {
    handleShowFiles();
    console.log("File progress complete");
    }, 8000);
};

const handleRemoveFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
};

const getFileIcon = (fileType) => {
    if (fileType.includes("image")) {
    return <i className="bi bi-file-image" style={{ fontSize: "80px" }}></i>;
    } else if (fileType.includes("pdf")) {
    return (
        <i className="bi bi-file-pdf mx-auto" style={{ fontSize: "80px" }}></i>
    );
    } else if (
    fileType === "application/msword" ||
    fileType.includes(".doc") ||
    fileType.includes(".docx") ||
    fileType.includes(".dot") ||
    fileType.includes(".dotx") ||
    fileType.includes(".docm") ||
    fileType.includes("dotm")
    ) {
    return <i className="bi bi-file-word" style={{ fontSize: "80px" }}></i>;
    } else if (fileType.includes("tiff")) {
    return <i className="bi bi-file-image" style={{ fontSize: "80px" }}></i>;
    } else {
    return <i className="bi bi-file" style={{ fontSize: "80px" }}></i>;
    }
};

const handleAddFile = (event) => {
    const file = event.target.files[0];
    console.log("File uploaded:", file);
    console.log("File uploaded:", file.name);
    setFileName(file.name);
    setShowProgressbar(true);
    setShowConvert(false);
    setShowUpload(false);
    setShowFiles(false);

    setTimeout(() => {
    // Add the file to the state
    setShowFiles(true);
    setIsWordFile(false);
    }, 1000);

    // Call handleFileUpload after setting the file to the state
    handleFileUpload2();

    setTimeout(() => {
    // Add the file to the state
    setSelectedFiles((prevFiles) => [...prevFiles, file]);
    }, 8000);
};

const handleFileUpload2 = () => {
    setShowProgressbar(true);

    setTimeout(() => {
    handleShowFiles();
    console.log("File progress complete");
    }, 8000);
};

useEffect(() => {
    // This code block will execute whenever selectedFiles changes
    if (selectedFiles.length === 0) {
    return;
    }
    console.log("Selected files have changed:", selectedFiles);
    setShowNotification(true);

    const notificationTimeout = setTimeout(() => {
    setShowNotification(false);
    }, 3000);

    return () => clearTimeout(notificationTimeout);
}, [selectedFiles]);

const openFile = (file) => {
    setFile(file);
    if (file.type.includes("pdf")) {
    //   window.open(URL.createObjectURL(file), '_blank');
    setIsWordFile(true);
    } else if (
    file.type.includes("word") ||
    file.type === "application/msword" ||
    file.type.includes(".doc") ||
    file.type.includes(".docx") ||
    file.type.includes(".dot") ||
    file.type.includes(".dotx") ||
    file.type.includes(".docm") ||
    file.type.includes("dotm")
    ) {
    // Assuming Word files have 'word' in the type
    setIsWordFile(true);
    } else {
    console.log("Unsupported file type");
    }
};

const handleNavItemClick = (category_of_law) => {
    setActiveCategory(category_of_law);
    console.log("Selected Category:", category_of_law);
};

const handleSearch = (e) => {
    e.preventDefault();
    const filterDocs = filterDocuments();
    setDocumentList(filterDocs);
};

// Function to handle page change
const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
    setCurrentPage(newPage);
    }
};

// Render a subset of documents based on pagination
const renderDocuments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filterDocuments().slice(startIndex, endIndex);
}, [currentPage, itemsPerPage, filterDocuments]);

return (
    <div className="main-container">
    <div className="dashboard-nav navbar navbar-expand-lg">
        <div className="menu container-fluid pt-1">
        <div className="logo d-flex navbar-brand">
            <img src={logo} alt="logoimg" style={{ height: "50px" }} />

            <p className="intro text-bold pt-2">Lawris</p>
        </div>
        <div className="search d-flex justify-content-center align-items-center">
            <form onSubmit={(e) => handleSearch(e)} className="d-flex">
            <input
                className="form-control mt-1"
                type="search"
                placeholder="search..."
                value={searchTerm}
                onChange={(e) => setSEarchTerm(e.target.value)}
            />
            <button className="buttonSearch">Search</button>
            </form>
        </div>

        <div
            className="d-flex justify-content-end align-items-center"
            style={{ position: "relative" }}
        >
            <div onClick={toggleDropdown} className="apps">
            <UilApps className="apps mr-4 mb-2" />
            </div>
            {isDropdownVisisble && (
            <div className="app d-flex">
                <img src={video} alt="videoImg" style={{ height: "30px" }} />
                <img style={{ height: "30px" }} src={edit} alt="editingTool" />
                <img
                style={{ height: "30px" }}
                src={community}
                alt="communityImg"
                />
            </div>
            )}
            <ProfileSideBar />
        </div>
        </div>
    </div>
    {showNotification && (
        <Notifications time={new Date()} fileName={fileName} />
    )}
    <div className="dms-container">
        <p className="welcomeIntro">
        {userInfo ? `Welcome ${userInfo.name}` : `Welcome new user`}
        </p>
        <div className="background_image-container d-flex flex-column align-items-center">
        {/* <WelcomeMessage /> */}

        <p className="lead fw-bold text-center text-white">
            DOCUMENT MANAGER
        </p>
        <div className="command_bar-card card col-md-6">
            <div className="card-body command_bar-container">
            <CommandBarIcons
                iconList={iconList}
                handleConvertClick={handleConvertClick}
                handleUploadClick={handleUploadClick}
            />
            </div>
        </div>
        </div>

        <div className="docsLayout">
        <div className="cases_tab-container d-flex flex-row">
            <div className="cases-tab">
            <NavList handleNavItemClick={handleNavItemClick} />
            </div>
        </div>
        {/**upload modal */}

        {showUpload && (
            <form className="file-upload-form mx-auto" style={{ zIndex: 9999 }}>
            <label htmlFor="file" className="file-upload-label glass">
                <i
                className="bi bi-x-lg float-right text-xl"
                style={{ cursor: "pointer", fontSize: "20px" }}
                onClick={() => setShowUpload(false)}
                ></i>
                <div
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Show Uploaded Files"
                >
                <i
                    className="bi bi-cloud float-left text-xl"
                    style={{ cursor: "pointer", fontSize: "35px" }}
                    onClick={() => {
                    setShowFiles(true);
                    setShowUpload(false);
                    }}
                ></i>
                </div>
                <div className="file-upload-design glass">
                <svg viewBox="0 0 640 512" height="1em">
                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                </svg>
                <p>Drag and Drop</p>
                <p>or</p>
                <span className="browse-button">Browse file</span>
                </div>
                <input id="file" type="file" onChange={handleOnChange} />
            </label>
            </form>
        )}

        {/**convert modal */}

        {showConvert && (
            <form className="file-upload-form mx-auto" style={{ zIndex: 9999 }}>
            <label htmlFor="file" className="file-upload-label glass">
                <i
                className="bi bi-x-lg float-right text-xl"
                style={{ cursor: "pointer", fontSize: "20px" }}
                onClick={() => setShowConvert(false)}
                ></i>
                <div
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Show Converted Files"
                >
                <i
                    className="bi bi-cloud float-left text-xl"
                    style={{ cursor: "pointer", fontSize: "35px" }}
                    onClick={() => {
                    setShowConvert(false);
                    setShowFiles(true);
                    }}
                ></i>
                </div>
                <div className="file-upload-design glass">
                <i
                    className="bi bi-filetype-pdf"
                    style={{ fontSize: "40px" }}
                ></i>
                <p>Drag and Drop</p>
                <p>or</p>
                <span className="browse-button">Browse file</span>
                </div>
                <input id="file" type="file" onChange={handleOnChange} />
            </label>
            </form>
        )}

        {isFileUploaded && (
            <form className="file-upload-form mx-auto" style={{ zIndex: 9999 }}>
            <label htmlFor="file" className="file-upload-label glass">
                <i
                className="bi bi-x-lg float-right text-xl"
                style={{ cursor: "pointer", fontSize: "20px" }}
                onClick={() => setIsFileUploaded(false)}
                ></i>
                <div className="file-upload-design glass">
                <div className={isUpload ? "installer" : "installer2"}>
                    <label htmlFor="progressLinux">
                    <input id="progressLinux" type="radio" />
                    <span></span>
                    </label>
                </div>
                </div>
            </label>
            </form>
        )}

        {showFiles && (
            <>
            {isWordFile ? (
                console.log("View File")
            ) : (
                // <WordFileViewer setIsWordFile={setIsWordFile} setShowFiles={setShowFiles} file={file} URL={URL.createObjectURL(file)} />
                <>
                <div style={{ width: "100%" }}>
                    <h1 className="text-center" style={{ color: "#E5252A" }}>
                    {isConvert ? "Converted Files" : "Uploaded Files"}
                    </h1>
                </div>

                <div className="file-upload-label mx-auto glass">
                    <i
                    className="bi bi-x-lg float-right text-xl"
                    style={{ cursor: "pointer", fontSize: "20px" }}
                    onClick={() => setShowFiles(false)}
                    ></i>
                    <div className="file-upload-design2 glass">
                    <label className="my-auto" role="button">
                        <form
                        action="/upload"
                        method="post"
                        encType="multipart/form-data"
                        >
                        <div
                            className="file-box"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title="Add File"
                        >
                            <i
                            className="bi bi-plus-circle m-auto"
                            style={{ fontSize: "90px" }}
                            ></i>
                        </div>
                        <input type="file" onChange={handleAddFile} />
                        <input type="submit" value="Upload"></input>
                        </form>
                    </label>

                    {selectedFiles.map((file, index) => (
                        <div
                        className="file-box"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title={file.name}
                        key={index}
                        >
                        <div onClick={() => openFile(file)}>
                            <span className="mx-auto">
                            {getFileIcon(file.type)}
                            </span>
                            <br />
                            <span>{file.name}</span>
                        </div>
                        <button onClick={() => handleRemoveFile(index)}>
                            <i
                            className="bi bi-x-lg float-right text-xl mr-1"
                            style={{ cursor: "pointer", fontSize: "15px" }}
                            ></i>
                        </button>
                        </div>
                    ))}

                    {showProgressbar && (
                        <form
                        className="file-upload-form3"
                        style={{ zIndex: 9999 }}
                        >
                        <label htmlFor="file" className="file-upload-label3 ">
                            <div className="file-upload-design ">
                            <div
                                className={
                                isUpload ? "installer" : "installer2"
                                }
                            >
                                <label htmlFor="progressLinux">
                                <input id="progressLinux" type="radio" />
                                <span></span>
                                </label>
                            </div>
                            </div>
                        </label>
                        </form>
                    )}
                    </div>
                </div>
                </>
            )}
            </>
        )}

        <Docs
            documentList={renderDocuments}
            handleCardClick={handleCardClick}
        />

        {/* Pagination controls */}
        <div className="pagination-controls d-flex justify-content-center mt-5 fixed-bottom">
            <div>
            <button
                className="btn btn-dark mx-2"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <HiArrowLeft />
            </button>
            </div>
            <div>
            <button
                className="btn btn-dark mx-2"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <HiArrowRight />
            </button>
            </div>
        </div>
        {isEditDocModalOpen && selectedCard && (
            <EditDocMainContainer
            templateId={selectedCard.templateId}
            title={selectedCard.title}
            docUrl={form78}
            formFields={selectedCard.formFields}
            isOpen={isEditDocModalOpen}
            closeModal={closeModal}
            />
        )}
        </div>
    </div>
    </div>
);
};

export default Dms;
