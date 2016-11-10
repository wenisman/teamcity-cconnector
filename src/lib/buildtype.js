import Client from './client';

export default class BuildType extends Client {

  /**
   * @constructor
   */
  constructor (baseUrl, name, password) {
    super(baseUrl, name, password);
    this._buildTypesUrl = `${this._baseUrl}/buildTypes/`;
  }

  /**
   * Get the buildType that matches the name provided
   * @param {string} name - the name of the buildType to look for
   * @param {string} project - the name of the parent project for the buildType
   */
  async get (name, project) {
    return await super._get({ uri: `${this._createBuildTypesUrl(project)}name:${name}` });
  }

  /**
   * Create the request to send to teamcity
   * @param {string} args.name - the name of the buildType to create
   * @param {string} args.project - the name of the project the buildType will belong to
   * @param {string} args.template - the id of the template to use for the buildType
   */
  async create (name, project, template) {
    return await this._post({ uri: this._createBuildTypesUrl(project) }, this._createRequestJson({name, template}));
  }

  _createBuildTypesUrl (project) {
    return `${this._baseUrl}/projects/name:${project}/buildTypes/`;
  }

  _createRequestJson (args) {
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
}
