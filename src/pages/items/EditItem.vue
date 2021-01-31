<template>
  <q-page class="flex column items-center">
    <h1>Editar Item</h1>
    <q-form class="form flex column items-center" @submit="submitEditItem">
      <q-input class="input" outlined v-model="itemForm.name" label="Nome"/>
      <q-input class="input" outlined v-model="itemForm.description" label="Nome"/>

      <div class="itens-table flex column items-center">
        <span class="table-title">Tipo do Item (Somente leitura)</span>
        <q-table class="table" :columns="columns" :data="typeItens" row-key="id"
                 :selected.sync="typeItemSelect" flat/>
      </div>

      <div class="itens-table flex column items-center">
        <span class="table-title">Escolher Tags Vinculadas (opcional)</span>
        <q-table class="table" :columns="columns" :data="tags" row-key="id"
                 selection="multiple" :selected.sync="selectTags" flat/>
      </div>

      <q-btn class="btn" text-color="white" label="Salvar" type="submit"/>
    </q-form>
  </q-page>
</template>

<script>
import ItemService from 'src/service/ItemService';
import TypeItemService from 'src/service/TypeItemService';
import TagService from 'src/service/TagService';

const columns = [
  {
    name: 'id',
    field: 'id',
    label: 'Código',
    align: 'center',
    sortable: true,
  },
  {
    name: 'name',
    field: 'name',
    label: 'Nome',
    align: 'center',
    sortable: true,
  },
];

export default {
  name: 'EditItem',
  data() {
    return {
      columns,
      itemForm: {
        name: '',
        description: '',
      },
      typeItens: [],
      typeItemSelect: [],
      tags: [],
      selectTags: [],
    };
  },
  methods: {
    async loadItem() {
      const itemService = new ItemService();
      const itemId = this.$route.params.id;
      this.itemForm = await itemService.find(itemId);

      if (this.itemForm.typeItemId) {
        this.typeItemSelect.push({
          id: this.itemForm.typeItemId,
        });
      }
    },
    async loadTags() {
      const tagService = new TagService();
      const resp = await tagService.list();
      // eslint-disable-next-line dot-notation
      if (resp && resp['_embedded'].tags) this.tags = resp['_embedded'].tags;
    },
    async loadTypeItens() {
      const typeItemService = new TypeItemService();
      const resp = await typeItemService.list();
      // eslint-disable-next-line dot-notation
      if (resp && resp['_embedded'].typeitems) this.typeItens = resp['_embedded'].typeitems;
    },
    async submitEditItem() {
      const itemService = new ItemService();
      this.itemForm.projectId = this.$store.getters['navigationInfo/getProjectId'];

      // eslint-disable-next-line dot-notation
      delete this.itemForm['_links'];

      const resp = await itemService.update(this.itemForm);
      if (resp) await this.$router.push('/projetos/itens');
    },
  },
  async mounted() {
    await this.loadTypeItens();
    await this.loadTags();
    await this.loadItem();
  },
};
</script>

<style scoped>

</style>
