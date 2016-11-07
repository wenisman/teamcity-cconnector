import * as lib from 'lib';

/**
 * The Teamcity connector to search teamcity and to create projects
 * @class
 */
export default class TeamcityConnector {
  /**
   * @constructor
   */
  constructor (baseUrl, username, password) {
    this._project = new lib.Project(baseUrl, username, password);
    this._buildType = new lib.BuildType(baseUrl, username, password);
    this._vcsRoot = new lib.VcsRoot(baseUrl, username, password);
  }

  get Project () { return this._project; }
  get BuildType () { return this._buildType; }
  get VcsRoot () { return this._vcsRoot; }
}

