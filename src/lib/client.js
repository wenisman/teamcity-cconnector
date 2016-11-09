import request from 'request-promise';
import maybe from 'data.maybe';

export default class Client {

  constructor (baseurl, username, password) {
    this._baseUrl = `${baseurl}/httpAuth/app/rest`;
    this._options = {
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

    if (!!username && !!password) {
      Object.assign(this._options, { auth: { user: username, pass: password, sendImmediately: true } });
    }
  }

  async _get (options) {
    return this._executeRequest('get', options);
  }

  async _put (options, data) {
    options = Object.assign(options, { body: data });
    return this._executeRequest('put', options);
  }

  async _post (options, data) {
    options = Object.assign(options, { body: data });
    return this._executeRequest('post', options);
  }

  async _delete (options) {
    return this._executeRequest('delete', options);
  }

  async _executeRequest (requestName, options) {
    options = Object.assign(options, this._options);
    options.uri = encodeURI(options.uri);
    try {
      return maybe.fromNullable(await request[requestName](options));
    } catch (e) {
      if (e.statusCode === 404) {
        return maybe.Nothing();
      }

      throw e;
    }
  }
}

