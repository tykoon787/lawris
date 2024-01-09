import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Popup from "reactjs-popup";
import SignaturePad from 'react-signature-canvas';
import SignatureCanvas from 'react-signature-canvas'


const FormInputFields = ({ formFields, handleOnChange }) => {
    console.log('formFields:', formFields);

    const SignatureFormField = () => {
        const sigCanvas = React.useRef({});
       
        const clear = () => sigCanvas.current.clear();
        const save = () => sigCanvas.current.saveImage();
       
        return (
          <div>
            {/* <Popup
            className='bg-black'
            modal
            trigger={<button>Open Signature Pad</button>}
            >
                <SignaturePad />
            </Popup> */}
            <SignatureCanvas ref={sigCanvas} canvasProps={{width: 500, height: 50}} />
            <button onClick={clear}>Clear</button>
            <button onClick={save}>Save</button>
          </div>
        );
       };

    return (
        <div className="mb-3">
            {formFields.map((formField, index) => (
                <div className="form-floating mb-3" key={index}>
                    <input 
                        type={formField.text} 
                        className="form-control" 
                        placeholder={formField.placeholder} 
                        id={formField.id} 
                        name={formField.name} 
                        onChange={handleOnChange}
                    />
                    {formField.placeholder === 
"Enter Petitioner Signature" ? (
                        <SignatureFormField />
                        // <>
                        //  <label htmlFor={`file_${formField.name}`}>
                        //         <i className="fa-solid fa-signature"></i>
                        //         <input id={`file_${formField.name}`} name={formField.name} type="type" onChange={handleOnChange} />
                        //     </label>
                        //     <p>enter signature here</p>
                        //     <Popup
                        //     modal
                        //     trigger={<button>Open Signature Pad</button>}
                        //     >
                        //         <SignaturePad />
                        //     </Popup>
                        //     {signatureImage && (
                        //         <img
                        //             src={URL.createObjectURL(signatureImage)}
                        //             alt="Petitioner Signature"
                        //             style={{ maxWidth: '100%', maxHeight: '200px' }}
                        //         />
                        //     )}
                        // </>
                    ) : (
                        <></>
                    )}
                    <label htmlFor={formField.id} className="form-label">{formField.placeholder}</label>
                </div>
            ))}
        </div>
    );
};


const DynamicForm = ({ templateId, formFields }) => {

    const [newValues, setNewValues] = useState({});
    // const [signatureImage, setSignatureImage] = useState(null);

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
        
        requestData['templateId'] = templateId;
        formFields.forEach((field) => {
            const fieldName = field.name;
            const fieldValue = formData.get(fieldName);
        
            // Update or add a specific replacement value
            requestData['replacements'][fieldName] = fieldValue; 
        });

        console.log(requestData)

        try {
            const response = await axios.post(`http://127.0.0.1:8000/dms/replacement-data/`, requestData, { responseType: 'arraybuffer' });

            if (response.status === 200) {
            const url = window.URL.createObjectURL(new Blob([response.data], {type: response.headers['content-type']}));
            const link = document.createElement('a');

            // Extract filename from Content-Disposition header
            const contentDisposition = response.headers['content-disposition'];
            let filename = '';
            if (contentDisposition) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)*/;
                const matches = filenameRegex.exec(contentDisposition);
                if (matches != null && matches[1]) { 
                    filename = matches[1].replace(/['"]/g, '');
                }
            }

            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            }



        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
    
    const handleOnChange = (event) => {
        event.preventDefault();
        const { name, value, type, files } = event.target;
    
        // if (type === 'file' && files.length > 0) {
        //     Handle file input (e.g., signature image)
        //     setSignatureImage(files[0]);
        // } else {
            // Handle other input fields
            setNewValues({
                ...newValues,
                [name]: value,
            });
    };

    const half = Math.ceil(formFields.length / 2);

    return (
        // <form onSubmit={handleSubmit} id="dynamicForm">
        //     <FormInputFields formFields={formFields} />
        // </form>

    <form className='mt-5' onSubmit={handleSubmit} id="dynamicForm" >
        <Row>
            <Col className="col-6">
              <FormInputFields formFields={formFields.slice(0, half)} handleOnChange={handleOnChange}  />
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