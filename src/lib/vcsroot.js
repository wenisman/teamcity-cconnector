import Client from './client';

export default class VcsRoot extends Client {
  constructor (baseUrl, name, password) {
    super(baseUrl, name, password);
    this._baseUrl = `${this._baseUrl}/vcs-roots/`;
  }

  /**
   * Get the vcs root that matches the name provided
   * @param {string} name - the name of the vcs root to look for
   */
  async get (name) {
    return super.get(`${this._baseUrl}name:${name}`);
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
    return this.post({ uri: this._baseUrl }, this._createRequestJson(options));
  }

  _createRequestJson (args) {
    var request = {
      name: args.name,
      projectLocator: args.projectName
                      ? encodeURI(`name:${args.projectName}`)
                      : encodeURI(`id:${args.projectId}`),
      properties: {
        property: [ ]
      },
      vcsName: args.vcsType
    };

    if (args.url) {
      request.properties.property.push({ name: 'url', value: args.url });
    }

    if (args.branch) {
      request.properties.property.push({ name: 'branch', value: args.branch });
    }

    return request;
  }
}
