'use strict';

var _project = require('../src/lib/project');

var _project2 = _interopRequireDefault(_project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

describe('project library', function () {
  var proj = null;

  before(function () {
    proj = new _project2.default('http://192.168.99.100:8111', 'testusr', 'testpwd');
  });

  beforeEach(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var existing;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return proj.get('Parent');

          case 2:
            existing = _context.sent;

            if (!existing.isNothing) {
              _context.next = 8;
              break;
            }

            _context.next = 6;
            return proj.create('Parent');

          case 6:
            _context.next = 8;
            return proj.create('Child', 'Parent');

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  afterEach('should delete a project', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  it('should get a project', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var _arr, _i, projectName, result, projectInfo;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _arr = ['Parent', 'Child'];
            _i = 0;

          case 2:
            if (!(_i < _arr.length)) {
              _context3.next = 12;
              break;
            }

            projectName = _arr[_i];
            _context3.next = 6;
            return proj.get(projectName);

          case 6:
            result = _context3.sent;
            projectInfo = result.getOrElse(false);

            projectInfo.name.should.equal(projectName);

          case 9:
            _i++;
            _context3.next = 2;
            break;

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));
});
//# sourceMappingURL=project.js.map