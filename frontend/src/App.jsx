// File: src/App.jsx
// --- MODIFIED ---
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast'; // Import Toaster
import './style/main.css'; // Import the CSS file

function App() {
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          // Define default options
          duration: 5000,
        }}
      />
      <Navbar />
      <hr />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;