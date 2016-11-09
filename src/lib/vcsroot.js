import Client from './client';

export default class VcsRoot extends Client {

  /**
   * @constructor
   */
  constructor (baseUrl, name, password) {
    super(baseUrl, name, password);
    this._baseUrl = `${this._baseUrl}/vcs-roots/`;
  }

  /**
   * Get the vcs root that matches the name provided
   * @param {string} name - the name of the vcs root to look for
   */
  async get (name) {
    return await super._get({ uri: `${this._baseUrl}name:${name}` });
  }

  /**
   * Create the request to send to teamcity
   * @param {string} options.name - (Required) the name of the Vcs Root to create
   * @param {string} options.projectName - the name of the project the VcsRoot will belong to
   * @param {string} options.projectId - the name of the project the VcsRoot will belong to
   * @param {string} options.url - (Required) the url to the repository to use for the vcs root
   * @param {string} options.branch - the main branch to use for the repository
   * @param {string} options.vcsType - (Required) the type of vcs connector to use [jetbrains.get|perforce|svn|tfs]
   */
  async create (options) {
    return await super._post({ uri: this._baseUrl }, this._createRequestJson(options));
  }

  async delete (name) {
    return await super._delete({ uri: `${this._baseUrl}name:${name}` });
  }

  _createRequestJson (args) {
    var request = {
      name: args.name,
      projectLocator: args.projectName
                      ? `name:${args.projectName}`
                      : `id:${args.projectId}`,
      properties: {
        property: [
          { name: 'url', value: args.url }
        ]
      },
      vcsName: args.vcsType
    };

    if (args.branch) {
      request.properties.property.push({ name: 'branch', value: args.branch });
    }

    return request;
  }
}
