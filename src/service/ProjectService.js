import Client from 'src/service/api/Client';
import notify from 'src/helper/notify';

export default class ProjectService {
  constructor() {
    this.client = new Client();
    this.resourceUrl = '/projects';
  }

  async list(page) {
    return this.client.getAll(this.resourceUrl, page);
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
    const resp = await this.client.put(this.resourceUrl, projectForm.id, projectForm);

    if (resp) {
      notify('positive', 'Projeto editado com sucesso');
    }
  }

  async remove(id) {
    const resp = await this.client.delete(this.resourceUrl, id);
    if (resp) notify('positive', 'Projeto removido com sucesso');
  }

  async listEvaluators(projectId, page) {
    return this.client.getAll(`${this.resourceUrl}/${projectId}/evaluators`, page);
  }

  async removeEvaluatorInProject(projectId, evaluatorId) {
    const resp = await this.client
      .delete(`${this.resourceUrl}/${projectId}/evaluators`, evaluatorId);
    if (resp) notify('positive', 'Usuário removido do projeto com sucesso');
  }

  async listItens(projectId, page) {
    return this.client.getAll(`${this.resourceUrl}/${projectId}/itens`, page);
  }
}
