import request from 'request-promise';
import maybe from 'data.maybe';

export default class Client {

  constructor (baseurl, username, password) {
    this._baseUrl = `${baseurl}/httpAuth/app/rest`;
    this._options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    if (!!username && !!password) {
      Object.assign(this._options, { auth: { username, password } });
    }
  }

  async _get (options) {
    options.uri = encodeURI(options.uri);
    return maybe.fromNullable(await request
      .get(Object.assign(options, this._options)));
  }

  async _put (options, data) {
    options.uri = encodeURI(options.uri);
    options = Object.assign(options, this._options, { json: data });
    return maybe.fromNullable(await request.put(options));
  }

  async _post (options, data) {
    options.uri = encodeURI(options.uri);
    options = Object.assign(options, this._options, { json: data });
    return maybe.fromNullable(await request.post(options));
  }

  async _delete (options) {
    options.uri = encodeURI(options.uri);
    return maybe.fromNullable(await request
      .delete(Object.assign(options, this._options)));
  }

}


