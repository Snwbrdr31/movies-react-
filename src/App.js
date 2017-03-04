import React, { Component } from 'react';
import './App.css';
import Movies from './components/Movies';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Movies title='Oscar Movies' />
      </div>
    );
  }
}

export default App;
