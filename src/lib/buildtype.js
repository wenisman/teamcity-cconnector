import Client from './client';

export default class BuildType extends Client {

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
    return super._get(`${this._createBuildTypesUrl(project)}name:${name}`);
  }

  /**
   * Create the request to send to teamcity
   * @param {string} args.name - the name of the buildType to create
   * @param {string} args.projectId - the id of the project the buildType will belong to
   * @param {string} args.template - the id of the template to use for the buildType
   */
  async create (name, projectId, template) {
    return this._post({ uri: this._buildTypesUrl }, this._createRequestJson({name, projectId, template}));
  }

  _createBuildTypesUrl (project) {
    return `${this._baseUrl}name:${project}/buildTypes/`;
  }

  _createRequestJson (args) {
    var request = {
      name: args.name,
      projectId: args.projectId
    };

    if (args.template) {
      request.template = {
        id: args.template
      };
    }

    return request;
  }
}
