var ExchangeTable = require('../src/ExchangeTable').ExchangeTable;

describe('ExchangeTable', () => {
  it('should add currency pair to map', () => {
    const currencyPair = { name: 'gbpusd', bestAsk: 10, bestBid: 11, sparklinePoints: [11, 12] }
    const exchangeTable = new ExchangeTable();
    const currencyPairMap = exchangeTable.addCurrencyPair(currencyPair);
    expect(currencyPairMap[currencyPair.name].data.name).toBe(currencyPair.name);
  });

});