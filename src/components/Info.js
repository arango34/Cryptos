import React from 'react';
import { FaReddit, FaTwitter, FaTelegram } from 'react-icons/fa';

const Info = ({ links, platforms, description }) => {
  const plats = Object.entries(platforms);
  const {
    twitter_screen_name: twitter,
    homepage,
    telegram_channel_identifier: telegram,
  } = links;

  const noA = description.en.replace(/<\/?a[^>]*>/g, '');

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className='community-info-container'>
      <div className='info-co'>
        <h2 className='header section-header single-header info-header'>
          INFO
        </h2>
        <div className='underline underline-info'></div>
      </div>
      <div className='links-container'>
        <div className='info-row'>
          <span className='title contract-title'>Contract</span>
          {plats[0][0] !== '' &&
            plats.map((item, i) => {
              return (
                <div key={i} className='entries-container contract'>
                  <div className='div'>
                    <span className='item-key key-contract'>
                      {capitalize(item[0])}:
                    </span>
                    <span className='value contract-value'>{item[1]}</span>
                  </div>
                </div>
              );
            })}
          {!plats ||
            (plats[0][0] === '' && (
              <div className='entries-container contract entries-web'>
                <div className='value web-value'>No Info Available</div>
              </div>
            ))}
        </div>
        <div className='info-row'>
          <span className='title'>Website</span>
          {homepage && homepage.length > 0 ? (
            homepage.map((item, i) => {
              return (
                <div key={i} className='entries-container contract entries-web'>
                  {item && item !== '' && (
                    <div className='value web-value'>
                      <a href={item} className='web-url'>
                        {item}
                      </a>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className='entries-container contract entries-web'>
              <div className='value web-value'>No Info Available</div>
            </div>
          )}
        </div>
        <div className='info-row'>
          <span className='title'>Community</span>
          <div className='entries-container comm-container'>
            <div>
              <a
                href={`https://www.reddit.com/r/${twitter}`}
                className='com-link'
              >
                <FaReddit className='fa' />
              </a>
            </div>
            <div>
              <a href={`https://twitter.com/${twitter}`} className='com-link'>
                <FaTwitter className='fa' />
              </a>
            </div>
            <div>
              <a href={`https://t.me/${telegram}`} className='com-link'>
                <FaTelegram className='fa' />
              </a>
            </div>
          </div>
        </div>
        <div className='info-row info-desc'>
          <span className='title'>Description</span>
          {description.en && description.en !== '' ? (
            <div className='entries-container entries-desc'>{noA}</div>
          ) : (
            <div className='entries-container contract entries-web'>
              <div className='value web-value'>No Info Available</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;
