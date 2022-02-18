import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [crypto, setCrypto] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [resize, setResize] = useState(false);
  const [logoResize, setLogoResize] = useState(false);
  const [noMargin, setNoMargin] = useState(false);
  const foc = useRef();
  const ref = useRef();

  const handleChange = (e) => {
    setCrypto(e.target.value);
  };

  useEffect(() => {
    foc.current.focus();
  }, [showSearch]);

  return (
    <nav className='navbar'>
      {/* <div className='nav-center'> */}
      <Link to='/'>
        <h1 className={`logo ${logoResize && 'logo-resize'}`}>Cryptos</h1>
      </Link>

      <div className={`search-container `}>
        <div
          className={`fa-search ${showSearch && 'margin'} ${
            resize && 'resize'
          }`}
          onClick={() => {
            setShowSearch(!showSearch);
            setResize(!resize);
            setNoMargin(!noMargin);
            setLogoResize(!logoResize);
          }}
        >
          <FaSearch size={`${resize ? 20 : 30}`} />
        </div>
        <input
          type='text'
          id='crypto'
          placeholder='Search Cryptos'
          className={`${showSearch && 'show'} ${noMargin && 'no-margin'}`}
          ref={foc}
          value={crypto}
          onChange={handleChange}
          onKeyDownCapture={(e) => {
            if (e.keyCode === 13) {
              ref.current.click();
            }
          }}
        />
        <Link to={`/search/${crypto}`}>
          <button
            className={`btn btn-search ${showSearch && 'show'}`}
            type='button'
            ref={ref}
            onClick={() => setCrypto('')}
          >
            Search
          </button>
        </Link>
      </div>
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
