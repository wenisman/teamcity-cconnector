'use strict';

var _project = require('../src/lib/project');

var _project2 = _interopRequireDefault(_project);

var _Ramda = require('Ramda');

var _Ramda2 = _interopRequireDefault(_Ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

describe('project library', function () {
  var proj = null;
  before(function () {
    proj = new _project2.default('http://192.168.99.100:8111', 'testusr', 'testpwd');
  });

  it('should create a project', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Ramda2.default.pipeP(function (input) {
              return proj.create('test project');
            }, function (input) {
              return proj.create('test subproject', 'TestProject');
            })().then(function (result) {
              console.log(result);
            }, function (exception) {
              console.log(exception);
            });

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('should get a project', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            proj.get('test project');

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  it('should delete a project', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            proj.delete('test project');
            proj.delete('test subproject');

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));
});
//# sourceMappingURL=project.js.map