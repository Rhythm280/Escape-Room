import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import { Toaster } from 'react-hot-toast';
import './style/main.css';

function App() {
  return (
    <div>
      <div className="background-animation"></div>
      <Toaster position="top-center" />
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;