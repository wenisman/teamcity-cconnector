const { task } = require('folktale/concurrency/task');
const request = require('request');

const createBaseUrl = (host) => {
  return `http://${host}/httpAuth/app/rest`;
};

const createRestOptions = (args) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    json: true,
    auth: {
      user: args.username,
      pass: args.password,
      sendImmediately: true
    },
    body: args.body || {}
  };
};

const sendRequest = (fn, args) => {
  const options = createRestOptions(args);
  return task((resolver) => {
    let inputs = [encodeURI(args.uri), options, (err, response, data) => {
      let statusCode = (response && response.statusCode) || 200;
      if (err || statusCode !== 200) {
        return resolver.reject({ statusCode, err, data });
      } else {
        return resolver.resolve({response, data});
      }
    }];
    fn.apply(request, inputs);
  });
};

const get = (args) => {
  return sendRequest(request.get, args);
};

const put = (args) => {
  return sendRequest(request.put, args);
};

const post = (args) => {
  return sendRequest(request.post, args);
};

const del = (args) => {
  return sendRequest(request.delete, args);
};

module.exports = {
  createBaseUrl,
  get,
  put,
  post,
  del
};
