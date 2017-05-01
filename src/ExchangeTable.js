var CurrencyPair = require('./CurrencyPair').CurrencyPair;
var PubSub = require('./PubSub').PubSub();

var CURRENCY_PAIR_UPDATE = require('./topics').CURRENCY_PAIR_UPDATE;
var UPDATE_TABLE = require('./topics').UPDATE_TABLE;

/** Class representing the Exchange Table. */
class ExchangeTable {
  /**
   * Create a ExchangeTable.
   */
  constructor () {
    this.currencyPairMap = {}
    this.$el = document.querySelectorAll('.exchange-table__body')[0];
    PubSub.subscribe(CURRENCY_PAIR_UPDATE, this.addCurrencyPair.bind(this));
    PubSub.subscribe(UPDATE_TABLE, this.update.bind(this));
  }

  /**
   * Add/Update a Currency Pair to map
   * @param {CurrencyPair} pair - The Currency Pair object.
   * 
   * @return {Object} The object map containing all the Currency Pairs.
   */
  addCurrencyPair (pair) {
    let sparklinePoints = this.currencyPairMap[pair.name] && this.currencyPairMap[pair.name].data.sparklinePoints || [];
    pair.sparklinePoints = [...sparklinePoints, (pair.bestAsk + pair.bestBid) / 2];
    this.currencyPairMap[pair.name] = new CurrencyPair(pair);
    return this.currencyPairMap;
  }

  /**
   * Update the table to DOM
   * 
   * @return {Object} the DOM element.
   */
  update () {
    this.$el.innerHTML = this.toHTMLString(this.currencyPairMap);
    this.updateAllSparklines(this.currencyPairMap);
    return this.$el;
  }

  /**
   * Updates all the sparkline elements 
   * @param {Object} map - The currency pair map.
   * 
   */
  updateAllSparklines (map) {
    Object.keys(map)
      .map(key => map[key])
      .forEach((pair) => pair.updateSparklines());
  }
  
  /**
   * Exchange Table HTML
   * 
   * @return {string} HTML string representing the Exchange Table.
   */
  toHTMLString (map) {
    return Object.keys(map)
      .map(key => map[key])
      .sort((a, b) => a.data.lastChangeBid - b.data.lastChangeBid)
      .map(pair => pair.toHTMLString())
      .join('');
  }
}

exports.ExchangeTable = ExchangeTable;