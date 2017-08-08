const Client = require('./client');
const Task = require('folktale/concurrency/task');

const baseUri = (args) => {
  return `${Client.createBaseUrl(args.host)}/projects/name:${args.project}/parameters`;
};

const parameterUri = (args) => {
  return `${baseUri(args)}/${args.name}`;
};

const list = (args) => {
  args.uri = baseUri(args);
  return Client.get(args);
};

const get = (args) => {
  args.uri = parameterUri(args);
  return Client.get(args);
};

const put = (args) => {
  args.uri = parameterUri(args);
  return Client.put(args);
};

const post = (args) => {
  args.uri = parameterUri(args);
  return Client.post(args);
};

const del = (args) => {
  args.uri = parameterUri(args);
  return Client.del(args);
};

const createRequestJson = (args) => {
  let data = {
    name: args.name,
    value: args.value,
    own: true
  };

  if (args.isPassword) {
    data.type = {
      rawValue: `password label='${args.name}'`
    };
  }

  if (args.isHidden) {
    data.type.rawValue = `${data.type.rawValue} display='hidden'`;
  }

  return data;
};

const create = (args) => {
  args.body = createRequestJson(args);
  return get(args)
    .chain(result => {
      return put(args);
    })
    .orElse(() => {
      // the parameter doesnt exist so create one
      return post(args);
    });
};

const remove = (args) => {
  return get(args)
    .chain(result => {
      return Task.of(true);
    })
    .orElse(() => {
      // the parameter doesnt exist
      return del(args);
    });
};

module.exports = {
  get,
  list,
  create,
  remove
};
