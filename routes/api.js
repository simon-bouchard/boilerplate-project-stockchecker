'use strict';
const express = require('express');
const fetch = require('node-fetch');
const crypto = require('crypto');
const findOrCreateStock = require('../handlers/stock_handler');

const app = express();

app.use(express.urlencoded({extended: true}));

const base_url = 'https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock'
module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async(req, res) => {

		let {stock, like} = req.query;
		stock = Array.isArray(stock) ? stock : [stock];

		try {
			const response = await fetch(`${base_url}/${stock[0].toLowerCase()}/quote`)
			const responseJson = await response.json();
			const price = responseJson.latestPrice;
			
			let hashed_ip = ""
			if (like) {
          		hashed_ip = crypto.createHash('sha256').update(req.ip).digest('hex');
			}
			const likes = await findOrCreateStock(stock[0], like, hashed_ip)

			if (stock[1]) {
				const response2 = await fetch(`${base_url}/${stock[1].toLowerCase()}/quote`)
				const responseJson2 = await response2.json();
				const price2 = responseJson2.latestPrice
				const likes2 = await findOrCreateStock(stock[1], like, hashed_ip);

				return res.json({stockData: [
					{stock: stock[0], price: price, rel_likes: likes-likes2},
					{stock: stock[1], price: price2, rel_likes: likes2 - likes}
				]})
			}

			return res.json({stockData: {stock: stock[0], price: price, likes: likes}});
		} catch (err) {
			res.json({error: 'Server error'})
		}
    });
    
};
