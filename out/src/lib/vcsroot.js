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

var VcsRoot = function (_Client) {
  _inherits(VcsRoot, _Client);

  /**
   * @constructor
   */
  function VcsRoot(baseUrl, name, password) {
    _classCallCheck(this, VcsRoot);

    var _this = _possibleConstructorReturn(this, (VcsRoot.__proto__ || Object.getPrototypeOf(VcsRoot)).call(this, baseUrl, name, password));

    _this._baseUrl = _this._baseUrl + '/vcs-roots/';
    return _this;
  }

  /**
   * Get the vcs root that matches the name provided
   * @param {string} name - the name of the vcs root to look for
   */


  _createClass(VcsRoot, [{
    key: 'get',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(name) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _get(VcsRoot.prototype.__proto__ || Object.getPrototypeOf(VcsRoot.prototype), '_get', this).call(this, { uri: this._baseUrl + 'name:' + name });

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
     * @param {string} options.name - (Required) the name of the Vcs Root to create
     * @param {string} options.projectName - the name of the project the VcsRoot will belong to
     * @param {string} options.projectId - the name of the project the VcsRoot will belong to
     * @param {string} options.url - (Required) the url to the repository to use for the vcs root
     * @param {string} options.branch - the main branch to use for the repository
     * @param {string} options.vcsType - (Required) the type of vcs connector to use [jetbrains.get|perforce|svn|tfs]
     */

  }, {
    key: 'create',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(options) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _get(VcsRoot.prototype.__proto__ || Object.getPrototypeOf(VcsRoot.prototype), '_post', this).call(this, { uri: this._baseUrl }, this._createRequestJson(options));

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
  }, {
    key: 'delete',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(name) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _get(VcsRoot.prototype.__proto__ || Object.getPrototypeOf(VcsRoot.prototype), '_delete', this).call(this, { uri: this._baseUrl + 'name:' + name });

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _delete(_x3) {
        return _ref3.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: '_createRequestJson',
    value: function _createRequestJson(args) {
      var request = {
        name: args.name,
        projectLocator: args.projectName ? 'name:' + args.projectName : 'id:' + args.projectId,
        properties: {
          property: [{ name: 'url', value: args.url }]
        },
        vcsName: args.vcsType
      };

      if (args.branch) {
        request.properties.property.push({ name: 'branch', value: args.branch });
      }

      return request;
    }
  }]);

  return VcsRoot;
}(_client2.default);

exports.default = VcsRoot;
//# sourceMappingURL=vcsroot.js.map