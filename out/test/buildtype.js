'use strict';

var _buildtype = require('../src/lib/buildtype');

var _buildtype2 = _interopRequireDefault(_buildtype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

describe('buildType tests', function () {
  var bt = null;
  before(function () {
    bt = new _buildtype2.default('http://192.168.99.100:8111', 'testusr', 'testpwd');
  });

  it('should create a buildType', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return bt.create('test build', 'TestProject_TestSubproject', 'NetBuildTest');

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
});
//# sourceMappingURL=buildtype.js.map