const Client = require('./client');
const R = require('ramda');

const baseUri = (args) => {
  return `${Client.createBaseUrl(args.host)}/projects`;
};

const projectUri = (args) => {
  return `${baseUri(args)}/name:${args.name}`;
};

const list = (args) => {
  args.uri = baseUri(args);
  return Client.get(args);
};

const get = (args) => {
  args.uri = projectUri(args);
  return Client.get(args);
};

const put = (args) => {
  args.uri = projectUri(args);
  return Client.put(args);
};

const post = (args) => {
  args.uri = projectUri(args);
  return Client.post(args);
};

const remove = (args) => {
  args.uri = projectUri(args);
  return Client.del(args);
};

const createRequestJson = (args) => {
  var projJson = { name: args.name };

  if (args.parent) {
    projJson.parentProject = {
      locator: `name:${args.parent || '_Root'}`
    };
  }

  return projJson;
};

const create = (args) => {
  return get(args)
    .chain(result => {
      args.body = R.mergeDeepWithKey(result, args.data);
      return put(args);
    })
    .orElse(() => {
      args.body = createRequestJson(args);
      return post(args);
    });
};

module.exports = {
  get,
  list,
  create,
  remove
};
