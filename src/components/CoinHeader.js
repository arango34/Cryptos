import React, { useEffect, useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import Info from './Info';

const CoinHeader = ({ crypto }) => {
  const [isUp, setIsUp] = useState(true);
  const [check, setCheck] = useState(null);
  const [check2, setCheck2] = useState(null);
  const [num, setNum] = useState(null);
  const {
    symbol,
    name,
    description,
    links,
    image,
    market_cap_rank: rank,
    market_data,
    platforms,
  } = crypto;

  useEffect(() => {
    if (market_data.price_change_percentage_24h) {
      if (market_data.price_change_percentage_24h < 0) {
        setIsUp(false);
      }
      setCheck(market_data.current_price.usd.toString().split('.')[1]);

      setCheck2(
        market_data.price_change_percentage_24h.toString().split('.')[0]
      );
    }
  }, [
    crypto,
    check2,
    market_data.current_price.usd,
    market_data.price_change_percentage_24h,
  ]);

  useEffect(() => {
    if (market_data.current_price.usd.toString().includes('e')) {
      const arr = market_data.current_price.usd.toString().split('');
      if (arr[arr.length - 3] === '-') {
        const strVal = market_data.current_price.usd.toString();
        setNum(strVal.slice(strVal.length - 2));
      } else {
        let val;
        val = arr[arr.length - 1];
        setNum(Number(val) + 3);
      }
    }

    console.log(market_data);
  }, [market_data.current_price.usd]);

  return (
    <section className='single-crytpo-section'>
      <div className='coin-container'>
        <span className='rank'>{rank ? `Rank #${rank}` : 'Unranked'}</span>
        <div className='name-container'>
          <img src={image.small} alt='' className='img-name' />
          <span className='name-big'>{name}</span>
          <span className='symbol'>({symbol.toUpperCase()})</span>
        </div>
        <div className='coin-price-container'>
          <span className='price'>
            $
            {market_data.current_price.usd.toString().includes('e')
              ? market_data.current_price.usd.toFixed(num)
              : market_data.current_price.usd < 1
              ? market_data.current_price.usd
              : check &&
                check.slice(0, 2) === '00' &&
                market_data.current_price.usd.toString().split('.')[0] === '1'
              ? '1.00'
              : check && check < 10 && check.length === 1
              ? `${Number(market_data.current_price.usd).toLocaleString()}0`
              : !market_data.current_price.usd.toString().includes('.')
              ? `${Number(
                  market_data.current_price.usd.toFixed(2)
                ).toLocaleString()}.00`
              : check && check.slice(0, 1) === '0'
              ? market_data.current_price.usd.toLocaleString()
              : Number(market_data.current_price.usd).toLocaleString()}
          </span>
          {market_data.price_change_percentage_24h &&
            market_data.price_change_percentage_24h !== 0 && (
              <span className={`up-down ${isUp ? 'isUp' : 'isDown'}`}>
                <FaCaretUp className={`facare ${!isUp && 'hide'}`} />
                <FaCaretDown className={`facare ${isUp && 'hide'}`} />
                {check2 === 0 && isUp
                  ? `0${market_data.price_change_percentage_24h.toFixed(1)}`
                  : check2 !== 0 && !isUp
                  ? market_data.price_change_percentage_24h
                      .toFixed(1)

                      .slice(1)
                  : check2 < 0 && !isUp
                  ? `0${market_data.price_change_percentage_24h
                      .toFixed(1)
                      .slice(1)}`
                  : isUp
                  ? market_data.price_change_percentage_24h.toFixed(1)
                  : market_data.price_change_percentage_24h.toFixed(1).slice(1)}
                %
              </span>
            )}
          <span className='width'></span>
        </div>
      </div>
      <Info
        links={links}
        platforms={platforms}
        name={name}
        description={description}
      />
    </section>
  );
};

export default CoinHeader;
