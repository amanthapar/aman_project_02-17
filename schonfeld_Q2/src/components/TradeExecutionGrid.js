import React from 'react';
import Pagination from './Pagination';
import { GridOptions } from './GridOptions';
import { sortTypes } from '../helpers/sortTypes';
import { TradeHeader } from './TradeHeader';
import PropTypes from 'prop-types';

const propTypes = {
  tradeData: PropTypes.array.isRequired,
};

export default class TradeExecutionGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationItems: [],
      pageSize: 20,
      isDarkMode: false,
      sortedData: [],
      sort: {
        column: '',
        direction: 'asc',
      },
    };
  }

  onChangePage = paginationItems => {
    this.setState({ paginationItems });
  };

  onPageSizeChange = e => {
    this.setState({ pageSize: Number(e.target.value) });
  };

  onToggleDarkMode = e => {
    this.setState({ isDarkMode: !this.state.isDarkMode });
  };

  onSortChange = (e, column) => {
    const direction = this.state.sort.column
      ? this.state.sort.direction === 'asc'
        ? 'desc'
        : 'asc'
      : 'desc';
    let tradeData = [...this.props.tradeData];
    const sortedData = tradeData.sort(sortTypes[direction][column]);

    this.setState({
      sortedData,
      sort: {
        column,
        direction,
      },
    });
  };

  render() {
    let tableClassName = 'table table-bordered table-hover table-striped table-sm';
    if (this.state.isDarkMode) tableClassName += ' table-dark';

    const data = this.state.sortedData.length ? this.state.sortedData : this.props.tradeData;

    return (
      <div className="table-responsive">
        <GridOptions
          onPageSizeChange={this.onPageSizeChange}
          defaultPageSize={this.state.pageSize}
          isDarkMode={this.state.isDarkMode}
          onToggleDarkMode={this.onToggleDarkMode}
          sort={this.state.sort}
        />
        <table className={tableClassName}>
          <TradeHeader onSortChange={this.onSortChange} />
          <tbody>
            {this.state.paginationItems.map((tradeRow, idx) => {
              return (
                <tr key={tradeRow.id}>
                  <td>{tradeRow.id}</td>
                  <td>{tradeRow.execution_timestamp}</td>
                  <td align="left">{tradeRow.type}</td>
                  <td align="right">{tradeRow.quantity}</td>
                  <td>{tradeRow.symbol}</td>
                  <td align="left">{tradeRow.portfolio_manager}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          totalItems={data}
          onChangePage={this.onChangePage}
          pageSize={this.state.pageSize}
          initialPage={1}
        />
      </div>
    );
  }
}

TradeExecutionGrid.propTypes = propTypes;
