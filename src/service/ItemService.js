import Client from 'src/service/api/Client';

export default class ItemService {
  constructor() {
    this.client = new Client();
    this.resourceUrl = '/itens';
  }

  async find(id) {
    return this.client.get(this.resourceUrl, id);
  }
}
