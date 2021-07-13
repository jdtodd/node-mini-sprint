import React from 'react';
import ReactDOM from 'react-dom';
import Quote from './Quote.jsx';
import Form from './Form.jsx';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quote: '?'
    }
    this.getQuote = this.getQuote.bind(this);
  }
  componentDidMount() {
    this.getQuote();
  }

  getQuote() {
    axios.get('http://localhost:3000/quote')
      .then((res) => {
        console.log(res);
        this.setState({quote: res.data})
      })
      .catch((err) => {
        console.error(err);
      })
  }
  render() {
    return (
      <div id='title'>
        <h1>Random Quote Generator</h1>
        <Quote quote={this.state.quote}/>
        <Form getNewQuote={this.getQuote}/>
        </div>
    )
  }
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
