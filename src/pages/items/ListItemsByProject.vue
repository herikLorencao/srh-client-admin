<template>
  <q-page class="flex column items-center">
    <h1>Itens</h1>
    <q-table class="table" :columns="columns" :data="items" row-key="id" flat
             selection="single" :selected.sync="itemSelect"/>
    <div class="item-actions flex justify-center">
      <q-btn class="btn" text-color="white" label="Cadastrar"/>
    </div>
  </q-page>
</template>

<script>
import ProjectService from 'src/service/ProjectService';

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
  name: 'ListItemsByProject',
  computed: {
    showActions() {
      return this.itemSelect.length > 0;
    },
  },
  data() {
    return {
      columns,
      items: [],
      itemSelect: [],
    };
  },
  methods: {
    async loadItems() {
      const projectService = new ProjectService();
      const projectId = this.$store.getters['navigationInfo/getProjectId'];
      const resp = await projectService.listItens(projectId);

      // eslint-disable-next-line dot-notation
      if (resp && resp['_embedded'].itens) this.items = resp['_embedded'].itens;
    },
  },
  async mounted() {
    await this.loadItems();
  },
};
</script>

<style scoped>

</style>
