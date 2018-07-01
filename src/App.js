import React, { Component } from 'react';
import './App.css';

//CREATE COINBASE STYLE CARDS FOR MULTIPLE COINS
class App extends Component {
  

    
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      cryptoData: []
    };
    
     this.refreshData = this.refreshData.bind(this);
  }
    
    refreshData() {
      fetch("https://api.coinmarketcap.com/v2/ticker/")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              cryptoData: result.data
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
   componentDidMount () {
    return this.refreshData()
   }

  
  render() {

    const {cryptoData, isLoaded} = this.state;
    console.log(cryptoData);
    
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        
        <div className="App">
          <div className="container mt-2">
            <div class="jumbotron">
              <h1 class="display-4">Crypto Price Tracker</h1>
              <p class="lead">Use this simple site to find out the latest crypto prices.</p>
            </div>
            
            <div className="row">
              <div className="col-sm-4">
                <div class="card" style={{width: '18rem'}}>
                  <img class="card-img-top" src="https://bitcoin.org/img/icons/opengraph.png?1529096753" alt="bitcoin" />
                  <div class="card-body">
                    <h5 class="card-title"><strong>Bitcoin</strong></h5>
                    <h2 class="card-text">${cryptoData[1].quotes.USD.price}</h2>
                    <h6 class="card-text">Last 24 hrs: {cryptoData[1].quotes.USD.percent_change_24h}%</h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div class="card" style={{width: '18rem'}}>
                  <img class="card-img-top" src="data:image/png;base64,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" alt="bitcoin" />
                  <div class="card-body">
                    <h5 class="card-title"><strong>Ether</strong></h5>
                    <h2 class="card-text">${cryptoData[1027].quotes.USD.price}</h2>
                    <h6 class="card-text">Last 24 hrs: {cryptoData[1027].quotes.USD.percent_change_24h}%</h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div class="card" style={{width: '18rem'}}>
                  <img class="card-img-top" src="https://litecoin.org/img/litecoin.svg" alt="ltc" />
                  <div class="card-body">
                    <h5 class="card-title"><strong>Litecoin</strong></h5>
                    <h2 class="card-text">${cryptoData[2].quotes.USD.price}</h2>
                    <h6 class="card-text">Last 24 hrs: {cryptoData[2].quotes.USD.percent_change_24h}%</h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5">
                <p>
                  Time: {
                    Date( cryptoData[1].last_updated )
                  }
                </p>
                <button 
                  type="button"
                  className="btn btn-dark"
                  onClick={this.refreshData}
                >
                  REFRESH DATA
                </button>
            </div>
          </div>
        </div>
      );
    }

  }
}

export default App;
