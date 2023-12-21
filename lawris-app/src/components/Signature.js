// import React, { useState, useRef } from 'react';
// import Popup from 'reactjs-popup';
// import SignaturePad from 'react-signature-canvas';

// function Signature() {
//     const [ImageURL, setImageURL] = useState(null);
 
//     const sigCanvas = useRef({});
//     const clear = () => sigCanvas.current.clear();
//     const save = () => 
//         setImageURL(sigCanvas.current.getTrimedCanvas().toDataURL('image/png')
//         );

//     return (
//         <div className='Signature'>
//             <h1>Signature Pad</h1>
//             <Popup 
//                 modal 
//                 trigger={<button>Open Signature Pad</button>}
//                 closeOnDocumentClick={false}
//             >
//                 {close => (
//                     <>
//                         <SignaturePad 
//                             ref={sigCanvas}
//                         />
//                         <button onClick={save}>close</button>
//                         <button onClick={clear}>close</button>
//                         <button onClick={close}>close</button>
//                     </>
//                 )}
//             </Popup>
//             <br />
//             <br />
//             {ImageURL ? (
//                 <img
//                     src={ImageURL}
//                     alt='my signature'
//                     style={{
//                         display: 'block',
//                         margin: '0 auto',
//                         border:'1px solid black',
//                         width: '150px'
//                     }}
//                 />
//             ) : null}
//         </div>
//     );
// }

// export default Signature;