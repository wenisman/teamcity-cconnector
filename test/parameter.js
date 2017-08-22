const connector = require('../src');
const maybe = require('folktale/maybe');

describe.skip('parameter', () => {
  it('should create a basic parameter', async () => {
    let result = await connector.parameter.create({
      host: '192.168.99.100:8111',
      name: 'test-name',
      value: 'test-value',
      username: 'admin',
      password: 'password'
    }).run().promise();

    console.log(result);
    maybe.hasInstance(result).should.be.true;
  });
});
