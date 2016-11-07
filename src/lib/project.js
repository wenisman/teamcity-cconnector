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
  async get (name) {
    return super._get({ uri: `${this._baseUrl}name:${name}` });
  }

  /**
   * Create a basic project with the name provided
   * @param {string} parentId - the Id of the parent that this project belongs to
   */
  async create (name, parentId) {
    return this._post({ uri: this._baseUrl }, this._createRequestJson({name, parentId}));
  }

  /**
   * Update the project with the provided data
   * @param {project} data - the full data object required to build a project
   */
  async update (data) {
    return this._put({ uri: this._baseUrl }, data);
  }

  /**
   * Delete the project with the provided name
   * @param {string} name - the name of the project to delete
   */
  async delete (parent) {
    return super._delete({ uri: `${this._baseUrl}name:${parent}` });
  }

  _createRequestJson (args) {
    var projJson = { name: args.name };

    if (args.parentId) {
      projJson.parentProject = {
        id: args.parentId
      };
    }

    return projJson;
  }
};
