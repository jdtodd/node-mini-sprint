import React from 'react';
import ReactDOM from 'react-dom';

const axios = require('axios');
const $ = require('jquery');

class Form extends React.Component{
  constructor(props) {
    super(props)
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(event) {
      event.preventDefault();
    axios.post('/quote', {quote: event.target[0].value})
      .then((res) => {
        this.props.getNewQuote();
        $('#response').text('You submitted a quote!')
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <form  onSubmit={this.onFormSubmit}>
      <input type="text"></input>
        <button id="submit">Submit Quote</button>
        <p id="response"></p>
      </form>
  )}
}

export default Form;