import React from 'react';
import './styles/Docs.css';
import './styles/Icons.css';

// Icons
// import { EditIcon } from './Icons';
import { SaveIcon } from './Icons';
import { RightIcon } from './Icons';
import { LeftIcon } from './Icons';

// Image
import EditIcon from '../static/icons/docs/icons/writing.png';

// Utilty Functions
import { scrollRight } from '../funcs/utility_functions';
import { scrollLeft } from '../funcs/utility_functions';



// Fetch Common templates from the database
const documentListCivil = [
    { id: 1, title: "Affidavit" },
    { id: 2, title: "Plaint" },
    { id: 3, title: "Notice of Appearance" },
    { id: 4, title: "Statement of Defence" },
    { id: 5, title: "Affidavit of Service" },
    { id: 6, title: "Notice to Produce Documents" },
    { id: 7, title: "Witness Statement" },
    { id: 8, title: "Application Notice" }
]


const DocumentCard = ({ name }) => {
    return (
        <div className="doc-card card col-1" data-bs-toggle="modal" data-bs-target="#edit-modal">
            <div className="card-body doc-body">
                <div className="doc_preview file-name-overlay">
                </div>
            </div>

            <div className="card-footer doc-footer">
                <div className="d-flex justify-content-center align-items-center">
                    <p className="file_name col-7">{name}</p>
                    <SaveIcon className="col-2" />
                    <img className="edit-icon col-2" alt="edit_icon" src={EditIcon} />
                </div>
            </div>
        </div>
    )
}

const DocumentList = ({ documentList }) => {

    return (
        <div className="templates-container">
            <div className="templates d-flex">
                {documentList.map((document) => (
                    <DocumentCard key={document.id} name={document.title} />
                ))}
            </div>
        </div>
    )
}

const handleScrollRight = () => {
    scrollRight('.templates-container', 300)
}

const handleScrollLeft = () => {
    scrollLeft('.templates-container', 300)
}



const Docs = (documentList) => {
    documentList = documentListCivil
    return (
        <div className="docs-container">
            <DocumentList documentList={documentList} />
            <button className="btn" id="scroll_right-button" onClick={handleScrollRight}>
                <RightIcon />
            </button>
            <button className="btn" id="scroll_left-button" onClick={handleScrollLeft}>
                <LeftIcon />
            </button>

        </div>
    )
}

export default Docs