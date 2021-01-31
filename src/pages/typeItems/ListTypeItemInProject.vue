<template>
  <q-page class="flex column items-center">
    <h1>Tipos de Item no Projeto</h1>
    <q-table class="table" :columns="columns" :data="typeitens" row-key="id" flat/>
  </q-page>
</template>

<script>
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
  name: 'ListTypeItemInProject',
  data() {
    return {
      columns,
      typeitens: [],
    };
  },
  methods: {
    async loadTypeItens() {
      const typeItemService = new TypeItemService();
      const projectId = this.$store.getters['navigationInfo/getProjectId'];
      const resp = await typeItemService.listByProject(projectId);

      // eslint-disable-next-line dot-notation
      if (resp && resp['_embedded'].typeitems) this.typeitens = resp['_embedded'].typeitems;
    },
  },
  async mounted() {
    await this.loadTypeItens();
  },
};
</script>

<style scoped>

</style>
