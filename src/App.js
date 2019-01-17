import React, { Component } from 'react';
import Grocery from './components/Grocery';
import ShoppingBag from './components/ShoppingBag';
import Stats from './components/Stats';
import Wallet from './components/Wallet';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      message: ''
    };
  }

  setMessage(message) {
    this.setState({
      message
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row text-center">
          <div className="jumbotron">
            <h1>Shoppers Stop</h1>
            <p>Where you can get your daily products</p>
          </div>
        </div>
        <Wallet message={this.state.message} setMessage={this.setMessage.bind(this)} />
        <div className="row">
          <Grocery setMessage={this.setMessage.bind(this)} />
          <ShoppingBag setMessage={this.setMessage.bind(this)} />
          <Stats />
        </div>
      </div>
    );
  }
}

export default App;
