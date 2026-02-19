import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './navigation.css';
import Activity from '../Activity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faClock } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
  const [selected, setSelected] = useState("home");
  const [small, setSmall] = useState(true);
  const [activities, setActivities] = useState([]);
  const [showActivities, setShowActivities] = useState(false);

  const navigate = useNavigate();

  const setPage = (pageName) => {
    setSelected(pageName);
    switch (pageName) {
      case "Home":
        navigate('/home');
        break;
      case "Favorites":
        navigate('/favorites');
        break;
      case "Watch Later":
        navigate('/watchlater');
        break;
      default:
        navigate('/home');
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    axios.get('http://localhost:8000/api/activity', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then((response) => {
      setActivities(response.data);
    })
    .catch((error) => {
      console.error("Activity fetch error:", error);
    });
  }, []);

  return (
    <nav className={`sidebar ${small ? 'small' : ''}`}>
      <ul className="navigation-menu">
        <li onClick={() => setPage("Home")} className={selected === "home" ? "active" : ""}>
          <FontAwesomeIcon icon={faHome} />
          {!small && <span>Home</span>}
        </li>
        <li onClick={() => setPage("Favorites")} className={selected === "favorites" ? "active" : ""}>
          <FontAwesomeIcon icon={faHeart} />
          {!small && <span>Favorites</span>}
        </li>
        <li onClick={() => setPage("Watch Later")} className={selected === "watchlater" ? "active" : ""}>
          <FontAwesomeIcon icon={faClock} />
          {!small && <span>Watch Later</span>}
        </li>
      </ul>

      <ul className="activity-list">
        {activities.slice(0, 10).map((activity, index) => (
          <Activity key={index} activity={activity} />
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;