import React from 'react';
import axios from 'axios';


const FormInputFields = ({ formFields }) => {
    return (
        <div className="mb-3">
            {formFields.map((formField, index) => (
                <div className="form-floating mb-3" key={index}>
                    <input type={formField.type} className="form-control" placeholder={formField.placeholder} id={formField.id}></input>
                    <label htmlFor={formField.id} className="form-label">{formField.name}</label>
                </div>
            ))}
            <button className='btn btn-outline-secondary align-self-end' id="print-btn" type="submit">Print</button>
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
    return (
        <form onSubmit={handleSubmit} id="dynamicForm">
            <FormInputFields formFields={formFields} />
        </form>
    )
}

export default DynamicForm