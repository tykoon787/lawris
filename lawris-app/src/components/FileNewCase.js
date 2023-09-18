import React from 'react';

import civilIcon from '../static/icons/svg/war.svg';
import criminalIcon from '../static/icons/svg/cuffs.svg';

// Styles
import './styles/FileNewCase.css';
// Comoonenets
import Docs from './Docs';

import { SendIcon } from './Icons';
import { PrinterIcon } from './Icons';

const categories = [
    { id: 1, name: "Criminal", icon: criminalIcon },
    { id: 2, name: "Civil", icon: civilIcon }

]

const Category = ({ categoryCardId, categoryName, categoryIcon }) => {
    //categoryCardId = categoryName
    return (
        <div className="card col-2 category-card" id={categoryCardId}>
            <div className="card-body">
                <div className="d-flex flex-column align-items-center">
                    <img alt={categoryName} src={categoryIcon} className="category-icon" />
                    <p className="lead fw-bold text-center mt-1 mb-0">{categoryName}</p>
                </div>
            </div>
        </div >
    )
}

const FileNewCase = ({ categories }) => {
    return (
        <div className="file_new_case-container d-flex justify-content-center g-3">
            {categories.map((category) => (
                <Category key={category.id}
                    categoryCardId={category.name}
                    categoryName={category.name}
                    categoryIcon={category.icon} />
            ))}
        </div>
    )
}


const FileNewCaseMainContainer = () => {
    return (
        <div className="container d-flex flex-column justify-content-center mt-4">
            <div className="card">
                <div className="card-header">
                    <h2 className="fw-bold text-center">Category of Law</h2>
                </div>

                <div className="card-body">
                    <FileNewCase categories={categories} />

                    {/* Divisor */}
                    <div className="d-flex justify-content-center divisor">
                        <div className="col-4"><hr className="ruler fw-bold"></hr></div>
                        <p className="col-2 text-center fw-bold">Or</p>
                        <div className="col-4"><hr className="ruler"></hr></div>
                    </div>


                    <div className="card about_case-container">
                        <div className="card-header">
                            <p className="lead fw-bold text-center mb-0">Tell me what the case is about</p>
                        </div>

                        <div className="card-body">
                            <div className="form-floating">
                                <textarea className="form-control about-case_input" placeholder="Tell me what the case is about" id="about_case-input" style={{ height: '100px' }}></textarea>
                                {/* <label htmlFor="about_case-input">What's the case about</label> */}
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-outline-secondary align-items-end"><SendIcon /></button>
                            </div>

                            <div className="generated_documents-container">
                                {/* Divisor */}
                                <div className="d-flex justify-content-center divisor">
                                    <div className="col-4"><hr className="ruler fw-bold"></hr></div>
                                    <p className="col-3 text-center fw-bold">GENRATED DOCUMENTS</p>
                                    <div className="col-4"><hr className="ruler"></hr></div>
                                </div>
                                <Docs />

                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-outline-secondary">
                                        <PrinterIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div >
    )
}

export default FileNewCaseMainContainer
