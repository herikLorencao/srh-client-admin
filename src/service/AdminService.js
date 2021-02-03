import Client from 'src/service/api/Client';
import notify from 'src/helper/notify';

export default class AdminService {
  constructor() {
    this.client = new Client();
    this.resourceUrl = '/users/admins';
  }

  async find(id) {
    return this.client.get(this.resourceUrl, id);
  }

  async create(apiForm) {
    const resp = await this.client.post(this.resourceUrl, apiForm);

    if (resp) {
      notify('positive', 'Administrador criado com sucesso');
    }

    return resp;
  }

  async list(page) {
    return this.client.getAll(this.resourceUrl, page);
  }

  async update(adminForm, isRemovedVerify = false) {
    const resp = await this.client.put(this.resourceUrl, adminForm.id, adminForm);

    if (resp && !isRemovedVerify) {
      notify('positive', 'Administrador editado com sucesso');
    }

    return resp;
  }

  async remove(id) {
    const resp = await this.client.delete(this.resourceUrl, id);
    if (resp) notify('positive', 'Administrador removido com sucesso');
  }
}
