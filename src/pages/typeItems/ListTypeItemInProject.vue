<template>
  <q-page class="flex column items-center">
    <h1>Tipos de Item no Projeto</h1>
    <q-table class="table" :columns="columns" :data="typeitens" row-key="id" flat/>
    <q-pagination
      @input="loadTypeItens"
      v-model="pagination.page"
      color="grey-9"
      :max="pagination.pageNumber"
      :max-pages="5"
      :direction-links="true"
      :boundary-links="true"
      icon-first="skip_previous"
      icon-last="skip_next"
      icon-prev="fast_rewind"
      icon-next="fast_forward"
      size="md"
      class="pagination"
    />
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
      pagination: {
        page: 1,
        pageNumber: 1,
      },
    };
  },
  methods: {
    async loadTypeItens(page = 1) {
      const apiPage = page - 1;
      const typeItemService = new TypeItemService();
      const projectId = this.$store.getters['navigationInfo/getProjectId'];
      const resp = await typeItemService.listByProject(projectId, apiPage);
      if (resp && resp.page) this.pagination.pageNumber = resp.page.totalPages;

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
