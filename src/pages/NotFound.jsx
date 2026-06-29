import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

// ⭐ Not Found Görseli
import NotFoundImg from '../assets/notfound.png';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        
        {/* ⭐ Görsel */}
        <img 
          src={NotFoundImg} 
          alt="Page Not Found" 
          className="not-found-image" 
        />
        
        {/* ⭐ Pixel Font ile "Page Not Found" */}
        <h1 className="not-found-title">PAGE NOT FOUND</h1>
        
        {/* ⭐ Ana Sayfa Linki */}
        <Link to="/" className="not-found-home">
           HOME ⭐
        </Link>
        
      </div>
    </div>
  );
};

export default NotFound;