import Client from 'src/service/api/Client';

export default class TagService {
  constructor() {
    this.client = new Client();
    this.resourceUrl = '/tags';
  }

  async listByProject(projectId) {
    return this.client.get(`${this.resourceUrl}/projects`, projectId);
  }
}
