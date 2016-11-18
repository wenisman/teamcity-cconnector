import Client from './client';

export default class Project extends Client {

  /**
   * @constructor
   */
  constructor (baseurl, username, password) {
    super(baseurl, username, password);
    this._baseUrl = `${this._baseUrl}/projects/`;
  }

  /**
   * Get the project that matches the name provided
   * @param {string} name - the name of the project
   */
  async get (args) {
    return await super._get({ uri: `${this._baseUrl}name:${args.name}` });
  }

  /**
   * Create a basic project with the name provided
   * @param {string} args.name - the name of the project to create
   * @param {string} args.parent - the name of the parent that this project belongs to
   */
  async create (args) {
    return await this._post({ uri: this._baseUrl }, this._createRequestJson(args));
  }

  /**
   * Update the project with the provided data
   * @param {project} data - the full data object required to build a project
   */
  async update (data) {
    return await this._put({ uri: this._baseUrl }, data);
  }

  /**
   * Delete the project with the provided name
   * @param {string} name - the name of the project to delete
   */
  async delete (args) {
    return await super._delete({ uri: `${this._baseUrl}name:${args.name}` });
  }

  _createRequestJson (args) {
    var projJson = { name: args.name };

    if (args.parent) {
      projJson.parentProject = {
        locator: `name:${args.parent}`
      };
    }

    return projJson;
  }
};
