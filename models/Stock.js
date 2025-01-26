const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
	stock: { type: String, required: true},
	likes: {type: Number, default: 0},
	likes_ip: {default: [], type: [String]}
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock
