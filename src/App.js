// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/singnup" element={<SignUpForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
