import Client from 'src/service/api/Client';
import notify from 'src/helper/notify';

export default class RecommendationService {
  constructor() {
    this.client = new Client();
    this.resourceUrl = '/recommendations';
  }

  async list(page) {
    return this.client.getAll(this.resourceUrl, page);
  }

  async listByMatrixId(matrixId) {
    return this.client.getAll(`${this.resourceUrl}/matrices/${matrixId}`);
  }

  async create(recommendationForm) {
    const resp = await this.client.post(this.resourceUrl, recommendationForm);

    if (resp) {
      notify('positive', 'Recomendações criadas com sucesso');
    }

    return resp;
  }

  async remove(id) {
    const resp = await this.client.delete(this.resourceUrl, id);
    if (resp) notify('positive', 'Recomendação removida com sucesso');
  }
}
