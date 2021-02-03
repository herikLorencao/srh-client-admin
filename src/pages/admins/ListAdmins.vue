<template>
  <q-page class="flex column items-center">
    <h1>Administradores</h1>
    <q-table class="table" :columns="columns" :data="admins" row-key="id"
             selection="single" :selected.sync="adminSelect" flat/>
    <q-pagination
      @input="loadAdmins"
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
      <q-btn @click="createAdmin" class="btn" text-color="white" label="Cadastrar"/>
      <q-btn v-show="showActions" @click="editAdmin" class="btn" text-color="white"
             label="Editar"/>
      <q-btn v-show="showActions" @click="toggleDeleteDialog" class="btn" text-color="white"
             label="Remover"/>
    </div>

    <q-dialog v-model="deleteDialogVisible" persistent>
      <q-card class="delete-dialog-card">
        <q-card-section class="row items-center text-dialog">
          Tem certeza que deseja remover o administrador?
        </q-card-section>
        <q-card-section>
          <q-input class="input" type="password" outlined v-model="verifyPassword" label="Senha"/>
        </q-card-section>
        <q-card-actions class="btn-actions" align="center">
          <q-btn @click="toggleDeleteDialog" class="btn" text-color="white" label="Cancelar"/>
          <q-btn @click="deleteAdmin" class="btn" text-color="white" label="Confirmar"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import AdminService from 'src/service/AdminService';
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
];

export default {
  name: 'ListAdmins',
  computed: {
    showActions() {
      return this.adminSelect.length > 0;
    },
  },
  data() {
    return {
      columns,
      admins: [],
      adminSelect: [],
      deleteDialogVisible: false,
      verifyPassword: '',
      pagination: {
        page: 1,
        pageNumber: 1,
      },
    };
  },
  methods: {
    async loadAdmins(page = 1) {
      const apiPage = page - 1;
      const adminService = new AdminService();
      const resp = await adminService.list(apiPage);
      if (resp && resp.page) this.pagination.pageNumber = resp.page.totalPages;

      // eslint-disable-next-line dot-notation
      if (resp && resp['_embedded'].admins) this.admins = resp['_embedded'].admins;
    },
    async createAdmin() {
      await this.$router.push('/admins/criar');
    },
    async editAdmin() {
      const adminId = this.adminSelect[0].id;
      await this.$router.push(`/admins/editar/${adminId}`);
    },
    toggleDeleteDialog() {
      this.deleteDialogVisible = !this.deleteDialogVisible;
    },
    async deleteAdmin() {
      const adminService = new AdminService();
      const adminId = this.adminSelect[0].id;
      const adminForm = this.adminSelect[0];

      if (this.verifyPassword === '') {
        notify('negative', 'Informe a senha do administrador selecionado para remoção');
        return;
      }

      adminForm.password = this.verifyPassword;
      const validPassword = await adminService.update(adminForm, true);

      if (validPassword) {
        await adminService.remove(adminId);
        this.verifyPassword = '';
      }

      await this.loadAdmins();
      this.toggleDeleteDialog();
    },
  },
  async mounted() {
    await this.loadAdmins();
  },
};
</script>

<style scoped>

</style>
