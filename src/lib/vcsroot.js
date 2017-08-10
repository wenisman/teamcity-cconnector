const Client = require('./client');
const R = require('ramda');

const baseUri = (args) => {
  return `${Client.createBaseUrl(args.host)}/vcs-roots`;
};

const get = (args) => {
  args.uri = `${baseUri(args)}/name:${args.name}`;
  return Client.get(args);
};

/**
 * Create the request to send to teamcity
 * @param {string} args.name - (Required) the name of the Vcs Root to create
 * @param {string} args.projectName - the name of the project the VcsRoot will belong to
 * @param {string} args.projectId - the name of the project the VcsRoot will belong to
 * @param {string} args.url - (Required) the url to the repository to use for the vcs root
 * @param {string} args.branch - the main branch to use for the repository
 * @param {string} args.vcsType - (Required) the type of vcs connector to use [jetbrains.get|perforce|svn|tfs]
 */
const create = (args) => {
  args.uri = baseUri(args);
  args.body = createRequestJson(args);
  return Client.post(args);
};

const createRequestJson = (args) => {
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
};

const remove = (args) => {
  args.uri = `${baseUri(args)}/name:${args.name}`;
  return Client.del(args);
};

/**
 * Set the properties on the vcs root
 * @param {string} args.vcsRootName
 */
const addProperties = (args) => {
  return this.get({ name: args.vcsRootName })
  .chain(vcsRoot => {
    if (!vcsRoot.isNothing) {
      const existingProperties = R.differenceWith((x, y) => { x.name === y.name; },
        vcsRoot.properties.property,
        args.properties);
      const properties = existingProperties.concat(args.properties);

      return Client.put({
        uri: `${baseUri(args)}/name:${args.vcsRootName}/properties`, 
        body: { property: properties }
      });
    }
  });
};

module.exports = {
  get,
  create,
  remove,
  addProperties
};
