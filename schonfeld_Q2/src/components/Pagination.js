import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  totalItems: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
  pageSize: PropTypes.number,
};

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  componentDidMount() {
    if (this.props.totalItems && this.props.totalItems.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.totalItems !== prevProps.totalItems) {
      this.setPage(this.props.initialPage);
    }
    if (this.props.pageSize !== prevProps.pageSize) {
      this.setPage(this.props.initialPage);
    }
  }

  setPage(page) {
    let { totalItems, pageSize } = this.props;
    let pager = this.state.pager;
    if (page < 1 || page > pager.totalPages) {
      return;
    }
    // get pager state for specified page
    pager = this.getPager(totalItems.length, page, pageSize);
    // slice data to be displayed on table
    let pageOfItems = totalItems.slice(pager.startIndex, pager.endIndex + 1);
    this.setState({ pager });
    this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage, pageSize) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    // calculate start and end item indexes so we can slice data
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // pages to display in pager
    let pages = [...Array(endPage + 1 - startPage).keys()].map(i => startPage + i);

    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  }

  render() {
    let pager = this.state.pager;
    if (!pager.pages || pager.pages.length <= 1) {
      return null;
    }

    return (
      <ul className="pagination justify-content-center">
        <li className={pager.currentPage === 1 ? 'page-item disabled' : ''}>
          <a className="page-link" href="/#" onClick={() => this.setPage(1)}>
            First
          </a>
        </li>
        <li className={pager.currentPage === 1 ? 'page-item disabled' : ''}>
          <a className="page-link" href="/#" onClick={() => this.setPage(pager.currentPage - 1)}>
            Prev
          </a>
        </li>
        {pager.pages.map((page, index) => (
          <li key={index} className={pager.currentPage === page ? 'page-item active' : ''}>
            <a className="page-link" href="/#" onClick={() => this.setPage(page)}>
              {page}
            </a>
          </li>
        ))}
        <li className={pager.currentPage === pager.totalPages ? 'page-item disabled' : ''}>
          <a className="page-link" href="/#" onClick={() => this.setPage(pager.currentPage + 1)}>
            Next
          </a>
        </li>
        <li className={pager.currentPage === pager.totalPages ? 'page-item disabled' : ''}>
          <a className="page-link" href="/#" onClick={() => this.setPage(pager.totalPages)}>
            Last
          </a>
        </li>
      </ul>
    );
  }
}

Pagination.propTypes = propTypes;
