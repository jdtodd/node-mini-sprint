$(document).ready(function() {

// get a quote from the server when the page loads and add it to the dom
  getQuote();

// when the user enters data and clicks submit, post the quote to the server
  $('#submit').click((e) => {
    e.preventDefault();
    let quote = $('input').val();
    addQuote(quote);
  });

  function getQuote(){
    // Make ajax GET request to server at url /quotes
    // on success, append recieved quote to dom. Need to use JSON.parse when receiving.
    $.ajax({
      url: 'http://localhost:3000/quote',
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        data = JSON.parse(data)
        $('#quote').text(data);
      },
      error: function(data) {
        console.log('There was an error receiving the response' + data + ': did not render correctly')
      }
    });
  }

  function addQuote(quote){
    //YOUR CODE HERE, Add a POST request
    var quoteObj = {"quote": quote}
    $.ajax({
      url: 'http://localhost:3000/quote',
      type: 'POST',
      data: JSON.stringify(quoteObj),
      contentType: 'application/json',
      success: getQuote(),
      error: (err) => {
        console.log('There was an error: ' + err + ' Data not posted to server')
      }
    })
  }
});
