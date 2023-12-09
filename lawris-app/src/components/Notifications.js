import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

function getTimeDifference(time) {
   const now = new Date();
   const notificationTime = new Date(time);
   const differenceInSeconds = Math.floor((now - notificationTime) / 1000);
   const minutes = Math.floor(differenceInSeconds / 60);
   return `${minutes} ${minutes === 0 || minutes === 1 ? "min" : "mins"} ago`;
}

function Notifications({ time, fileName }) {
    const [show, setShow] = useState(true);
 return (
   <ToastContainer className='myToastContainer'>
       <Toast className="glass" onClose={() => setShow(false)} show={show} delay={3000} autohide>
       <Toast.Header >
           <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
           <strong className="me-auto">Notification</strong>
           <small>{getTimeDifference(time)}</small>
       </Toast.Header>
       <Toast.Body >{fileName} uploaded successfully.</Toast.Body>
       </Toast>
   </ToastContainer>
 );
}

export default Notifications;