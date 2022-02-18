import React, { useState, useEffect, useCallback } from 'react';
import CoinHeader from '../components/CoinHeader';
import MarketData from '../components/MarketData';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleCrypto = () => {
  const { id } = useParams();
  const [crypto, setCrypto] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getCrypto = useCallback(async () => {
    try {
      const data = await axios.get(
        `https://kaa-crypto.herokuapp.com/api/${id}`
      );
      setCrypto(data.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    getCrypto();
  }, [getCrypto]);

  if (isLoading) {
    return <h1 className='loading'>Loading...</h1>;
  }

  if (!crypto || crypto === '' || crypto.error) {
    return (
      <section>
        <h1 className='section-header not-found'>Oops! Something went wrong</h1>
        <div className='back-home-container'>
          Go to{' '}
          <a href='/' className='back-home-link'>
            homepage
          </a>
        </div>
      </section>
    );
  }
  const { market_data } = crypto;
  return (
    <main className='single-crypto-main'>
      <CoinHeader crypto={crypto} />
      <MarketData market_data={market_data} />
    </main>
  );
};

export default SingleCrypto;
