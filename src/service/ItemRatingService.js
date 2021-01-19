import Client from 'src/service/api/Client';

export default class ItemRatingService {
  constructor() {
    this.client = new Client();
    this.resourceUrl = '/itemratings';
  }

  async listByEvaluator(evaluatorId) {
    return this.client.getAll(`${this.resourceUrl}/evaluators/${evaluatorId}`);
  }
}
