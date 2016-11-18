'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _data = require('data.maybe');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = function () {
  function Client(baseurl, username, password) {
    _classCallCheck(this, Client);

    this._baseUrl = baseurl + '/httpAuth/app/rest';
    this._options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      json: true,
      auth: {
        'user': username,
        'pass': password,
        'sendImmediately': true
      }
    };

    if (!!username && !!password) {
      Object.assign(this._options, { auth: { user: username, pass: password, sendImmediately: true } });
    }
  }

  _createClass(Client, [{
    key: '_get',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(options) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', this._executeRequest('get', options));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _get(_x) {
        return _ref.apply(this, arguments);
      }

      return _get;
    }()
  }, {
    key: '_put',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(options, data) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = Object.assign(options, { body: data });
                return _context2.abrupt('return', this._executeRequest('put', options));

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _put(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return _put;
    }()
  }, {
    key: '_post',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(options, data) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                options = Object.assign(options, { body: data });
                return _context3.abrupt('return', this._executeRequest('post', options));

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _post(_x4, _x5) {
        return _ref3.apply(this, arguments);
      }

      return _post;
    }()
  }, {
    key: '_delete',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(options) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt('return', this._executeRequest('delete', options));

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _delete(_x6) {
        return _ref4.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: '_executeRequest',
    value: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(requestName, options) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                options = Object.assign(options, this._options);
                options.uri = encodeURI(options.uri);
                _context5.prev = 2;
                _context5.t0 = _data2.default;
                _context5.next = 6;
                return _requestPromise2.default[requestName](options);

              case 6:
                _context5.t1 = _context5.sent;
                return _context5.abrupt('return', _context5.t0.fromNullable.call(_context5.t0, _context5.t1));

              case 10:
                _context5.prev = 10;
                _context5.t2 = _context5['catch'](2);

                if (!(_context5.t2.statusCode === 404)) {
                  _context5.next = 14;
                  break;
                }

                return _context5.abrupt('return', _data2.default.Nothing());

              case 14:
                throw _context5.t2;

              case 15:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 10]]);
      }));

      function _executeRequest(_x7, _x8) {
        return _ref5.apply(this, arguments);
      }

      return _executeRequest;
    }()
  }]);

  return Client;
}();

exports.default = Client;
//# sourceMappingURL=client.js.map