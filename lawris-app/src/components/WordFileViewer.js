import React, { Component } from 'react';
import FileViewer from 'react-file-viewer';

const WordFileViewer = ({ URL, file, setIsWordFile, setShowFiles  }) => {
 const onError = (e) => {
   console.logError(e, 'error in file-viewer');
 };

 return (
   <div className="h-auto bg-white mx-auto" style={{width: '80%'}}>
        <i className="bi bi-x-lg float-right text-xl mr-2" style={{cursor: 'pointer', fontSize: '20px'}} onClick={() => setIsWordFile(false) && setShowFiles(true)}></i>
        <h4 className='text-sm' style={{margin: '70px'}}>{file.name}</h4>
        {file.type.includes('pdf') ? (
            <FileViewer
                fileType="pdf"
                filePath={URL}
                onError={onError}
            />
        ) : (
        <FileViewer
        fileType="docx"
        filePath={URL}
        onError={onError}
        />
     ) }
    </div>
 );
};

export default WordFileViewer;
