import React from 'react';
import './styles/App.css';
import tradeExecutionData from './data.json';
import TradeExecutionGrid from './components/TradeExecutionGrid';
import { scaleTradeExecutionData as formatter } from './helpers/formatHelpers';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tradeExecutionData: [],
    };
  }

  componentDidMount() {
    // fetch and format data coming in
    this.setState({ tradeExecutionData: formatter(tradeExecutionData) });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h3>Trade Executions</h3>
          <TradeExecutionGrid tradeData={this.state.tradeExecutionData} />
        </div>
      </div>
    );
  }
}
