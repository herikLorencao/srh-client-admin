<template>
  <q-page class="flex column items-center">
    <h1>Criar Administrador</h1>
    <q-form class="form flex column items-center" @submit="submitCreateAdmin">
      <q-input class="input" outlined v-model="adminForm.name" label="Nome"/>
      <q-input class="input" outlined v-model="adminForm.login" label="Login"/>
      <q-input class="input" outlined v-model="adminForm.email" label="Email"/>
      <q-input class="input" type="password" outlined v-model="adminForm.password" label="Senha"/>
      <q-input class="input" type="password" outlined v-model="verifyPassword"
               label="Repetir Senha"/>
      <q-btn class="btn" text-color="white" label="Salvar" type="submit"/>
    </q-form>
  </q-page>
</template>

<script>
import AdminService from 'src/service/AdminService';
import notify from 'src/helper/notify';

export default {
  name: 'CreateAdmin',
  computed: {
    correctPassword() {
      return this.adminForm.password === this.verifyPassword;
    },
  },
  data() {
    return {
      adminForm: {
        name: '',
        login: '',
        email: '',
        password: '',
      },
      verifyPassword: '',
    };
  },
  methods: {
    async submitCreateAdmin() {
      const adminService = new AdminService();

      if (this.correctPassword) {
        const resp = await adminService.create(this.adminForm);
        if (resp) await this.$router.push('/admins');
      } else {
        notify('negative', 'As senhas não conferem');
      }
    },
  },
};
</script>

<style scoped>

</style>
