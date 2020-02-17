// helper file to sort data based on column data type.
// time permitting, lots of potential to refactor this code.

export const sortTypes = {
  asc: {
    class: 'sort-up',
    id: (a, b) => a.id - b.id,
    execution_timestamp: (a, b) => {
      let aa = a.execution_timestamp.split('/');
      let bb = b.execution_timestamp.split('/');
      //sorting by YY > MM > DD
      return aa[2] - bb[2] || aa[0] - bb[0] || aa[1] - bb[1];
    },
    type: (a, b) => {
      let typeA = a.type.toUpperCase();
      let typeB = b.type.toUpperCase();
      if (typeA < typeB) {
        return -1;
      }
      if (typeB < typeA) {
        return 1;
      }
      return 0;
    },
    quantity: (a, b) => a.quantity - b.quantity,
    symbol: (a, b) => {
      let typeA = a.symbol.toUpperCase();
      let typeB = b.symbol.toUpperCase();
      if (typeA < typeB) {
        return -1;
      }
      if (typeB < typeA) {
        return 1;
      }
      return 0;
    },
    portfolio_manager: (a, b) => {
      let aa = a.portfolio_manager.split(' ')[0];
      let bb = b.portfolio_manager.split(' ')[0];
      if (aa < bb) {
        return -1;
      }
      if (aa > bb) {
        return 1;
      }
      return 0;
    },
  },
  desc: {
    class: 'sort-down',
    id: (a, b) => b.id - a.id,
    execution_timestamp: (a, b) => {
      let aa = a.execution_timestamp.split('/');
      let bb = b.execution_timestamp.split('/');
      //sorting by YY > MM > DD
      return bb[2] - aa[2] || bb[0] - aa[0] || bb[1] - aa[1];
    },
    type: (a, b) => {
      let typeA = a.type.toUpperCase();
      let typeB = b.type.toUpperCase();
      if (typeA > typeB) {
        return -1;
      }
      if (typeB > typeA) {
        return 1;
      }
      return 0;
    },
    quantity: (a, b) => b.quantity - a.quantity,
    symbol: (a, b) => {
      let typeA = a.symbol.toUpperCase();
      let typeB = b.symbol.toUpperCase();
      if (typeA > typeB) {
        return -1;
      }
      if (typeB > typeA) {
        return 1;
      }
      return 0;
    },
    portfolio_manager: (a, b) => {
      let aa = a.portfolio_manager.split(' ')[0];
      let bb = b.portfolio_manager.split(' ')[0];
      if (aa > bb) {
        return -1;
      }
      if (aa < bb) {
        return 1;
      }
      return 0;
    },
  },
};
