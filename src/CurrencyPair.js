/** Class representing a Currency Pair. */
class CurrencyPair {
  /**
   * Create a CurrencyPair.
   * @param {object} data - currency pair data
   */
  constructor (data) {
    this.data = data;
  }

  /**
   * Updates the sparklines
   * 
   * @return {Array} empty array of sparkline points.
   */
  updateSparklines () {
    const sparklineEl = document.querySelectorAll(`#sparkline__${this.data.name}`)[0];
    Sparkline.draw(sparklineEl, this.data.sparklinePoints)
    return this.data.sparklinePoints = [];
  }

  /**
   * Currency Pair HTML
   * 
   * @return {string} HTML string representing the Currency Pair.
   */
  toHTMLString () {
    return `
      <tr>
        <td>${this.data.name}</td>
        <td>${this.data.bestBid}</td>
        <td>${this.data.bestAsk}</td>
        <td>${this.data.lastChangeAsk}</td>
        <td>${this.data.lastChangeBid}</td>
        <td><span id="sparkline__${this.data.name}"></span></td>
      </tr>
    `;
  }
}

exports.CurrencyPair = CurrencyPair;