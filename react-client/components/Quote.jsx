import React from 'react';
import ReactDOM from 'react-dom';


const Quote = (props) => {
  return (
    <div id='quote'>
      {props.quote}
    </div>
  )
}

export default Quote;