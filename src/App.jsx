import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'normalize.css';

import Authentication from './routes/auth/Authentication';
import Dashboard from './routes/dashboard/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      axios.post('http://localhost:8000/api/auth/', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        setIsLoggedIn(true);
        setUserUsername(response.data.username);
      })
      .catch((error) => {
        console.error("Auth error:", error);
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
      });
    }
  }, []);

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard 
          userUsername={userUsername} 
          setIsLoggedIn={setIsLoggedIn} 
        />
      ) : (
        <Authentication 
          setIsLoggedIn={setIsLoggedIn} 
          setUserUsername={setUserUsername} 
        />
      )}
    </div>
  );
}

export default App;