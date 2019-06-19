const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
//  .get('/math', (req, res) => res.render('pages/index'))
.get("/math", function(req, res) {
  // Controller
  console.log("Received a request for the math submit");
  var name = handleSubmit();
  
  var p1 = req.query.p1;
  
  console.log(p1);
  var p2 = req.query.p2;
  console.log(p2);
  var oper = req.query.operation;
  console.log(oper);

  var result;

  switch(oper) {
    case '+':
      result = Number(p1) + Number(p2);
      break;
    case '-':
      result = Number(p1) - Number(p2);
      break;
    case '*':
      result = Number(p1) * Number(p2);
      break;
    case '/':
      result = Number(p1) / Number(p2);
      break;
    default:
      console.log("error");  
      result = 'Error';
  }

  console.log("Received a request for the math submit for " + p1 + oper + p2 + "=" + result);

	var params = {p1: p1, p2: p2, oper: oper, result: result};

	res.render("pages/results", params);
  res.end();
})
.get("/math_service", function(req, res) {
  // Controller
  console.log("Received a request for the math submit");
  console.log(req.query);
  var name = handleSubmit();
  
  var p1 = req.query.p1;
  
  console.log(p1);
  var p2 = req.query.p2;
  console.log(p2);
  var oper = req.query.operation;
  console.log(oper);

  var result;

  switch(oper) {
    case '+':
      result = Number(p1) + Number(p2);
      break;
    case '-':
      result = Number(p1) - Number(p2);
      break;
    case '*':
      result = Number(p1) * Number(p2);
      break;
    case '/':
      result = Number(p1) / Number(p2);
      break;
    default:
      console.log("error");  
      result = 'Error';
  }

  console.log("Received a request for the math submit for " + p1 + oper + p2 + "=" + result);

	var params = {p1: p1, p2: p2, oper: oper, result: result};

  
  res.setHeader('Content-Type', 'application/json');
  
  res.end(JSON.stringify({ result: result }));
})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))



  function handleSubmit() {
    // access the database
    // make sure they have permission to be on the site
  
    return "John";
  }
  