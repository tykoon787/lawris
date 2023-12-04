import { useState } from 'react';
import './styles/Docs.css';
import './styles/Icons.css';

// Icons
// import { EditIcon } from './Icons';
import { SaveIcon } from './Icons';

// Image
import EditIcon from '../static/icons/docs/icons/writing.png';


// Thumbnail example
import Thumbnail from '../static/docs/form_78_thumbnail.png';


// Fetch Common templates from the database

// const documentListCivil = [
//     { id: 1, title: "Affidavit", thumbnail: Thumbnail },
//     { id: 2, title: "Plaint" },
//     { id: 3, title: "Notice of Appearance" },
//     { id: 4, title: "Statement of Defence" },
//     { id: 5, title: "Affidavit of Service" },
//     { id: 6, title: "Notice to Produce Documents" },
//     { id: 7, title: "Witness Statement" },
//     { id: 8, title: "Application Notice" },
//     { id: 9, title: "Interrogatories" },
//     { id: 10, title: "Counterclaim" },
//     { id: 11, title: "Notice of Discontinuance" },
//     { id: 12, title: "Amended Pleading" }
// ];


const DocumentCard = ({ name, documentThumbnail, category_of_law, onClick }) => {
    return (
        <div className="doc-card card col-1" onClick={onClick} data-bs-toggle="modal" data-bs-target="#edit-modal">
            <div className="card-body doc-body">
                <img className="doc_thumbnail file-name-overlay" alt="thumbnail" src={documentThumbnail} />
            </div>

            <div className="card-footer doc-footer">
                <div className="d-flex justify-content-center align-items-center">
                    <p className="file_name col-7">{name}</p>
                    <SaveIcon className="col-2" />
                    <img className="edit-icon col-2" alt="edit_icon" src={EditIcon} />
                </div>
                <div>
                    {/* <p>category_of_law: {category_of_law}</p> */}
                </div>
            </div>
        </div>
    )
}

const DocumentList = ({ documentList, handleCardClick }) => {

    return (
        <div className="templates-container">
            <div className="templates row g-3 justify-content-center">
                {documentList.map((document) => (
                    <DocumentCard 
                        key={document.id} 
                        name={document.title} 
                        documentThumbnail={Thumbnail}
                        category_of_law={document.category_of_law}
                        onClick={() => handleCardClick(document.id)} />
                ))}
            </div>
        </div>
    )
}

const Docs = ({ documentList, handleCardClick }) => {
    return (
        <div className="docs-container">
            <DocumentList documentList={documentList} handleCardClick={handleCardClick} />
        </div>
    )
}

export default Docs