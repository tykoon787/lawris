// import React from 'react';
// import SignatureCanvas from 'react-signature-canvas';

// const FormInputFields = ({ formFields, handleFileChange, handleSignatureChange }) => {
//     return (
//         <div className="mb-3">
//             {formFields.map((formField, index) => (
//                 <div className="form-floating mb-3" key={index}>
//                     {formField.type === 'file' && formField.name === 'signatureFile' ? (
//                         <>
//                             <SignatureCanvas
//                                 penColor="black"
//                                 canvasProps={{ id: 'signatureCanvas', className: 'form-control' }}
//                                 onEnd={() => handleSignatureChange('signatureCanvas')}
//                             />
//                             <label htmlFor="signatureCanvas" className="form-label">
//                                 <i className="fas fa-pencil-alt"></i> Capture Signature
//                             </label>
//                         </>
//                     ) : (
//                         <>
//                             <input
//                                 type={formField.type}
//                                 className="form-control"
//                                 placeholder={formField.placeholder}
//                                 id={formField.id}
//                                 name={formField.name}
//                             />
//                             <label htmlFor={formField.id} className="form-label">{formField.name}</label>
//                         </>
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default FormInputFields;