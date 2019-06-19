const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

express()
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/', (req, res) => res.render('pages/index'))
	.listen(PORT, () => console.log(`Listening on ${PORT}`));

// app.get('/home', function(req, res) {
// 	// Controller
// 	console.log('Received a request for the home page');
// 	let firstNum = submittedForm();
// 	let secondNum = submittedForm();
// 	let operator = submittedForm();
// 	let params = { firstNum: firstNum, secondNum: secondNum, operator: operator };

// 	res.render('home', params);
// });

// function submittedForm() {
// 	return;
// }
