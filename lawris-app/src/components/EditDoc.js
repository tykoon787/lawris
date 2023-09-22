import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import DynamicForm from '../components/DynamicForm';
import './styles/EditDoc.css';

import rightArrow from '../static/icons/svg/right-arrow.svg';
import leftArrow from '../static/icons/svg/left-arrow.svg';


// For react pdf
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

// function PDFViewer() {
//     const [pdfFile, setPdfFile] = useState(docUrl)
//     const pdfContainerStyle = {
//         backgroundColor: 'lightgray',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//     };

//     const handleInputChange = (event) => {
//         console.log("Input Change")    
//     }

//     return (
//         <div style={pdfContainerStyle}>
//             <Document file={pdfFile}>
//                 <Page pageNumber={1} />
//             </Document>
//         </div>
//     )
// }


const EditDoc = ({ docUrl }) => {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function goToPreviousPage() {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }

    function goToNextPage() {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    }

    const pdfContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    return (
        <div className="d-flex">
            <div className="col-6 p-3">
                <div className="document-preview" style={pdfContainerStyle}>
                    <Document file={docUrl} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} />
                    </Document>

                </div>
                {numPages && (
                    <div className="d-flex flex-column justify-content-center">
                        <p className="text-muted text-center">Page {pageNumber} of {numPages}</p>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-outline" onClick={goToPreviousPage} disabled={pageNumber === 1}>
                                <img alt="left_arrow" src={leftArrow} className="page-icon"></img>
                            </button>
                            <button className="btn btn-outline" onClick={goToNextPage} disabled={pageNumber === numPages}>
                                <img alt="right_arrow" src={rightArrow} className="page-icon"></img>
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="col-6 p-3">
                <div className="document-form">
                    <DynamicForm />
                </div>
            </div>
        </div >
    )
}

const EditDocMainContainer = ({ docUrl }) => {
    return (
        <div className="modal fade" id="edit-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-center">Editting File: </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <EditDoc docUrl={docUrl} />
                    </div>

                </div>
            </div>
        </div >
    )
}

export default EditDocMainContainer
