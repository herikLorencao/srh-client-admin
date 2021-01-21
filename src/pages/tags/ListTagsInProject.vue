<template>
  <q-page class="flex column items-center">
    <h1>Tags</h1>
    <q-table class="table" :columns="columns" :data="tags" row-key="itemId" flat/>
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
    };
  },
  methods: {
    async loadTags() {
      const tagService = new TagService();
      const projectId = this.$store.getters['navigationInfo/getProjectId'];
      const resp = await tagService.listByProject(projectId);

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
