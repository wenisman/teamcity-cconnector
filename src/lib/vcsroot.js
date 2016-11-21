import Client from './client';
import R from 'ramda';

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
   * @param {string} args.name - the name of the vcs root to look for
   */
  async get (args) {
    return await super._get({ uri: `${this._baseUrl}name:${args.name}` });
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

  async delete (args) {
    return await super._delete({ uri: `${this._baseUrl}name:${args.name}` });
  }

  /**
   * @param {string} args.vcsRootName - the name of the vcsroot
   * @param {array} args.properties - (Required) the object defining the properties to be set
   *                                  [{name: name1, value: value1}]
   */
  async addProperties (args) {
    const vcsRoot = await this.get({ name: args.vcsRootName });

    if (!vcsRoot.isNothing) {
      const newProperties = args.properties;
      const existingProperties = R.differenceWith((x, y) => { x.name === y.name; }, vcsRoot.get().properties, newProperties);
      const properties = existingProperties.concat(newProperties);

      return await this._put({uri: `${this._baseUrl}name:${args.vcsRootName}/properties`}, { property: properties });
    }
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
