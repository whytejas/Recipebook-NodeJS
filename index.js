var express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cons = require('consolidate'),
  { Client } = require('pg');
var dust = require('dustjs-linkedin');

var app = express();


app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.listen(3000, function () {
  console.log("Server running!")
})


const client = new Client({
  user: 'newuser',
  host: 'localhost',
  database: 'recipebookdb',
  password: 'password',
  port: 5432,
})

client.connect()


app.get('/', function (req, res) {

  client.query('SELECT * FROM recipes', (err, result) => {
    if (err) {
      console.log(err.stack)
    } else { res.render('index', { recipes: result.rows }); }
  })

})


app.post('/add', function (req, res) {

  const query = {
    text: 'INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3) RETURNING *',
    values: [req.body.name, req.body.ingredients, req.body.directions],
  }
  // callback
  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log("Added")
    }
  })

  res.redirect('/');
})

app.get('/delete/:id', function (req, res) {

  const query = {
    text: 'DELETE FROM recipes WHERE id = $1 ',
    values: [req.params.id]
  }

  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log("Deleted")
    }
  })

  res.redirect('/');
})


app.post('/edit', function (req, res) {

  const query = {
    text: 'UPDATE recipes SET name = $2, ingredients = $3, directions = $4 WHERE id = $1',
    values: [req.body.id, req.body.name, req.body.ingredients, req.body.directions],
  }
  // callback
  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log("Updated")
    }
  })

  res.redirect('/');
})
