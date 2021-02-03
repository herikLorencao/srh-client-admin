<template>
  <q-page class="flex column items-center">
    <h1>APIs</h1>
    <q-table class="table" :columns="columns" :data="apis" row-key="id"
             selection="single" :selected.sync="apiSelect" flat/>
    <q-pagination
      @input="loadApis"
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
        <q-card-section>
          <q-input class="input" type="password" outlined v-model="verifyPassword" label="Senha"/>
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
import notify from 'src/helper/notify';

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
  {
    name: 'isAdmin',
    field: 'isAdmin',
    label: 'Administrativo',
    align: 'center',
    format: (value) => (value ? 'SIM' : 'NÃO'),
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
      verifyPassword: '',
      pagination: {
        page: 1,
        pageNumber: 1,
      },
    };
  },
  methods: {
    async loadApis(page = 1) {
      const apiPage = page - 1;
      const apiService = new ApiService();
      const resp = await apiService.list(apiPage);
      if (resp && resp.page) this.pagination.pageNumber = resp.page.totalPages;

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
      const apiForm = this.apiSelect[0];

      if (this.verifyPassword === '') {
        notify('negative', 'Informe usuário de API selecionado para remoção');
        return;
      }

      apiForm.password = this.verifyPassword;
      const validPassword = await apiService.update(apiForm, true);

      if (validPassword) {
        await apiService.remove(apiId);
        this.verifyPassword = '';
      }

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
