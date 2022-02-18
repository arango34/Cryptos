import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FindCrypto = () => {
  const { id } = useParams();
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getData = useCallback(async () => {
    try {
      const data = await axios.get(
        `https://kaa-crypto.herokuapp.com/api/search/${id}`
      );
      setResults(data.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (isLoading) {
    return <h1 className='loading'>Loading...</h1>;
  }

  if (!results) {
    return (
      <section>
        <h1 className='section-header not-found'>Cannot Run Search</h1>
        <div className='back-home-container'>
          Go to{' '}
          <a href='/' className='back-home-link'>
            homepage
          </a>
        </div>
      </section>
    );
  }

  if (results.length < 1 || results.length === 100) {
    return (
      <section>
        <h1 className='section-header not-found'>
          No Cryptos Match Your Search
        </h1>
        <div className='back-home-container'>
          Go to{' '}
          <a href='/' className='back-home-link'>
            homepage
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className='result-section'>
      <div className='search-result-container'>
        <h2 className='section-header search-header'>Search Results:</h2>
        {results.map((item, i) => {
          const { id, symbol, name, image, market_cap_rank: rank } = item;
          return (
            <Link key={i} to={`/cryptocurrency/${id}`}>
              <div className='result-row'>
                <div className='result-name-container'>
                  <div className='name-search-container'>
                    <img src={image} className='img-list img-search' alt='' />
                    <span className='name-search'>{name}</span>
                  </div>

                  <span className='result-symbol'>
                    ({symbol.toUpperCase()})
                  </span>
                </div>
                <div className='market-rank'>
                  {rank === null ? (
                    <div className='no-rank'>Unranked</div>
                  ) : (
                    `#${rank}`
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default FindCrypto;
