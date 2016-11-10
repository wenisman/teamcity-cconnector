'use strict';

var _proxyquire = require('proxyquire');

var _proxyquire2 = _interopRequireDefault(_proxyquire);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _data = require('data.maybe');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

describe('base client tests', function () {
  var client = void 0,
      request = void 0,
      spy = void 0;
  var assert = _chai2.default.assert;
  beforeEach(function () {
    request = _sinon2.default.stub();
    spy = _sinon2.default.spy(request);

    var Client = (0, _proxyquire2.default)('../src/lib/client', {
      'request-promise': {
        get: request,
        '@noCallThru': true
      }
    }).default;

    client = new Client('http://192.168.99.100:8111', 'testusr', 'testpwd');
  });

  it('should fail on invalid uri', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            before(function () {
              request.throws({ status: 400 });
            });

            _context.next = 3;
            return client._get({ uri: 'a' }).then(function (result) {
              assert.fail(null, null, 'no result should be returned');
            }).catch(function (e) {
              // noop
              spy.threw();
            });

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('should return nothing when url not found', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            before(function () {
              request.throws({ statusCode: 404 });
            });

            client._get({ uri: 'something' }).then(function (result) {
              result.getOrElse(true).should.be.true;
            });

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));
});
//# sourceMappingURL=client.js.map