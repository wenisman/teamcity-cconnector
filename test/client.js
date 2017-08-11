/*
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import chai from 'chai';

describe('base client tests', () => {
  let client, request, spy;
  let assert = chai.assert;
  beforeEach(() => {
    request = sinon.stub();
    spy = sinon.spy(request);

    const Client = proxyquire('../src/lib/client', {
      'request-promise': {
        get: request,
        '@noCallThru': true
      }
    }).default;

    client = new Client('http://192.168.99.100:8111', 'testusr', 'testpwd');
  });

  it('should fail on invalid uri', async () => {
    before(() => {
      request.throws({ status: 400 });
    });

    await client
      ._get({ uri: 'a' })
      .then((result) => {
        assert.fail(null, null, 'no result should be returned');
      })
      .catch((e) => {
        // noop
        spy.threw();
      });
  });

  it('should return nothing when url not found', async () => {
    before(() => {
      request.throws({ statusCode: 404 });
    });

    client
      ._get({ uri: 'something' })
      .then((result) => {
        result.getOrElse(true).should.be.true;
      });
  });
});
*/
