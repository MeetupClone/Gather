import React from 'react';

import './email.css';

const Email = () => {
  return (
    <div>
      <a
        href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site http://www.website.com."
        title="Share by Email">
        <img
          src="https://www.genbook.com/blog/wp-content/uploads/2014/09/email.png"
          className="email-pic"
          alt="email"
        />
      </a>
    </div>
  );
};

export default Email;
