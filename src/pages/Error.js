import React from 'react';

const Error = () => {
  return (
    <section>
      <h1 className='section-header not-found'>Page Not Found</h1>
      <div className='back-home-container'>
        Go to{' '}
        <a href='/' className='back-home-link'>
          homepage
        </a>
      </div>
    </section>
  );
};

export default Error;
