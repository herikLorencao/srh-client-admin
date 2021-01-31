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

  async update(adminForm) {
    const resp = await this.client.put(this.resourceUrl, adminForm.id, adminForm);

    if (resp) {
      notify('positive', 'Perfil editado com sucesso');
    }

    return resp;
  }
}
