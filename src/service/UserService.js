import Client from 'src/service/api/Client';
// import notify from '../helper/notify';

export default class UserService {
  constructor() {
    this.client = new Client();
    this.resourceUrl = '/users/evaluators';
  }

  async list() {
    return this.client.getAll(this.resourceUrl);
  }
}
