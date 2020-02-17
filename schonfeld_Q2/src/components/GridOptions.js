import React from 'react';
import { sortTypes } from '../helpers/sortTypes';
import { headerKeys } from '../helpers/headerKeys';
import PropTypes from 'prop-types';

const propTypes = {
  onPageSizeChange: PropTypes.func.isRequired,
  defaultPageSize: PropTypes.number,
  isDarkMode: PropTypes.bool.isRequired,
  onToggleDarkMode: PropTypes.func.isRequired,
  sort: PropTypes.object.isRequired,
};

export const GridOptions = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm">
          <label>
            Page Size:
            <select
              value={props.defaultPageSize}
              onChange={e => {
                props.onPageSizeChange(e);
              }}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>
          </label>
        </div>
        <div className="col-sm">
          <label>
            Enable Dark Mode:{' '}
            <input type="checkbox" checked={props.isDarkMode} onChange={props.onToggleDarkMode} />
          </label>
        </div>
        <div className="col-sm">
          <span>
            Data Sorted by:{' '}
            <strong>
              {props.sort.column ? headerKeys[props.sort.column] : 'N/A - click header to sort'}
            </strong>
          </span>
          {props.sort.column && <i className={`fas fa-${sortTypes[props.sort.direction].class}`} />}
        </div>
      </div>
    </div>
  );
};

GridOptions.propTypes = propTypes;
