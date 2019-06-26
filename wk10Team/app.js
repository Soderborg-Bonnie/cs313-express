const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const PORT = process.env.PORT || 5000;
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();
var router = express.Router();
// connect to Postgres
const { Pool } = require('pg');
const connectionPath = process.env.DATABASE_URL || 'postgres://studentin:familie@localhost:5432/familyhistory';
const pool = new Pool ({connectionString: connectionPath});

//EJS layouts
app.use(expressLayouts);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

//search for id
app.get('/getPerson', (req, res) => {
	let id = req.query.id;

 	getDBPerson(id, (error, result) => {
    if (error || result == null || result.length != 1) {
      res.status(500).json({success: false, data: error});
    }else{
      res.json(result[0]);
      let id = result[0].id;
      let fname = result[0].fname;
      let lname = result[0].lname;
      let dob = result[0].dob;
      let params = {id: id, fname: fname, lname: lname, dob: dob };
      console.log(params);
    }
  });
});

// server port
app.listen(PORT, console.log(`Server started on port ${PORT}`));


// function to retrieve sql data from db with id
function getDBPerson(id, callback) {
  // similar to PDO in PHP, $1::int gets back first data piece cleanly
  let sql = 'SELECT id, fname, lname, dob FROM person WHERE id = $1::int';
  let params = [id];
  pool.query(sql, params, (err, result) => {
    if (err) {
      console.log('an error with db happened');
      console.log(err);
      callback(err,null);
    }
    // console.log('found db result: ' + JSON.stringify(result.rows[0].fname));
    callback(null, result.rows);
  });
};

app.get('/getParents', (req, res) => {
	let id = req.query.id;

 	getDBParents(id, (error, result) => {
    if (error || result == null || result.length != 1) {
      res.status(500).json({success: false, data: error});
    }else{
      res.end(JSON.stringify(result));
      let id = result[0].id;
      let fname = result[0].fname;
      let lname = result[0].lname;
      let dob = result[0].dob;
      let params = {id: id, fname: fname, lname: lname, dob: dob };
      console.log(params);
    }
  });
});
function getDBParents(id, callback) {
  // similar to PDO in PHP, $1::int gets back first data piece cleanly
  let sql = 'SELECT p2.id, p2.fname, p2.lname, p2.dob FROM person AS p1 LEFT JOIN family on family.child_id=p1.id LEFT JOIN person AS p2 on family.parent_id=p2.id WHERE p1.id=$1::int;'
  let params = [id];
  pool.query(sql, params, (err, result) => {
    if (err) {
      console.log('an error with db happened');
      console.log(err);
      callback(err,null);
    }
    callback(null, result.rows);
  });
};
app.get('/getChildren', (req, res) => {
	let id = req.query.id;

 	getDBChildren(id, (error, result) => {
    if (error || result == null) {
      res.status(500).json({success: false, data: error});
    }else{
      res.end(JSON.stringify(result));
      // let id = result[0].id;
      // let fname = result[0].fname;
      // let lname = result[0].lname;
      // let dob = result[0].dob;
      // let params = {id: id, fname: fname, lname: lname, dob: dob };
      console.log(JSON.stringify(result));
    }
  });
});
function getDBChildren(id, callback) {
  // similar to PDO in PHP, $1::int gets back first data piece cleanly
  let sql = 'SELECT p2.id, p2.fname, p2.lname, p2.dob FROM person AS p1 LEFT JOIN family on family.parent_id=p1.id LEFT JOIN person AS p2 on family.child_id=p2.id WHERE p1.id= $1::int';
  let params = [id];
  pool.query(sql, params, (err, result) => {
    if (err) {
      console.log('an error with db happened');
      console.log(err);
      callback(err,null);
    }
    console.log('found db result: ' + JSON.stringify(result.rows[0]));
    callback(null, result.rows);
  });
};
module.exports = app;
