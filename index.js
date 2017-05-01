/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */
var ExchangeTable = require('./src/ExchangeTable').ExchangeTable;
var PubSub = require('./src/PubSub').PubSub();

var CURRENCY_PAIR_UPDATE = require('./src/topics').CURRENCY_PAIR_UPDATE;
var UPDATE_TABLE = require('./src/topics').UPDATE_TABLE;

// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
// Apply the styles in style.css to the page.
require('./site/style.css')

// Change this to get detailed logging from the stomp library
global.DEBUG = false

const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url)
client.debug = function(msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

const exchangeTable = new ExchangeTable();
const UPDATE_INTERVAL = 30 * 1000;

function connectCallback() {
  let interval = null;
  
  client.subscribe('/fx/prices', function ({body}) {
    PubSub.publish(CURRENCY_PAIR_UPDATE, JSON.parse(body));
    
    if (interval == null) {
      PubSub.publish(UPDATE_TABLE);
      interval = setInterval(() => {
        PubSub.publish(UPDATE_TABLE);
      }, UPDATE_INTERVAL);
    }
  })
}

client.connect({}, connectCallback, function(error) {
  alert(error.headers.message)
})