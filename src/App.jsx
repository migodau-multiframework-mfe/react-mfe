import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

function App() {
  return (
    <div className="App">
        <h2>React MFE</h2>
        <img 
          className='logo' 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdv3WpZrEQcWAgaWswSr96MK3rbJGvu1_NZQ&usqp=CAU"
        />
    </div>
  );
}

class Mfe4Element extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<App/>, this);
  }
}

customElements.define('react-element', Mfe4Element);

export default App;
