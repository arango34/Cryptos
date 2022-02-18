import React, { useState, useEffect, useRef } from 'react';

const MarketData = ({ market_data }) => {
  const [athCheck, setAthCheck] = useState(null);
  const [athNum, setAthNum] = useState(null);
  const [atlCheck, setAtlCheck] = useState(null);
  const [atlNum, setAtlNum] = useState(null);
  const ref = useRef();
  let {
    ath,
    ath_date,
    atl,
    atl_date,
    circulating_supply,
    market_cap,
    total_supply,
    total_volume,
  } = market_data;

  if (total_volume.usd === 0) {
    total_volume.usd = null;
  }

  if (circulating_supply === 0) {
    circulating_supply = null;
  }

  if (market_cap.usd === 0) {
    market_cap.usd = null;
  }

  if (total_supply === 0) {
    total_supply = null;
  }

  const atht = ath_date.usd.indexOf('T');

  let athDate = ath_date.usd.slice(0, atht).split('-');

  athDate = [athDate[1], athDate[2], athDate[0]].join('-');

  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////

  const atlt = atl_date.usd.indexOf('T');

  let atlDate = atl_date.usd.slice(0, atlt).split('-');

  atlDate = [atlDate[1], atlDate[2], atlDate[0]].join('-');

  /////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////

  const athFormatted =
    ath.usd === 0
      ? null
      : ath.usd.toString().includes('e')
      ? ath.usd.toFixed(Number(athNum))
      : ath.usd < 1
      ? ath.usd
      : athCheck &&
        athCheck.slice(0, 2) === '00' &&
        ath.usd.toString().split('.')[0] === '1'
      ? '1.00'
      : athCheck && athCheck < 10 && athCheck.length === 1
      ? `${Number(ath.usd).toLocaleString()}0`
      : !ath.usd.toString().includes('.')
      ? `${Number(ath.usd.toFixed(2)).toLocaleString()}.00`
      : athCheck && athCheck.slice(0, 1) === '0'
      ? ath.usd.toLocaleString()
      : Number(ath.usd.toFixed(2)).toLocaleString();

  const atlFormatted =
    atl.usd === 0
      ? null
      : atl.usd.toString().includes('e')
      ? atl.usd.toFixed(atlNum)
      : atl.usd < 1
      ? atl.usd
      : atlCheck &&
        atlCheck.slice(0, 2) === '00' &&
        atl.usd.toString().split('.')[0] === '1'
      ? '1.00'
      : atlCheck && atlCheck < 10 && atlCheck.length === 1
      ? `${Number(atl.usd).toLocaleString()}0`
      : !atl.usd.toString().includes('.')
      ? `${Number(atl.usd.toFixed(2)).toLocaleString()}.00`
      : atlCheck && atlCheck.slice(0, 1) === '0'
      ? atl.usd.toLocaleString()
      : Number(atl.usd.toFixed(2)).toLocaleString();

  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////

  useEffect(() => {
    setAthCheck(ath.usd.toString().split('.')[1]);
    setAtlCheck(atl.usd.toString().split('.')[1]);
  }, [ath.usd, atl.usd]);

  useEffect(() => {
    if (ath.usd.toString().includes('e')) {
      const arr = ath.usd.toString().split('');
      if (arr[arr.length - 3] === '-') {
        const strVal = ath.usd.toString();
        setAthNum(strVal.slice(strVal.length - 2));
      } else {
        let val;
        val = arr[arr.length - 1];
        setAthNum(Number(val) + 3);
      }
    }

    if (atl.usd.toString().includes('e')) {
      const arr = atl.usd.toString().split('');
      if (arr[arr.length - 3] === '-') {
        const strVal = atl.usd.toString();
        setAtlNum(strVal.slice(strVal.length - 2));
      } else {
        let val;
        val = arr[arr.length - 1];
        setAtlNum(Number(val) + 3);
      }
    }
  }, [ath.usd, atl.usd]);

  useEffect(() => {
    if (ref.current.hasChildNodes()) {
      ref.current.lastChild.classList.add('last');
    }
  }, []);

  return (
    <section className='market-data'>
      <h2 className='header section-header single-header'>Market Data</h2>
      <div className='underline market'></div>
      <div className='market-info-container' ref={ref}>
        {market_cap.usd && (
          <div className='market-row'>
            <div className='item-key'>Market Cap</div>
            <div className='total'>
              ${market_cap.usd && market_cap.usd.toLocaleString()}
            </div>
          </div>
        )}
        {total_volume.usd && (
          <div className='market-row'>
            <div className='item-key'>24h Volume</div>
            <div className='total'>
              ${total_volume.usd && total_volume.usd.toLocaleString()}
            </div>
          </div>
        )}
        {athFormatted && (
          <div className='market-row'>
            <div className='item-key alltime'>
              <div className='span-container'>
                <span className='alltime-span'>ATH</span>
                <span className='little'>(All Time High)</span>
              </div>
              <div className='alltime-date'>{`Date: ${
                ath_date.usd && athDate
              }`}</div>
            </div>
            <div className='total'>{ath.usd && `$${athFormatted}`}</div>
          </div>
        )}
        {atlFormatted && (
          <div className='market-row'>
            <div className='item-key alltime'>
              <div className='span-container'>
                <span className='alltime-span'>ATL</span>
                <span className='little'>(All Time Low)</span>
              </div>
              <div className='alltime-date'>{`Date: ${
                atl_date.usd && atlDate
              }`}</div>
            </div>
            <div className='total'>{atl.usd && `$${atlFormatted}`}</div>
          </div>
        )}
        {circulating_supply && (
          <div className='market-row'>
            <div className='item-key'>Circulating Supply</div>
            <div className='total'>
              {circulating_supply &&
                circulating_supply !== 0 &&
                circulating_supply.toLocaleString()}
            </div>
          </div>
        )}
        {total_supply && (
          <div className='market-row'>
            <div className='item-key'>Total Supply</div>
            <div className='total'>
              {total_supply && total_supply.toLocaleString()}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MarketData;
