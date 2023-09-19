import React from 'react';
import './styles/FileManager.css';
import $ from 'jquery';

// Icons
import {
    TrashIcon,
    SettingsIcon,
    PrinterIcon,
    FolderIcon,
    UserIcon,
    FolderPlusIcon,
    DocumentIcon,
    Cloud
} from '../components/Icons';

import folderSvg from '../static/icons/file_manager/icons/folder.png';
import balance from '../static/icons/balance.png';

const items = [
    { id: 1, name: "Logo", icon: UserIcon },
    { id: 2, name: "Printer", icon: PrinterIcon },
    { id: 3, name: "Trash", icon: TrashIcon },
    { id: 4, name: "Folder", icon: FolderIcon },
    { id: 5, name: "Settings", icon: SettingsIcon }
]

const foldersAndFiles = [
    {
        id: 1, name: "Folder 1", children: [
            { id: 2, name: "File 1.txt", children: [] },
            { id: 3, name: "File 2.txt", children: [] },
            {
                id: 4, name: "SubFolder 1", children: [
                    { id: 5, name: "File3.txt", children: [] },
                    { id: 6, name: "File4.txt", children: [] },
                ]
            },
        ]
    },
    {
        id: 7, name: "Folder 2", children: [
            { id: 8, name: "File5.txt", children: [] },
            { id: 9, name: "File6.txt", children: [] },
            {
                id: 10, name: "SubFolder 2", children: [
                    { id: 11, name: "File7.pdf", children: [] },
                    { id: 12, name: "File8.pdf", children: [] }
                ]
            }
        ]
    }
]

const folders = [
    { id: 1, name: "Civil" },
    { id: 2, name: "Criminal" },
    { id: 3, name: "Arbitration" },
    { id: 4, name: "Succession" },
    { id: 5, name: "Land" }
]

const recentFiles = [
    { id: 1, name: 'Plaint', members: 'Mwanaisha Mwangi, Kwame Nkrumah', lastModified: '2023-09-15' },
    { id: 2, name: 'Affidavit', members: 'Fatoumata Diop, Chukwuma Eze', lastModified: '2023-09-14' },
    { id: 3, name: 'Witness Statement', members: 'Ngozi Okonjo-Iweala, Kwadwo Mensah', lastModified: '2023-09-13' },
    { id: 4, name: 'Legal Brief', members: 'Aïssatou Diallo, Thabo Mbeki', lastModified: '2023-09-12' },
    { id: 5, name: 'Contract Document', members: 'Oluwafemi Adeyemi, Nneka Onyeka', lastModified: '2023-09-11' },
    { id: 6, name: 'Court Order', members: 'Kwabena Amoako, Amina Ndiaye', lastModified: '2023-09-10' },
    { id: 7, name: 'Legal Research Notes', members: 'Nneka Eze, Ahmed Mansour', lastModified: '2023-09-09' },
    { id: 8, name: 'Client Agreement', members: 'Sekou Traoré, Zainab Abubakar', lastModified: '2023-09-08' },
    { id: 9, name: 'Case Briefing', members: 'Amina Kamara, Olufemi Okeke', lastModified: '2023-09-07' },
    { id: 10, name: 'Court Hearing Transcript', members: 'Nkosazana Dlamini-Zuma, Mohamed Diop', lastModified: '2023-09-06' },
    { id: 11, name: 'Legal Opinion', members: 'Chinwe Nwosu, Ahmed Abdelaziz', lastModified: '2023-09-05' },
    { id: 12, name: 'Client Correspondence', members: 'Sadio Toure, Fadila Cissé', lastModified: '2023-09-04' },
    { id: 13, name: 'Expert Witness Report', members: 'Amara Diallo, Ifeoma Eze', lastModified: '2023-09-03' },
    { id: 14, name: 'Court Judgment', members: 'Kwaku Asante, Aisha Bello', lastModified: '2023-09-02' },
    { id: 15, name: 'Legal Memo', members: 'Folake Adeyemi, Issa Traoré', lastModified: '2023-09-01' },
];

const SideBarItem = ({ sideBarItemId, sideBarItemName, SideBarItemIcon }) => {
    return (
        <div className="side_bar-icon" id={sideBarItemName}>
            <SideBarItemIcon />
        </div>
    )
}

const SideBar = ({ sideBarItems }) => {
    return (
        <div className="side_bar d-flex flex-column align-items-center">
            {sideBarItems.map((sideBarItem) => (
                <SideBarItem key={sideBarItem.id} sideBarItemId={sideBarItem.name} sideBarItemName={sideBarItem.name} SideBarItemIcon={sideBarItem.icon} />
            ))}
        </div>
    )
}

