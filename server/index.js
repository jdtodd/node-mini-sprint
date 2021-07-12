const http = require('http');

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
  console.log(`Endpoint: ${req.url} Method: ${req.method}`);

  // redirect users to /quote if they try to hit the homepage. This should already work, no changes needed
  if (req.url == '/') {
    console.log('redirecting');
    res.writeHead(301, {...headers, Location: `http://localhost:${port}/quote`}) //redirect to quote
    res.end();
  }

  // TODO: GET ONE
  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
  } else if ((req.url == '/quote/' || req.url == '/quote') && req.method == "GET") {
    // if get request, need to get random int and respond with quote at random int index
    console.log('Sending quote');
    var randIndex = getRandomInt(0, quotes.length)
    res.writeHead(200, headers);
    res.end(JSON.stringify(quotes[randIndex]));
  }
  // TODO: POST/CREATE
  else if ((req.url == '/quote/' || req.url == '/quote') && req.method == "POST") {
    var newQuote = '';
    req.on('data', (chunk) => {
      newQuote = newQuote + chunk.toString();
    })
    req.on('end', () => {
      console.log('New Quote Recieved');
      newQuote = JSON.parse(newQuote);
      quotes.push(newQuote);
      res.writeHead(201, headers);
      res.end()
    })
  }

//CATCH ALL ROUTE
  else {
    res.writeHead(404,headers);
    res.end('Page not found');

  }
}

const server = http.createServer(handleRequest);
server.listen(port);

console.log('Server is running in the terminal!');
console.log(`Listening on http://localhost:${port}`);
