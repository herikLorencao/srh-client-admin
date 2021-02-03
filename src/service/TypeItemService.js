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

  async list(page) {
    return this.client.getAll(this.resourceUrl, page);
  }

  async listByProject(projectId, page) {
    return this.client.getAll(`${this.resourceUrl}/projects/${projectId}`, page);
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

  async findAttributeInTypeItem(typeItemId, attributeId) {
    return this.client
      .getWithoutError(`${this.resourceUrl}/${typeItemId}/attributes`, attributeId);
  }

  async addAttribute(attribute, typeItemId) {
    const attributeForm = {
      attributeId: attribute.id,
      typeItemId,
    };

    const resp = await this.client
      .postWithoutError(`${this.resourceUrl}/${typeItemId}/attributes`,
        attributeForm);

    if (resp) {
      notify('positive', 'Atributo adicionado com sucesso');
    }
  }

  async removeAttribute(attributeId, typeItemId) {
    const resp = await this.client
      .delete(`${this.resourceUrl}/${typeItemId}/attributes`, attributeId);
    if (resp) notify('positive', 'Atributo removido com sucesso');
  }

  async loadAttributes(typeItemId) {
    return this.client.getAll(`${this.resourceUrl}/${typeItemId}/attributes`);
  }
}
