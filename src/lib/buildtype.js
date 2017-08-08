const Client = require('./client');
const R = require('ramda');
const Task = require('folktale/concurrency/task');

const baseUri = (args) => {
  return `${Client.createBaseUrl(args.host)}/projects/name:${args.project}/buildTypes`;
};

const buildTypeUri = (args) => {
  return `${Client.createBaseUrl(args.host)}/buildTypes`;
};

const buildTypeProjectUri = (args) => {
  return `${baseUri(args)}/name:${args.name}`;
};

const get = (args) => {
  args.uri = buildTypeProjectUri(args);
  return Client.get(args);
};

const create = (args) => {
  return get(args)
    .orElse(() => {
      args.body = createRequestJson(args);
      return Client.post(args);
    });
};

const addParameters = (args) => {
  return Task.waitAll(R.map(createParameterRequests(args)));
};

const createParameterRequests = (args) => {
  let requests = [];
  args.parameters.forEach((parameter) => {
    args.uri = `${buildTypeUri(args)}/id:${args.buildTypeId}/parameters/${parameter.name}`;
    args.body = { value: parameter.value };
    requests.push(Client.put(args));
  });

  return requests;
};

const createRequestJson = (args) => {
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
};

module.exports = {
  get,
  create,
  addParameters
};
