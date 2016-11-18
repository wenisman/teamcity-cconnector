'use strict';

var _buildtype = require('../src/lib/buildtype');

var _buildtype2 = _interopRequireDefault(_buildtype);

var _project = require('../src/lib/project');

var _project2 = _interopRequireDefault(_project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

describe.only('buildType tests', function () {
  var bt = void 0,
      proj = void 0;

  before(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            proj = new _project2.default('http://localhost:8111', 'testusr', 'testpwd');
            bt = new _buildtype2.default('http://localhost:8111', 'testusr', 'testpwd');

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  beforeEach(_asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var existing;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return proj.get({ name: 'Parent' });

          case 2:
            existing = _context2.sent;

            if (!existing.isNothing) {
              _context2.next = 8;
              break;
            }

            _context2.next = 6;
            return proj.create({ name: 'Parent' });

          case 6:
            _context2.next = 8;
            return proj.create({ name: 'Child', parent: 'Parent' });

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  afterEach('should delete a project', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  it('should create a buildType', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var build, output;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return bt.get({ name: 'test build', project: 'Child' });

          case 2:
            build = _context4.sent;

            console.log('build', build.getOrElse('nothing'));

            if (!build.isNothing) {
              _context4.next = 10;
              break;
            }

            console.log('creating buld type');
            _context4.next = 8;
            return bt.create({ name: 'test build', projectId: 'Parent_Child', template: 'Default_DotNet_BuildTest' });

          case 8:
            output = _context4.sent;

            console.log(output);

          case 10:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});
//# sourceMappingURL=buildtype.js.map