'use strict';

var _vcsroot = require('../src/lib/vcsroot');

var _vcsroot2 = _interopRequireDefault(_vcsroot);

var _project = require('../src/lib/project');

var _project2 = _interopRequireDefault(_project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

describe('VcsRoot tests', function () {
  var vcs = void 0,
      proj = void 0;

  before(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            proj = new _project2.default('http://192.168.99.100:8111', 'testusr', 'testpwd');
            vcs = new _vcsroot2.default('http://192.168.99.100:8111', 'testusr', 'testpwd');

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
            return proj.get('Parent');

          case 2:
            existing = _context2.sent;

            if (!existing.isNothing) {
              _context2.next = 8;
              break;
            }

            _context2.next = 6;
            return proj.create('Parent');

          case 6:
            _context2.next = 8;
            return proj.create('Child', 'Parent');

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
            _context3.next = 2;
            return proj.delete('Parent');

          case 2:
            _context3.next = 4;
            return vcs.delete('Test Vcs Root');

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  it('should create a vcsroot', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var output;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return vcs.create({
              name: 'Test Vcs Root',
              projectName: 'Child',
              url: 'https://github.com/wenisman/teamcity-connector.git',
              branch: 'master',
              vcsType: 'jetbrains.git'
            });

          case 2:
            output = _context4.sent;


            output.isNothing.should.be.false;

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});
//# sourceMappingURL=vcstoot.js.map