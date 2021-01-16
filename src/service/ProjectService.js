import Client from 'src/service/api/Client';
import notify from 'src/helper/notify';

export default class ProjectService {
  constructor() {
    this.client = new Client();
    this.resourceUrl = '/projects';
  }

  async find(id) {
    return this.client.get(this.resourceUrl, id);
  }

  async create(projectForm) {
    const resp = await this.client.post(this.resourceUrl, projectForm);

    if (resp) {
      notify('positive', 'Projeto criado com sucesso');
    }

    return resp;
  }

  async update(projectForm) {
    const resp = await this.client.put(this.resourceUrl, projectForm.id);

    if (resp) {
      notify('positive', 'Projeto editado com sucesso');
    }
  }
}
