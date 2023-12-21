import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

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
                       {formField.name === "witness_signature" || formField.name === "petitioner_signature" ? (
                            <label htmlFor='file'>
                                <i className="fa-solid fa-signature"></i>
                                <input id="file" name={formField.name} type="file" onChange={handleOnChange} />
                            </label>
                        ) : (
                            formField.name === "witness_signature" && formField.name === "petitioner_signature" && (
                                <>
                                    <label htmlFor='file'>
                                        <i className="fa-solid fa-signature"></i>
                                        <input id="file" name="witness_signature" type="file" onChange={handleOnChange} />
                                    </label>
                                    <label htmlFor='file'>
                                        <i className="fa-solid fa-signature"></i>
                                        <input id="file" name="petitioner_signature" type="file" onChange={handleOnChange} />
                                    </label>
                                </>
                            )
                        )}

                    <label htmlFor={formField.id} className="form-label">{formField.placeholder}</label>
                </div>
                
            ))}
            {/* <button className='btn btn-outline-secondary align-self-end' id="print-btn" type="submit">Print</button> */}
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
            templateId: templateId,
            replacements: {}
        };
        
        requestData['replacements']['templateId'] = templateId;
        formFields.forEach((field) => {
            const fieldName = field.name;
            const fieldValue = formData.get(fieldName);
        
            // Update or add a specific replacement value
            requestData['replacements'][fieldName] = fieldValue; 
        });

        console.log(requestData)

        try {
            const response = await axios.post(`http://127.0.0.1:8000/dms/replacement-data/`, requestData);

            if (response.status === 200) {
                console.log("Success");
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
    
    const handleOnChange = (event) => {
        event.preventDefault();

        const { name, value } = event.target;
        setNewValues({
            ...newValues,
            [name]: value,
        });
    }

    const half = Math.ceil(formFields.length / 2);

    return (
        // <form onSubmit={handleSubmit} id="dynamicForm">
        //     <FormInputFields formFields={formFields} />
        // </form>

    <form className='mt-5' onSubmit={handleSubmit} id="dynamicForm" >
        <Row>
            <Col className="col-6">
              <FormInputFields formFields={formFields.slice(0, half)} handleOnChange={handleOnChange} />
            </Col>
            <Col className="col-6">
              <FormInputFields formFields={formFields.slice(half)} handleOnChange={handleOnChange} />
            </Col>
        </Row>
        <div className="col-12 d-flex justify-content-center align-items-center mt-5">
            <button className='btn btn-outline-secondary' id="print-btn" type="submit">Print</button>
        </div>
    </form>
   );
}

export default DynamicForm