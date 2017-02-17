import React from 'react';
import {Link} from 'react-router';
import '../styles/about-page.css';

const AboutPage = () => {
  return (
    <div>
      <div className="flex-container" style={{
        "marginLeft": "24px",
      }}>
        <h1>About</h1>
        <p>React-like-or-not is a simple React app that shows a list of media and you can put them into favorites and trash.</p>
      </div>
    </div>
  );
};

export default AboutPage;
