const express = require('express');
const router = express.Router();
const axios = require('axios');
const CoinGecko = require('coingecko-api');

const CoinGeckoClient = new CoinGecko();

const breakdown = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = id.toLowerCase();
    let data = CoinGeckoClient.coins;
    data = await data.list();
    data = data.data;

    data = data.reduce((total, item) => {
      if (item.id.includes(id)) {
        total = [...total, item.id];
      }
      return total;
    }, []);

    if (data.length > 200) {
      next();
    } else {
      req.data = data;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'error' });
  }
};

router.route('/').get(async (req, res) => {
  try {
    // const resp = await axios.get(
    //   'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map',
    //   {
    //     headers: {
    //       'X-CMC_PRO_API_KEY': process.env.API_KEY,
    //     },
    //   }
    // );

    // let data = await resp.data;

    let data = CoinGeckoClient.coins;
    data = await data.markets({ localization: false });

    data = data.data;

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }

  router.route('/:id').get(async (req, res) => {
    try {
      const { id } = req.params;
      let data = CoinGeckoClient.coins;
      data = await data.fetch(id, {
        developer_data: false,
        localization: false,
        community_data: false,
      });
      data = data.data;
      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'error' });
    }
  });
});

router.route('/search/:id').get(breakdown, async (req, res) => {
  if (!req.data) {
    res.status(500).json({ error: 'error' });
  } else {
    let data = CoinGeckoClient.coins;

    data = await data.markets({ ids: req.data });
    data = data.data;

    res.status(200).json({ data });
  }
});

module.exports = router;
