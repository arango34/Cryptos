import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCoins = async () => {
    try {
      const resp = await axios.get('https://kaa-crypto.herokuapp.com/api');
      setCryptos(resp.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {}, []);

  if (isLoading) {
    return <h1 className='loading'>Loading...</h1>;
  }

  if (!cryptos || cryptos.length < 1) {
    return <h1 className='loading not-found'>Oops! Something went wrong</h1>;
  }

  return (
    <main>
      <h2 className='header section-header header-home'>Top 100 Cryptos</h2>
      <section className='list-section'>
        <div className='coins-list-container'>
          <div className='list-row top-row top-row-coin'>
            <p className='number hash'>#</p>
            <p className='right'>Coin</p>
          </div>
          {cryptos.map((item, i) => {
            const { id, symbol, name, image } = item;

            return (
              <div key={i} className='list-row list-row-coin'>
                <div className='number'>{i + 1}</div>
                <Link to={`/cryptocurrency/${id}`}>
                  <div className='names'>
                    <img src={image} alt='' className='img-list' />
                    <span className='big'>{name}</span>
                  </div>
                </Link>
                <span className='small'>{symbol.toUpperCase()}</span>
              </div>
            );
          })}
        </div>
        <div className='scroll'>
          <div className='list-container'>
            <div className='list-row top-row'>
              <div className='container container-top price-container'>
                Price
              </div>
              <div className='container container-top 24h-container'>24h</div>
              <div className='container container-top volume-container'>
                24h Volume
              </div>
              <div className='container container-top market-cap-container'>
                Mkt Cap
              </div>
            </div>
            {cryptos.map((item, i) => {
              const {
                current_price,
                market_cap,
                total_volume,
                price_change_percentage_24h: change,
              } = item;

              let num;

              if (current_price.toString().includes('e')) {
                const arr = current_price.toString().split('');
                if (arr[arr.length - 3] === '-') {
                  const strVal = current_price.toString();
                  console.log(strVal.slice(strVal.length - 2));
                  num = strVal.slice(strVal.length - 2);
                } else {
                  let val;
                  val = arr[arr.length - 1];
                  num = Number(val) + 3;
                }
              }

              const check = current_price.toString().split('.')[1];

              return (
                <div key={i} className='list-row'>
                  <div className='container price-container'>
                    $
                    {current_price.toString().includes('e')
                      ? current_price.toFixed(num)
                      : current_price < 1
                      ? current_price
                      : check &&
                        check.slice(0, 2) === '00' &&
                        current_price.toString().split('.')[0] === '1'
                      ? '1.00'
                      : check && check < 10 && check.length === 1
                      ? `${Number(current_price).toLocaleString()}0`
                      : !current_price.toString().includes('.')
                      ? `${Number(
                          current_price.toFixed(2)
                        ).toLocaleString()}.00`
                      : check && check.slice(0, 1) === '0'
                      ? current_price.toLocaleString()
                      : Number(current_price.toFixed(2)).toLocaleString()}
                  </div>
                  <div
                    className={`container 24h-container ${
                      change && change.toString().includes('-')
                        ? 'isDown'
                        : 'isUp'
                    }`}
                  >
                    {change && change.toFixed(1)}%
                  </div>
                  <div className='container volume-container'>
                    ${Number(total_volume).toLocaleString()}
                  </div>
                  <div className='container market-cap-container'>
                    ${Number(market_cap).toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
