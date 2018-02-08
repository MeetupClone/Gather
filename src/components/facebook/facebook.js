import React from 'react';

import './facebook.css';

const Facebook = () => {
  return (
    <div
      data-href="https://developers.facebook.com/docs/plugins/"
      data-layout="button"
      data-size="large"
      data-mobile-iframe="true">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://gather.petermiles.io">
        <img
          alt="facebook logo"
          className="facebook-styling"
          src={require('./share-facebook.png')}
        />
      </a>
    </div>
  );
};

export default Facebook;

