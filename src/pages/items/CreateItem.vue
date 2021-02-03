<template>
  <q-page class="flex column items-center">
    <h1>Criar Item</h1>
    <q-form class="form flex column items-center" @submit="submitCreateItem">
      <q-input class="input" outlined v-model="itemForm.name" label="Nome"/>
      <q-input class="input" outlined v-model="itemForm.description" label="Descrição"/>

      <div class="itens-table flex column items-center">
        <span class="table-title">Escolher Tipo de Item (opcional)</span>
        <q-table class="table" :columns="columns" :data="typeItens" row-key="id"
                 selection="single" :selected.sync="typeItemSelect" flat/>
      </div>
      <q-btn class="btn" text-color="white" label="Salvar" type="submit"/>
    </q-form>
  </q-page>
</template>

<script>
import ItemService from 'src/service/ItemService';
import TypeItemService from 'src/service/TypeItemService';

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
  name: 'CreateItem',
  data() {
    return {
      columns,
      itemForm: {
        name: '',
        description: '',
      },
      typeItens: [],
      typeItemSelect: [],
    };
  },
  methods: {
    async loadTypeItens() {
      const typeItemService = new TypeItemService();
      const resp = await typeItemService.list();
      // eslint-disable-next-line dot-notation
      if (resp && resp['_embedded'].typeitems) this.typeItens = resp['_embedded'].typeitems;
    },
    async submitCreateItem() {
      const itemService = new ItemService();
      this.itemForm.projectId = this.$store.getters['navigationInfo/getProjectId'];

      if (this.typeItemSelect.length > 0) {
        this.itemForm.typeItemId = this.typeItemSelect[0].id;
      }

      const resp = await itemService.create(this.itemForm);
      if (resp) await this.$router.push(`/projetos/itens/editar/${resp.id}`);
    },
  },
  async mounted() {
    await this.loadTypeItens();
  },
};
</script>

<style scoped>

</style>
