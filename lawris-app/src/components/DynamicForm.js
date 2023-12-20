import React, { useState } from 'react';
import axios from 'axios';
// import SignatureCanvas from 'react-signature-canvas';
// import Signature from './Signature';


const FormInputFields = ({ formFields }) => {
    console.log('formFields:', formFields);

    return (
        <div className="mb-3">
            {formFields.map((formField, index) => (
                <div className="form-floating mb-3" key={index}>
                    <input type={formField.type} className="form-control" placeholder={formField.placeholder} id={formField.id}></input>
                    <label htmlFor={formField.id} className="form-label">{formField.name}</label>
                </div>
                
            ))}
        </div>
    )
}

const DynamicForm = ({ templateId, formFields }) => {

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const requestData = {}
        formFields.forEach((field) => {
            const fieldName = field.name;
            const fieldValue = formData.get(fieldName);

            requestData["templateId"] = templateId
            requestData[fieldName] = fieldValue;
        })
        console.log(requestData)

        try {
            const response = await axios.post(`http://127.0.0.1:8000/dms/api/templates/print/`, formData);

            if (response.status === 200) {
                console.log("Success");
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }


    }

    const hasSignatureField = formFields.some((field) => field.type === 'Witness Signature');

    const halfLength = formFields.length / 2;
    const firstColumnFields = formFields.slice(0, halfLength);
    const secondColumnFields = formFields.slice(halfLength);

    return (
        <div className="row mt-5">
            <div className="col-6">
                <form onSubmit={handleSubmit} id="dynamicForm">
                    <FormInputFields formFields={firstColumnFields} />
                    
                </form>
            </div>
            <div className="col-6">
                <form onSubmit={handleSubmit} id="dynamicForm">
                    <FormInputFields formFields={secondColumnFields} />
                    
                </form>
            </div>
                <div className="col-12 d-flex justify-content-center align-items-center mt-5">
                    <button className='btn btn-outline-secondary' id="print-btn" type="submit">Print</button>
                </div>
            </div>
    );
    // return (
    //     <form onSubmit={handleSubmit} id="dynamicForm">
    //         <FormInputFields formFields={formFields} />
    //     </form>
    // )
}

export default DynamicForm