import Client from 'src/service/api/Client';
import notify from 'src/helper/notify';

export default class TypeItemService {
  constructor() {
    this.client = new Client();
    this.resourceUrl = '/typeitens';
  }

  async find(id) {
    return this.client.get(this.resourceUrl, id);
  }

  async list() {
    return this.client.getAll(this.resourceUrl);
  }

  async listByProject(projectId) {
    return this.client.get(`${this.resourceUrl}/projects`, projectId);
  }

  async create(typeItemForm) {
    const resp = await this.client.post(this.resourceUrl, typeItemForm);

    if (resp) {
      notify('positive', 'Tipo Item criado com sucesso');
    }

    return resp;
  }

  async update(typeItemForm) {
    const resp = await this.client.put(this.resourceUrl, typeItemForm.id, typeItemForm);

    if (resp) {
      notify('positive', 'Tipo Item editado com sucesso');
    }
    return resp;
  }

  async delete(id) {
    const resp = await this.client.delete(this.resourceUrl, id);
    if (resp) notify('positive', 'Tipo Item removido com sucesso');
  }
}
