const Task = require('data.task');
const request = require('request');

const createBaseUrl = (host) => {
  return `${host}/httpAuth/app/rest`;
};

const createRestOptions = (username, password) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    json: true,
    auth: {
      'user': username,
      'pass': password,
      'sendImmediately': true
    }
  };
};

const sendRequest = (fn, uri, options) => {
  return new Task(function (resolve, reject) {
    let args = [encodeURI(uri), options, (err, response, data) => {
      if (err) {
        reject(err);
      } else {
        resolve({response, data});
      }
    }];
    fn.apply(request, args);
  });
};

const get = (args) => {
  const options = createRestOptions(args.username, args.password);
  return sendRequest(request.get, args.uri, options);
};

const put = (args) => {
  let options = createRestOptions(args.username, args.password);
  options.body = args.data;
  return sendRequest(request.put, args.uri, options);
};

const post = (args) => {
  let options = createRestOptions(args.username, args.password);
  options.body = args.data;
  return sendRequest(request.post, args.uri, options);
};

const del = (args) => {
  const options = createRestOptions(args.username, args.password);
  return sendRequest(request.delete, args.uri, options);
};

module.exports = {
  createBaseUrl,
  get,
  put,
  post,
  del
};
