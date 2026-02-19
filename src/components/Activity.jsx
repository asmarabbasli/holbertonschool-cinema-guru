import React from 'react';
import './components.css';

const Activity = ({ activity }) => {
  // Figma dizaynına uyğun olaraq cümləni formatlayırıq
  // Nümunə: "User added Inception to favorites"
  const { user, action, movie, date } = activity;

  return (
    <li className="activity-item">
      <p>
        <b>{user}</b> {action} <b>{movie}</b> - <span>{date}</span>
      </p>
    </li>
  );
};

export default Activity;