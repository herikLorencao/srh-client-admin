<template>
  <q-page class="flex column items-center">
    <h1>Itens</h1>
    <q-table class="table" :columns="columns" :data="items" row-key="id" flat
             selection="single" :selected.sync="itemSelect"/>
    <q-pagination
      @input="loadItems"
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
    <div class="item-actions flex justify-center">
      <q-btn @click="createItem" class="btn" text-color="white" label="Cadastrar"/>
      <q-btn v-show="showActions" @click="editProject" class="btn" text-color="white"
             label="Editar"/>
      <q-btn v-show="showActions" @click="toggleDeleteDialog" class="btn" text-color="white"
             label="Remover"/>
    </div>

    <q-dialog v-model="deleteDialogVisible" persistent>
      <q-card class="delete-dialog-card">
        <q-card-section class="row items-center text-dialog">
          Tem certeza que deseja remover o item?
        </q-card-section>
        <q-card-actions class="btn-actions" align="center">
          <q-btn @click="toggleDeleteDialog" class="btn" text-color="white" label="Cancelar"/>
          <q-btn @click="deleteItem" class="btn" text-color="white" label="Confirmar"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import ProjectService from 'src/service/ProjectService';
import ItemService from 'src/service/ItemService';

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
      deleteDialogVisible: false,
      pagination: {
        page: 1,
        pageNumber: 1,
      },
    };
  },
  methods: {
    async loadItems(page = 1) {
      const apiPage = page - 1;
      const projectService = new ProjectService();
      const projectId = this.$store.getters['navigationInfo/getProjectId'];
      const resp = await projectService.listItens(projectId, apiPage);
      if (resp && resp.page) this.pagination.pageNumber = resp.page.totalPages;

      // eslint-disable-next-line dot-notation
      if (resp && resp['_embedded'].itens) this.items = resp['_embedded'].itens;
    },
    async createItem() {
      await this.$router.push('/projetos/itens/criar');
    },
    toggleDeleteDialog() {
      this.deleteDialogVisible = !this.deleteDialogVisible;
    },
    async editProject() {
      const itemId = this.itemSelect[0].id;
      await this.$router.push(`/projetos/itens/editar/${itemId}`);
    },
    async deleteItem() {
      const itemService = new ItemService();
      const itemId = this.itemSelect[0].id;
      await itemService.remove(itemId);
      await this.loadItems();
      this.toggleDeleteDialog();
    },
  },
  async mounted() {
    await this.loadItems();
  },
};
</script>

<style scoped>

</style>
