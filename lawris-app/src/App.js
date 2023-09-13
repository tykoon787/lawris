import React from 'react';
// Routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import SelectUser from './components/SelectUser';
import Dms from './components/Dms';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SelectUser />} />
        <Route exact path="/dms_dashboard" element={<Dms />} />
      </Routes>
    </Router>
  );
}

export default App;
