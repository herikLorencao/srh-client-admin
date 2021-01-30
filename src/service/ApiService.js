import Client from 'src/service/api/Client';
import notify from 'src/helper/notify';

export default class ApiService {
  constructor() {
    this.client = new Client();
    this.resourceUrl = '/users/apis';
  }

  async list() {
    return this.client.getAll(this.resourceUrl);
  }

  async find(id) {
    return this.client.get(this.resourceUrl, id);
  }

  async create(apiForm) {
    const resp = await this.client.post(this.resourceUrl, apiForm);

    if (resp) {
      notify('positive', 'Usuário de API criada com sucesso');
    }

    return resp;
  }

  async update(apiForm) {
    const resp = await this.client.put(this.resourceUrl, apiForm.id, apiForm);

    if (resp) {
      notify('positive', 'Usuário de API editado com sucesso');
    }
    return resp;
  }

  async remove(id) {
    const resp = await this.client.delete(this.resourceUrl, id);
    if (resp) notify('positive', 'Usuário de API removido com sucesso');
  }
}
