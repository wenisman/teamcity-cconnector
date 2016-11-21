import Client from './client';
import Promise from 'bluebird';

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
   * @param {string} args.name - the name of the buildType to look for
   * @param {string} args.project - the name of the parent project for the buildType
   */
  async get (args) {
    return await super._get({ uri: `${this._createBuildTypesUrl(args.project)}name:${args.name}` });
  }

  /**
   * Create the request to send to teamcity
   * @param {string} args.name - the name of the buildType to create
   * @param {string} args.projectId - the name of the project the buildType will belong to
   * @param {string} args.projectName - the name of the project to place the buildtype in
   * @param {string} args.template - the id of the template to use for the buildType
   */
  async create (args) {
    return await this._post({ uri: this._buildTypesUrl }, this._createRequestJson(args));
  }

  /**
   * create the parameters on the specified build type
   * @param {string} args.buildTypeId - the id of the build type of create the parameters on
   * @param {object} args.parameters - the object setting the value of the paramters by name
   *                                   {name1: value1, name2: value2}
   */
  async addParameters (args) {
    return await Promise.all(this._createParameterRequests(args));
  }

  _createBuildTypesUrl (project) {
    return `${this._baseUrl}/projects/name:${project}/buildTypes/`;
  }

  _createRequestJson (args) {
    var request = {
      name: args.name
    };

    request.project = {
      locator: args.projectName
                ? `name:${args.projectName}`
                : `id:${args.projectId}`
    };

    if (args.template) {
      request.template = {
        id: args.template
      };
    }

    return request;
  }

  async _createParameterRequests (args) {
    let requests = [];
    for (let parameter in args.parameters) {
      let uri = `${this._buildTypesUrl}id:${args.buildTypeId}/parameters/${parameter}`;
      requests.push(this._put({uri: uri}, { value: args.parameters[parameter] }));
    }
    return requests;
  }
}
