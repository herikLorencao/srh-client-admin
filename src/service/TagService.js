import Client from 'src/service/api/Client';
import notify from 'src/helper/notify';

export default class TagService {
  constructor() {
    this.client = new Client();
    this.resourceUrl = '/tags';
  }

  async list(page) {
    return this.client.getAll(this.resourceUrl, page);
  }

  async listByProject(projectId, page) {
    return this.client.getAll(`${this.resourceUrl}/projects/${projectId}`, page);
  }

  async create(tagForm) {
    const resp = await this.client.post(this.resourceUrl, tagForm);

    if (resp) {
      notify('positive', 'Tag criada com sucesso');
    }

    return resp;
  }

  async update(tagForm) {
    const resp = await this.client.put(this.resourceUrl, tagForm.id, tagForm);

    if (resp) {
      notify('positive', 'Tag editada com sucesso');
    }
    return resp;
  }

  async find(id) {
    return this.client.get(this.resourceUrl, id);
  }

  async remove(id) {
    const resp = await this.client.delete(this.resourceUrl, id);
    if (resp) notify('positive', 'Tag removida com sucesso');
  }
}
