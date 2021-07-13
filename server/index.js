
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

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

//Utility Function to return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const handleRequest = function(req, res) {
  console.log(`Endpoint: ${req.url} Method: ${req.method}`)
};

  // redirect users to /quote if they try to hit the homepage. This should already work, no changes needed

  app.options(headers);

  app.get('/quote', (req, res) => {
    res.send(JSON.stringify(quotes[getRandomInt(0, quotes.length)]));
    res.end()
  });

  app.post('/quote', (req, res) => {
    console.log(req.body);
    quotes.push(req.body.quote);
    res.sendStatus(201);
    console.log('Posted');
    res.end();
  })


  app.listen(3000, () => {
    console.log('Listening on port ' + port);
  })
