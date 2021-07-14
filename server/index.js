const connection = require('./db/index.js');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.static('../react-client/dist'))

//headers to allows CORS requests
const headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

const port = 3000;

// TODO: Fill with strings of your favorite quotes :)
const quotes = [
  'Service to others is the rent you pay for your room here on earth. - Muhammad Ali',
  'The only thing I know is that I know nothing - Socrates',
  'He who is not courageous enough to take risks will accomplish nothing in life. - Muhammad Ali',
  'Be the change that you wish to see in the world. - Mahatma Ghandi',
  'If only I had known, I should have become a watchmaker. - Albert Einstein'
];

for (var i = 0; i < quotes.length; i++) {
  var quote = { 'id': i + 1, 'quote': quotes[i] };
  connection.query(
    `INSERT INTO quotes (id, quote) VALUES ('${quote.id}', '${quote.quote}') ON DUPLICATE KEY UPDATE quote = '${quote.quote}'`,
    quote, (err, results) => {
      if (err) {
        console.error(err);
      }
    })
}
//Utility Function to return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const handleRequest = function (req, res) {
  console.log(`Endpoint: ${req.url} Method: ${req.method}`)
};

// redirect users to /quote if they try to hit the homepage. This should already work, no changes needed

app.get('/quote', (req, res) => {
  var index;
  connection.query('SELECT MAX(id) from quotes', function (err, result) {
    if (err) {
      console.error(err);
    } else {
      index = getRandomInt(0, result[0]['MAX(id)']);
      connection.query(`SELECT quote FROM quotes WHERE id = '${index}'`, function (err, results) {
        if (err) {
          console.error(err);
          res.sendStatus(404);
        } else {
          res.send(results[0].quote);
        }
      })
    }
  })
});

app.post('/quote', (req, res) => {
  connection.query(`INSERT INTO quotes SET quote = '${req.body.quote}'`, (err) => {
    if (err) {
      console.error(err);
      res.status(500);
    } else {
      res.status(201);
      res.end();
    }
  })
})


app.listen(3000, () => {
  console.log('Listening on port ' + port);
})
