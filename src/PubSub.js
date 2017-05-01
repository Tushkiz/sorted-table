/** Class representing a Publish Subscribe mechanism. */
class PubSub {
  /**
   * Create a PubSub.
   */
  constructor () {
    this.topics = {};
  }
  
  /**
   * Subscribe to a topic
   * @param {string} topic - The topic to subscribe to.
   * @param {function} callback - The callback to be called.
   * 
   * @return {function} The unsubscribe function.
   */
  subscribe (topic, callback) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }

    this.topics[topic].push(callback);

    return () => {
      let index = this.topics[topic].indexOf(callback);
      this.topics[topic].splice(index, 1);
    }
  }

  /**
   * Publish for a topic
   * @param {string} topic - The topic to publish to.
   * @param {*} data - The data to be passed.
   * 
   * @return {boolean} Successful publish status
   */
  publish (topic, data) {
    if (!this.topics[topic]) {
      return false;
    }
    
    setTimeout(() => {
      const subscribers = this.topics[topic];
      let len = subscribers ? subscribers.length : 0;

      while (len--) {
        subscribers[len](data);
      }
    }, 0);

    return true;
  }
}

let instance = null;

exports.PubSub = () => {
  if (!instance) {
    instance = new PubSub();
  }
  
  return instance;
}