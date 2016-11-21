'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BuildType = function (_Client) {
  _inherits(BuildType, _Client);

  /**
   * @constructor
   */
  function BuildType(baseUrl, name, password) {
    _classCallCheck(this, BuildType);

    var _this = _possibleConstructorReturn(this, (BuildType.__proto__ || Object.getPrototypeOf(BuildType)).call(this, baseUrl, name, password));

    _this._buildTypesUrl = _this._baseUrl + '/buildTypes/';
    return _this;
  }

  /**
   * Get the buildType that matches the name provided
   * @param {string} args.name - the name of the buildType to look for
   * @param {string} args.project - the name of the parent project for the buildType
   */


  _createClass(BuildType, [{
    key: 'get',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(args) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _get(BuildType.prototype.__proto__ || Object.getPrototypeOf(BuildType.prototype), '_get', this).call(this, { uri: this._createBuildTypesUrl(args.project) + 'name:' + args.name });

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x) {
        return _ref.apply(this, arguments);
      }

      return get;
    }()

    /**
     * Create the request to send to teamcity
     * @param {string} args.name - the name of the buildType to create
     * @param {string} args.projectId - the name of the project the buildType will belong to
     * @param {string} args.projectName - the name of the project to place the buildtype in
     * @param {string} args.template - the id of the template to use for the buildType
     */

  }, {
    key: 'create',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(args) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._post({ uri: this._buildTypesUrl }, this._createRequestJson(args));

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function create(_x2) {
        return _ref2.apply(this, arguments);
      }

      return create;
    }()

    /**
     * create the parameters on the specified build type
     * @param {string} args.buildTypeId - the id of the build type of create the parameters on
     * @param {object} args.parameters - the object setting the value of the paramters by name
     *                                   {name1: value1, name2: value2}
     */

  }, {
    key: 'addParameters',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(args) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _bluebird2.default.all(this._createParameterRequests(args));

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addParameters(_x3) {
        return _ref3.apply(this, arguments);
      }

      return addParameters;
    }()
  }, {
    key: '_createBuildTypesUrl',
    value: function _createBuildTypesUrl(project) {
      return this._baseUrl + '/projects/name:' + project + '/buildTypes/';
    }
  }, {
    key: '_createRequestJson',
    value: function _createRequestJson(args) {
      var request = {
        name: args.name
      };

      request.project = {
        locator: args.projectName ? 'name:' + args.projectName : 'id:' + args.projectId
      };

      if (args.template) {
        request.template = {
          id: args.template
        };
      }

      return request;
    }
  }, {
    key: '_createParameterRequests',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(args) {
        var requests, parameter, uri;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                requests = [];

                for (parameter in args.parameters) {
                  uri = this._buildTypesUrl + 'id:' + args.buildTypeId + '/parameters/' + parameter;

                  requests.push(this._put({ uri: uri }, { value: args.parameters[parameter] }));
                }
                return _context4.abrupt('return', requests);

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _createParameterRequests(_x4) {
        return _ref4.apply(this, arguments);
      }

      return _createParameterRequests;
    }()
  }]);

  return BuildType;
}(_client2.default);

exports.default = BuildType;
//# sourceMappingURL=buildtype.js.map