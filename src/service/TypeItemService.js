import Client from 'src/service/api/Client';

export default class TypeItemService {
  constructor() {
    this.client = new Client();
    this.resourceUrl = '/typeitens';
  }

  async listByProject(projectId) {
    return this.client.get(`${this.resourceUrl}/projects`, projectId);
  }
}
