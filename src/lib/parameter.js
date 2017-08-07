import Client from './client';

export default class Parameter extends Client {

  async get (args) {
    return await super._get({ uri: `${this._baseUrl}/parameters/${args.name}` });
  }

  async create (args) {
    return await this._post({ uri: `${this._baseUrl}/parameters` }, this._createRequestJson(args));
  }

  async update (args) {
    return await this._put({ uri: `${this._baseUrl}/parameters/${args.name}` }, this._createRequestJson(args));
  }

  async delete (args) {
    return await super._delete({ uri: `${this._baseUrl}/parameters/${args.name}` });
  }

  _createRequestJson (args) {
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
  };
};
