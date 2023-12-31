import React from 'react';
// Routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import SelectUser from './components/SelectUser';
import Dms from './components/Dms';
import FileNewCase from './components/FileNewCase';
import FileManager from './components/FileManager';
import Auth from './components/Auth';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SelectUser />} />
        <Route exact path="/dms_dashboard" element={<Dms />} />
        <Route exact path="/file_new_case" element={<FileNewCase />} />
        <Route exact path="/file_manager" element={<FileManager />} />
        <Route exact path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
