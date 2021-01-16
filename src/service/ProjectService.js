import Client from 'src/service/api/Client';
import notify from 'src/helper/notify';

export default class ProjectService {
  constructor() {
    this.client = new Client();
    this.resourceUrl = '/projects';
  }

  async create(projectForm) {
    const resp = await this.client.post(this.resourceUrl, projectForm);

    if (resp) {
      notify('positive', 'Projeto criado com sucesso');
    } else {
      return false;
    }

    return true;
  }
}
