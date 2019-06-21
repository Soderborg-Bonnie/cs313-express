const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.render('pages/postalForm.ejs'));
app.set('models', path.join(__dirname, 'models'));
app.set('images', path.join(__dirname, 'images'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

//this code also works
// ('use strict');
// let rawdata = fs.readFileSync('rates.json');
// let rates = JSON.parse(rawdata);
// console.log(rates.stampedLetters);

app.get('/calculateRate', function(req, res) {
	const util = require('util');
	const rates = require('./rates');
	let weight = req.query.weight;
	let mailType = req.query.mailType;
	let price = (util.inspect(rates[mailType][weight]).replace(/'/g, ""));

	if ((mailType == 'stamped letter' || mailType =='metered letter') && weight>=3.5){
		price = "Sorry. Letters can only weigh up to 3.5 oz. Large envelopes and packages can weigh up to 13 ounces."
	}
	price = '$' + price;
	let params = { weight: weight, mailType: mailType, price: price };

	res.render('pages/rates', params);
	res.end();
});
