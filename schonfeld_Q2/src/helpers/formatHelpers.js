// scale/format data coming from json file/api. Used by App.js

const dateFormat = dateString => {
  let date = new Date(Number(dateString) * 1000);
  return date.toLocaleDateString();
};

const tradeTypeFormat = qty => {
  return qty < 0 ? 'SHORT' : 'LONG';
};
const qtyFormat = qty => {
  return Math.abs(qty);
};

export const scaleTradeExecutionData = jsonData =>
  jsonData.map(tradeData => {
    tradeData['execution_timestamp'] = dateFormat(tradeData['execution_timestamp']);
    tradeData['type'] = tradeTypeFormat(tradeData['quantity']);
    tradeData['quantity'] = qtyFormat(tradeData['quantity']);
    return tradeData;
  });
