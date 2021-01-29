<template>
  <q-page class="flex column items-center">
    <h1>Tags</h1>
    <q-table class="table" :columns="columns" :data="tags" row-key="id"
             selection="single" :selected.sync="tagsSelect" flat/>
    <div class="tags-actions flex justify-center">
      <q-btn @click="createTag" class="btn" text-color="white" label="Cadastrar"/>
      <q-btn v-show="showActions" @click="editTag" class="btn" text-color="white" label="Editar"/>
      <q-btn v-show="showActions" @click="toggleDeleteDialog" class="btn" text-color="white"
             label="Remover"/>
    </div>

    <q-dialog v-model="deleteDialogVisible" persistent>
      <q-card class="delete-dialog-card">
        <q-card-section class="row items-center text-dialog">
          Tem certeza que deseja remover o projeto?
        </q-card-section>
        <q-card-actions class="btn-actions" align="center">
          <q-btn @click="toggleDeleteDialog" class="btn" text-color="white" label="Cancelar"/>
          <q-btn @click="deleteTag" class="btn" text-color="white" label="Confirmar"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
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
    style: 'width: 80px',
    headerStyle: 'width: 80px',
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
  name: 'ListTags',
  computed: {
    showActions() {
      return this.tagsSelect.length > 0;
    },
  },
  data() {
    return {
      columns,
      tags: [],
      tagsSelect: [],
      deleteDialogVisible: false,
    };
  },
  methods: {
    async loadTags() {
      const tagService = new TagService();
      const resp = await tagService.list();
      // eslint-disable-next-line dot-notation
      if (resp && resp['_embedded'].tags) this.tags = resp['_embedded'].tags;
    },
    async createTag() {
      await this.$router.push('/tags/criar');
    },
    async editTag() {
      const tagId = this.tagsSelect[0].id;
      await this.$router.push(`/tags/editar/${tagId}`);
    },
    toggleDeleteDialog() {
      this.deleteDialogVisible = !this.deleteDialogVisible;
    },
    async deleteTag() {
      const tagService = new TagService();
      const tagId = this.tagsSelect[0].id;
      await tagService.remove(tagId);
      await this.loadTags();
      this.toggleDeleteDialog();
    },
  },
  async mounted() {
    await this.loadTags();
  },
};
</script>

<style scoped>

</style>
