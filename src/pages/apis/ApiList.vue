<template>
  <q-page class="flex column items-center">
    <h1>APIs</h1>
    <q-table class="table" :columns="columns" :data="apis" row-key="id"
             selection="single" :selected.sync="apiSelect" flat/>
    <div class="api-actions flex justify-center">
      <q-btn @click="createApi" class="btn" text-color="white" label="Cadastrar"/>
      <q-btn v-show="showActions" @click="editApi" class="btn" text-color="white"
             label="Editar"/>
      <q-btn v-show="showActions" @click="toggleDeleteDialog" class="btn" text-color="white"
             label="Remover"/>
    </div>
    <q-dialog v-model="deleteDialogVisible" persistent>
      <q-card class="delete-dialog-card">
        <q-card-section class="row items-center text-dialog">
          Tem certeza que deseja remover o usuário de API?
        </q-card-section>
        <q-card-actions class="btn-actions" align="center">
          <q-btn @click="toggleDeleteDialog" class="btn" text-color="white" label="Cancelar"/>
          <q-btn @click="deleteApi" class="btn" text-color="white" label="Confirmar"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import ApiService from 'src/service/ApiService';

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
    name: 'login',
    field: 'login',
    label: 'Login',
    align: 'center',
    sortable: true,
  },
  {
    name: 'email',
    field: 'email',
    label: 'Email',
    align: 'center',
    sortable: true,
  },
];

export default {
  name: 'ApiList',
  computed: {
    showActions() {
      return this.apiSelect.length > 0;
    },
  },
  data() {
    return {
      columns,
      apis: [],
      apiSelect: [],
      deleteDialogVisible: false,
    };
  },
  methods: {
    async loadApis() {
      const apiService = new ApiService();
      const resp = await apiService.list();

      // eslint-disable-next-line dot-notation
      if (resp && resp['_embedded'].apiUsers) this.apis = resp['_embedded'].apiUsers;
    },
    async createApi() {
      await this.$router.push('/apis/criar');
    },
    async editApi() {
      const apiId = this.apiSelect[0].id;
      await this.$router.push(`/apis/editar/${apiId}`);
    },
    toggleDeleteDialog() {
      this.deleteDialogVisible = !this.deleteDialogVisible;
    },
    async deleteApi() {
      const apiService = new ApiService();
      const apiId = this.apiSelect[0].id;
      await apiService.remove(apiId);
      await this.loadApis();
      this.toggleDeleteDialog();
    },
  },
  async mounted() {
    await this.loadApis();
  },
};
</script>

<style scoped>

</style>
