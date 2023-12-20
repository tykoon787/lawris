import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import SignatureCanvas from 'react-signature-canvas';
// import Signature from './Signature';

const FormInputFields = ({ formFields, handleOnChange}) => {
    console.log('formFields:', formFields);

    return (
        <div className="mb-3">
            {formFields.map((formField, index) => (
                <div className="form-floating mb-3" key={index}>
                    <input 
                        type={formField.type} 
                        className="form-control" 
                        placeholder={formField.placeholder} 
                        id={formField.id} 
                        name={formField.name} 
                        onChange={handleOnChange}></input>
                    <label htmlFor={formField.id} className="form-label">{formField.placeholder}</label>
                </div>
                
            ))}
            <button className='btn btn-outline-secondary align-self-end' id="print-btn" type="submit">Print</button>
        </div>
    )
}

const DynamicForm = ({ templateId, formFields }) => {

    const [newValues, setNewValues] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        // const requestData = {}
        // formFields.forEach((field) => {
        //     const fieldName = field.name;
        //     const fieldValue = formData.get(fieldName);

        //     requestData["templateId"] = templateId;
        //     requestData["replacements"] = {};
        //     requestData['replacements'][fieldName] = fieldValue; 
        // })
        const requestData = {
            template_id: templateId,
            replacements: {}
        };
        
        formFields.forEach((field) => {
            const fieldName = field.name;
            const fieldValue = formData.get(fieldName);
        
            // Update or add a specific replacement value
            requestData['replacements'][fieldName] = fieldValue; 
        });

        console.log(requestData)

        try {
            const response = await axios.post(`http://127.0.0.1:8000/dms/replacement-data/`, formData);

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
    const handleOnChange = (event) => {
        event.preventDefault();

        const { name, value } = event.target;
        setNewValues({
            ...newValues,
            [name]: value,
        });
    }

    // return (
    //     <div className="row mt-5">
    //         <div className="col-6">
    //             <form onSubmit={handleSubmit} id="dynamicForm">
    //                 <FormInputFields formFields={firstColumnFields} handleOnChange={handleOnChange} />
                    
    //             </form>
    //         </div>
    //         <div className="col-6">
    //             <form onSubmit={handleSubmit} id="dynamicForm">
    //                 <FormInputFields formFields={secondColumnFields} handleOnChange={handleOnChange} />
                    
    //             </form>
    //         </div>
    //             <form>
    //                 <div className="col-12 d-flex justify-content-center align-items-center mt-5">
    //                     <button className='btn btn-outline-secondary' id="print-btn" type="submit">Print</button>
    //                 </div>
    //             </form>
    //         </div>
    // );
    return (
        // <form onSubmit={handleSubmit} id="dynamicForm">
        //     <FormInputFields formFields={formFields} />
        // </form>

    <form onSubmit={handleSubmit} id="dynamicForm" style={{ display: 'flex', flexWrap: 'wrap' }}>
        <FormInputFields formFields={formFields} style={{ flexBasis: '50%', marginRight: '10px' }} />
    </form>

    )
}

export default DynamicForm