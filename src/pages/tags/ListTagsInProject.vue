<template>
  <q-page class="flex column items-center">
    <h1>Tags no Projeto</h1>
    <q-table class="table" :columns="columns" :data="tags" row-key="itemId" flat/>
    <q-pagination
      @input="loadTags"
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
  name: 'ListTagsInProject',
  data() {
    return {
      columns,
      tags: [],
      pagination: {
        page: 1,
        pageNumber: 1,
      },
    };
  },
  methods: {
    async loadTags(page = 1) {
      const apiPage = page - 1;
      const tagService = new TagService();
      const projectId = this.$store.getters['navigationInfo/getProjectId'];
      const resp = await tagService.listByProject(projectId, apiPage);
      if (resp && resp.page) this.pagination.pageNumber = resp.page.totalPages;
      // eslint-disable-next-line dot-notation
      if (resp && resp['_embedded'].tags) this.tags = resp['_embedded'].tags;
    },
  },
  async mounted() {
    await this.loadTags();
  },
};
</script>

<style scoped>

</style>
