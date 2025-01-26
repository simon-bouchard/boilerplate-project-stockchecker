const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

	let likes

	test('Viewing one stock: GET request to /api/stock-prices/', (done) => {
		chai
			.request(server)
			.keepOpen()
			.get('/api/stock-prices?stock=GOOG')
			.end((err, res) => {
				assert.equal(res.status, 200, 'Response status should be 200');
				assert.isObject(res.body, 'Response should be an object');
				assert.property(res.body, 'stockData', 'Response should have a stockData property');
				assert.isObject(res.body.stockData, 'stockData property should be an object');

				const body = res.body.stockData
				assert.equal(body.stock, 'GOOG', 'Response should have the correct stock name');
				assert.isNumber(body.price, 'Price should be a number');
				assert.isNumber(body.likes, 'Likes should be a number');

				done()
			})

	});

	test('Viewing one stock and liking it: GET request to /api/stock-prices/', (done) => {
		chai
			.request(server)
			.keepOpen()
			.get('/api/stock-prices?stock=GOOG&like=true')
			.end((err, res) => {
				assert.equal(res.status, 200, 'Response status should be 200');
				assert.isObject(res.body, 'Response should be an object');
				assert.property(res.body, 'stockData', 'Response should have a stockData property');
				assert.isObject(res.body.stockData, 'stockData property should be an object');

				const body = res.body.stockData
				assert.equal(body.stock, 'GOOG', 'Response should have the correct stock name');
				assert.isNumber(body.price, 'Price should be a number');
				assert.isAbove(body.likes, 0, 'Likes should be above 0');

				likes = body.likes

				done()
			})

	});

	test('Viewing one stock: GET request to /api/stock-prices/', (done) => {
		chai
			.request(server)
			.keepOpen()
			.get('/api/stock-prices?stock=GOOG&like=true')
			.end((err, res) => {
				assert.equal(res.status, 200, 'Response status should be 200');
				assert.isObject(res.body, 'Response should be an object');
				assert.property(res.body, 'stockData', 'Response should have a stockData property');
				assert.isObject(res.body.stockData, 'stockData property should be an object');

				const body = res.body.stockData
				assert.equal(body.stock, 'GOOG', 'Response should have the correct stock name');
				assert.isNumber(body.price, 'Price should be a number');
				assert.equal(body.likes, likes, 'Likes should not update twice');

				done()
			})
	});

	test('Viewing two stocks: GET request to /api/stock-prices/', (done) => {
		chai
			.request(server)
			.keepOpen()
			.get('/api/stock-prices?stock=GOOG&stock=MSFT')
			.end((err, res) => {
				assert.equal(res.status, 200, 'Response status should be 200');
				assert.isObject(res.body, 'Response should be an object');
				assert.property(res.body, 'stockData', 'Response should have a stockData property');
				assert.isArray(res.body.stockData, 'stockData property should be an an array');

				const body = res.body.stockData
				assert.equal(body.length, 2, 'StockData should contain two elements');
				assert.isObject(body[0], 'stockData property first element should be an object');
				assert.isObject(body[1], 'stockData property second element should be an object');
				
				assert.equal(body[0].stock, 'GOOG', 'Response should have the correct stock name');
				assert.isNumber(body[0].price, 'Price should be a number');
				assert.isNumber(body[0].rel_likes, 'Likes should be correct');

				assert.equal(body[1].stock, 'MSFT', 'Response should have the correct stock name');
				assert.isNumber(body[1].price, 'Price should be a number');
				assert.isNumber(body[1].rel_likes, 'Likes should be correct');

				assert.equal(body[0].rel_likes + body[1].rel_likes, 0, 'rel_likes should add up to 0');

				done()
			})
	});

	test('Viewing two stocks: GET request to /api/stock-prices/', (done) => {
		chai
			.request(server)
			.keepOpen()
			.get('/api/stock-prices?stock=GOOG&stock=MSFT&like=true')
			.end((err, res) => {
				assert.equal(res.status, 200, 'Response status should be 200');
				assert.isObject(res.body, 'Response should be an object');
				assert.property(res.body, 'stockData', 'Response should have a stockData property');
				assert.isArray(res.body.stockData, 'stockData property should be an an array');

				const body = res.body.stockData
				assert.equal(body.length, 2, 'StockData should contain two elements');
				assert.isObject(body[0], 'stockData property first element should be an object');
				assert.isObject(body[1], 'stockData property second element should be an object');
				
				assert.equal(body[0].stock, 'GOOG', 'Response should have the correct stock name');
				assert.isNumber(body[0].price, 'Price should be a number');
				assert.isNumber(body[0].rel_likes, 'Likes should be correct');

				assert.equal(body[1].stock, 'MSFT', 'Response should have the correct stock name');
				assert.isNumber(body[1].price, 'Price should be a number');
				assert.isNumber(body[1].rel_likes, 'Likes should be correct');

				assert.equal(body[0].rel_likes + body[1].rel_likes, 0, 'rel_likes should add up to 0');

				done()
			})
	});

});
