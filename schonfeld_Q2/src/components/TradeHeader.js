import React from 'react';
import PropTypes from 'prop-types';
import { headerKeys } from '../helpers/headerKeys';

const propTypes = {
  onSortChange: PropTypes.func.isRequired,
};

//renders table header
export const TradeHeader = props => {
  return (
    <thead className="thead-dark">
      <tr>
        {Object.keys(headerKeys).map((el, i) => {
          return (
            <th key={i} onClick={e => props.onSortChange(e, el)} scope="col">
              {headerKeys[el]}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

TradeHeader.propTypes = propTypes;
