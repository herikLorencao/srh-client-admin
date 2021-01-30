import Client from 'src/service/api/Client';

export default class AdminService {
  constructor() {
    this.client = new Client();
    this.resourceUrl = '/users/admins';
  }

  async find(id) {
    return this.client.get(this.resourceUrl, id);
  }
}
