import React from 'react';

const Search = () => {
  return (
    <section>
      <h1 className='section-header not-found'>
        Cannot Run Search: Please Provide Value
      </h1>
      <div className='back-home-container'>
        Go to{' '}
        <a href='/' className='back-home-link'>
          homepage
        </a>
      </div>
    </section>
  );
};

export default Search;