const SideNav = () => {
    return (
        <nav id="sideNav" className="side-nav h-100 flex-column align-items-stretch">
            <nav className="nav nav-pills flex-column">
                <a className="nav-link active" href="/file_manager"><span className="side_nav-icon"><FolderIcon /></span>Files</a>
                <a className="nav-link" href="/file_manager"><span className="side_nav-icon"><PrinterIcon /></span>Printer</a>
                <a className="nav-link" href="/file_manager"><span className="side_nav-icon"><TrashIcon /></span>Trash</a>
            </nav>
        </nav>
    )
}

const ExpandedSideBar = () => {
    return (
        <div className="expanded_sidebar-container">
            <div className="expanded_sidebar d-flex flex-column justify-content-center">
                <div className="logo-container d-flex justify-content-center">
                    <img alt="balance" src={balance} className="dev_icon"></img>
                    <h3>Lawris</h3>
                </div>
                <div className="active_storage-container">
                    <ActiveStorage />
                </div>

                <div className="side_nav-container">
                    <SideNav />
                </div>
            </div>
        </div>
    )
}

const TreeNode = ({ item }) => {
    const hasChildren = item.children && item.children.length > 0;
    return (
        <li key={item.id}>
            {hasChildren ? (
                <FolderPlusIcon />
            ) : (
                <DocumentIcon />
            )}
            <span className={hasChildren ? 'folder' : 'file'}>{item.name}</span>
            {hasChildren && (
                <ul>
                    {item.children.map((child) => (
                        <TreeNode key={child.id} item={child} />
                    ))}
                </ul>
            )}
        </li>
    )
}

const TreeView = ({ folders }) => {
    return (
        <ul className="file-tree">
            {folders.map((folder) => (
                <TreeNode key={folder.id} item={folder} />
            ))}
        </ul>
    )
}

// Functions to make tree view interactive
$(function () {
    $(".file-tree ul").hide();

    $(".folder").on('click', function () {
        $(this).siblings("ul").toggle();
    })
})

const ActiveStorage = () => {
    return (
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span className="side_nav-icon"><Cloud /></span>One Drive
            </button>

            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/file_manager">G-Drive</a></li>
                <li><a className="dropdown-item" href="/file_manager">G-Drive</a></li>
                <li><a className="dropdown-item" href="/file_manager">G-Drive</a></li>
            </ul>
        </div>
    )
}
const Explorer = () => {
    return (
        <div className="d-flex flex-column">
            <h3 className="fw-bold">Explorer</h3>
            <ActiveStorage />
            <TreeView folders={foldersAndFiles} />
        </div>
    )
}

const Folders = ({ folders }) => {
    return (
        <div className="row g-3">
            {folders.map((folder) => (
                <div key={folder.id} className="col card folder-card">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                        <img alt="Folder" src={folderSvg} className="folder-icon"></img>
                        <p className="fw-bold">{folder.name}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

const RecentFilesTable = ({ recentFiles }) => {
    return (
        <div className="recent_files-table">
            <h3 className="fw-bold">Recent Files</h3>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Members</th>
                        <th>Last Modified</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="recent_files-tbody">
                    {recentFiles.map((file, index) => (
                        <tr key={index}>
                            <td>
                                <div className="file-info d-flex">
                                    <DocumentIcon />
                                    <div className="file-name">{file.name}</div>
                                </div>
                            </td>
                            <td>{file.members}</td>
                            <td>{file.lastModified}</td>
                            <td><i className="bi bi-three-dots"></i></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const StorageManager = () => {
    return (
        <div className="storage-manager">
            <h3>Storage</h3>
            <hr></hr>
        </div>
    )
}

const DocumentContainer = ({ folders }) => {
    return (
        <div className="document-container d-flex flex-column">
            <h3 className="fw-bold">Folders</h3>
            <hr></hr>
            <div className="folders_display-container d-flex">
                <Folders folders={folders} />
            </div>
            <hr></hr>
            <RecentFilesTable recentFiles={recentFiles} />
        </div>
    )
}

const FileManager = () => {
    return (
        <div className="file_manager-container d-flex">
            <div className="main_side_bar-container d-flex">
                <ExpandedSideBar />
            </div>
            <div>
                <DocumentContainer folders={folders} />
            </div>
            <div className="storage_manager-container">
                <StorageManager />
            </div>
        </div>
    )
}

export default FileManager;
