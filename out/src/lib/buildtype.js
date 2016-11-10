'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
   * @param {string} name - the name of the buildType to look for
   * @param {string} project - the name of the parent project for the buildType
   */


  _createClass(BuildType, [{
    key: 'get',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(name, project) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _get(BuildType.prototype.__proto__ || Object.getPrototypeOf(BuildType.prototype), '_get', this).call(this, { uri: this._createBuildTypesUrl(project) + 'name:' + name });

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return get;
    }()

    /**
     * Create the request to send to teamcity
     * @param {string} args.name - the name of the buildType to create
     * @param {string} args.project - the name of the project the buildType will belong to
     * @param {string} args.template - the id of the template to use for the buildType
     */

  }, {
    key: 'create',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(name, project, template) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._post({ uri: this._createBuildTypesUrl(project) }, this._createRequestJson({ name: name, template: template }));

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function create(_x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
      }

      return create;
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

      if (args.template) {
        request.template = {
          id: args.template
        };
      }

      return request;
    }
  }]);

  return BuildType;
}(_client2.default);

exports.default = BuildType;
//# sourceMappingURL=buildtype.js.map