'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lib = require('./lib');

var lib = _interopRequireWildcard(_lib);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The Teamcity connector to search teamcity and to create projects
 * @class
 */
var TeamcityConnector = function () {
  /**
   * @constructor
   */
  function TeamcityConnector(baseUrl, username, password) {
    _classCallCheck(this, TeamcityConnector);

    this._project = new lib.Project(baseUrl, username, password);
    this._buildType = new lib.BuildType(baseUrl, username, password);
    this._vcsRoot = new lib.VcsRoot(baseUrl, username, password);
  }

  _createClass(TeamcityConnector, [{
    key: 'project',
    get: function get() {
      return this._project;
    }
  }, {
    key: 'buildtype',
    get: function get() {
      return this._buildType;
    }
  }, {
    key: 'vcsroot',
    get: function get() {
      return this._vcsRoot;
    }
  }]);

  return TeamcityConnector;
}();

exports.default = TeamcityConnector;
//# sourceMappingURL=index.js.map