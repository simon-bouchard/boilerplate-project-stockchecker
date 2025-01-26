const mongoose = require('mongoose');
const Stock = require('../models/Stock.js');

async function findOrCreateStock(stock_name, like=false, client_ip='') {
	try {
		const filter = {stock: stock_name};
		const options = {upsert:true, new: true}

		let stock = await Stock.findOneAndUpdate(
      		    filter,
      		    { $setOnInsert: { stock: stock_name } },
      		    options
    		);

		if (like) {
	    	if (!stock.likes_ip.includes(client_ip)) {
				stock.likes += 1;
				stock.likes_ip.push(client_ip);
				await stock.save();
			}
		}

		return stock.likes

	} catch (err){
		return err
	}

}

module.exports = findOrCreateStock
