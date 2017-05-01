var PubSub = require('../src/PubSub').PubSub();

describe('PubSub', () => {
  it('should add subscribers', () => {
    const callback = (data) => console.log(data);
    const topic = 'TEST'
    PubSub.subscribe(topic, callback);

    expect(PubSub.topics[topic]).toContain(callback);
  });


  it('should remove subscribers', () => {
    const callback1 = (data) => console.log('1', data);
    const callback2 = (data) => console.log('2', data);
    const topic = 'TEST'
    
    const unsubscribe1 = PubSub.subscribe(topic, callback1);
    const unsubscribe2 = PubSub.subscribe(topic, callback2);
    unsubscribe1();

    expect(PubSub.topics[topic]).not.toContain(callback1);
    expect(PubSub.topics[topic]).toContain(callback2);
  });

  // it('should call all subscribers on publish', () => {})

});