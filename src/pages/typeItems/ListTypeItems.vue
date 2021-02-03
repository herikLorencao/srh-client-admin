<template>
  <q-page class="flex column items-center">
    <h1>Tipos de Item</h1>
    <q-table class="table" :columns="columns" :data="typeitens" row-key="id"
             selection="single" :selected.sync="typeItemSelect" flat/>
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
    <div class="typeitens-actions flex justify-center">
      <q-btn @click="createTypeItens" class="btn" text-color="white" label="Cadastrar"/>
      <q-btn v-show="showActions" @click="editTypeItens" class="btn" text-color="white"
             label="Editar"/>
      <q-btn v-show="showActions" @click="toggleDeleteDialog" class="btn" text-color="white"
             label="Remover"/>
    </div>

    <q-dialog v-model="deleteDialogVisible" persistent>
      <q-card class="delete-dialog-card">
        <q-card-section class="row items-center text-dialog">
          Tem certeza que deseja remover o tipo de item?
        </q-card-section>
        <q-card-actions class="btn-actions" align="center">
          <q-btn @click="toggleDeleteDialog" class="btn" text-color="white" label="Cancelar"/>
          <q-btn @click="deleteTypeItem" class="btn" text-color="white" label="Confirmar"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
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
  name: 'ListTypeItems',
  computed: {
    showActions() {
      return this.typeItemSelect.length > 0;
    },
  },
  data() {
    return {
      columns,
      typeitens: [],
      typeItemSelect: [],
      deleteDialogVisible: false,
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
      const resp = await typeItemService.list(apiPage);
      if (resp && resp.page) this.pagination.pageNumber = resp.page.totalPages;
      // eslint-disable-next-line dot-notation
      if (resp && resp['_embedded'].typeitems) this.typeitens = resp['_embedded'].typeitems;
    },
    async createTypeItens() {
      await this.$router.push('/tipoitens/criar');
    },
    async editTypeItens() {
      const typeItemId = this.typeItemSelect[0].id;
      await this.$router.push(`/tipoitens/editar/${typeItemId}`);
    },
    toggleDeleteDialog() {
      this.deleteDialogVisible = !this.deleteDialogVisible;
    },
    async deleteTypeItem() {
      const typeItemService = new TypeItemService();
      const typeItemId = this.typeItemSelect[0].id;
      await typeItemService.delete(typeItemId);
      await this.loadTypeItens();
      this.toggleDeleteDialog();
    },
  },
  async mounted() {
    await this.loadTypeItens();
  },
};
</script>

<style scoped>

</style>
