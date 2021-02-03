<template>
  <q-page class="flex column items-center">
    <h1>Atributos</h1>
    <q-table class="table" :columns="columns" :data="attributes" row-key="id"
             selection="single" :selected.sync="attributeSelect" flat/>
    <q-pagination
      @input="loadAttributes"
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
    <div class="tags-actions flex justify-center">
      <q-btn @click="createAttribute" class="btn" text-color="white" label="Cadastrar"/>
      <q-btn v-show="showActions" @click="editAttribute" class="btn" text-color="white"
             label="Editar"/>
      <q-btn v-show="showActions" @click="toggleDeleteDialog" class="btn" text-color="white"
             label="Remover"/>
    </div>

    <q-dialog v-model="deleteDialogVisible" persistent>
      <q-card class="delete-dialog-card">
        <q-card-section class="row items-center text-dialog">
          Tem certeza que deseja remover o atributo?
        </q-card-section>
        <q-card-actions class="btn-actions" align="center">
          <q-btn @click="toggleDeleteDialog" class="btn" text-color="white" label="Cancelar"/>
          <q-btn @click="deleteAttribute" class="btn" text-color="white" label="Confirmar"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import AttributeService from 'src/service/AttributeService';

const translateType = (type) => {
  switch (type) {
    case 'TEXT':
      return 'Texto';
    case 'NUMBER':
      return 'Número';
    case 'DATE':
      return 'Data';
    default:
      return 'Indefinido';
  }
};

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
  {
    name: 'type',
    field: 'type',
    label: 'Tipo',
    align: 'center',
    format: translateType,
    sortable: true,
  },
  {
    name: 'value',
    field: 'value',
    label: 'Valor',
    align: 'center',
    sortable: true,
  },
];

export default {
  name: 'ListAttributes',
  computed: {
    showActions() {
      return this.attributeSelect.length > 0;
    },
  },
  data() {
    return {
      columns,
      attributes: [],
      attributeSelect: [],
      deleteDialogVisible: false,
      pagination: {
        page: 1,
        pageNumber: 1,
      },
    };
  },
  methods: {
    async loadAttributes(page = 1) {
      const apiPage = page - 1;
      const attributeService = new AttributeService();
      const resp = await attributeService.list(apiPage);
      if (resp && resp.page) this.pagination.pageNumber = resp.page.totalPages;
      // eslint-disable-next-line dot-notation
      if (resp && resp['_embedded'].attributes) this.attributes = resp['_embedded'].attributes;
    },
    async createAttribute() {
      await this.$router.push('/atributos/criar');
    },
    async editAttribute() {
      const attributeId = this.attributeSelect[0].id;
      await this.$router.push(`/atributos/editar/${attributeId}`);
    },
    toggleDeleteDialog() {
      this.deleteDialogVisible = !this.deleteDialogVisible;
    },
    async deleteAttribute() {
      const attributeService = new AttributeService();
      const attributeId = this.attributeSelect[0].id;
      await attributeService.remove(attributeId);
      await this.loadAttributes();
      this.toggleDeleteDialog();
    },
  },
  async mounted() {
    await this.loadAttributes();
  },
};
</script>

<style scoped>

</style>
