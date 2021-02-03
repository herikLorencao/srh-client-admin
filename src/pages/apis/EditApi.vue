<template>
  <q-page class="flex column items-center">
    <h1>Editar Api</h1>
    <q-form class="form flex column items-center" @submit="editApiSubmit">
      <q-input class="input" outlined v-model="apiForm.name" label="Nome"/>
      <q-input class="input" outlined v-model="apiForm.login" label="Login"/>
      <q-input class="input" outlined v-model="apiForm.email" label="Email"/>
      <div class="flex justify-between items-center toggle-admin">
        <q-btn class="btn-pass" text-color="white" icon="fas fa-key" label="Trocar Senha"
               @click="toggleChangePasswordMenu"/>
        <q-toggle v-model="apiForm.isAdmin" color="orange" label="Perfil Administrador"/>
      </div>
      <q-btn class="btn" text-color="white" label="Salvar" type="submit"/>
    </q-form>

    <q-dialog v-model="changePasswordVisible" persistent>
      <q-card class="password-api-dialog-card flex justify-center">
        <q-card-section class="row items-center text-dialog">
          Alteração de senha
        </q-card-section>
        <q-card-section class="password-inputs">
          <q-input class="input" type="password" outlined v-model="oldPassword"
                   label="Senha Antiga"/>
          <q-input class="input" type="password" outlined v-model="apiForm.password"
                   label="Nova Senha"/>
          <q-input class="input" type="password" outlined v-model="verifyPassword"
                   label="Repetir Senha"/>
        </q-card-section>
        <q-card-actions class="btn-actions" align="center">
          <q-btn @click="toggleChangePasswordMenu" class="btn" text-color="white" label="Cancelar"/>
          <q-btn @click="confirmChangePassword" class="btn" text-color="white" label="Confirmar"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="verifyPasswordVisible" persistent>
      <q-card class="password-api-dialog-card flex column items-center">
        <q-card-section class="row justify-center items-center text-dialog">
          Verificar Senha
        </q-card-section>
        <q-card-section class="password-inputs">
          <q-input class="input" type="password" outlined v-model="apiForm.password"
                   label="Senha"/>
        </q-card-section>
        <q-card-actions class="flex justify-center btn-actions" align="center">
          <q-btn @click="toggleVerifyPasswordMenu" class="btn" text-color="white" label="Cancelar"/>
          <q-btn @click="validatePassword" class="btn" text-color="white" label="Confirmar"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import ApiService from 'src/service/ApiService';
import notify from 'src/helper/notify';

export default {
  name: 'EditApi',
  data() {
    return {
      apiForm: {
        id: '',
        name: '',
        login: '',
        email: '',
        password: '',
        oldPassword: null,
        isAdmin: false,
      },
      verifyPassword: '',
      oldPassword: '',
      changePasswordVisible: false,
      verifyPasswordVisible: false,
      passwordChanged: false,
    };
  },
  methods: {
    async loadApi() {
      const apiService = new ApiService();
      const apiId = this.$route.params.id;
      this.apiForm = await apiService.find(apiId);
    },
    async editApiSubmit() {
      if (!this.passwordChanged && !this.apiForm.password) {
        this.toggleVerifyPasswordMenu();
        return;
      }

      if (this.oldPassword && this.oldPassword !== '') {
        this.apiForm.oldPassword = this.oldPassword;
      }

      const apiService = new ApiService();
      const resp = await apiService.update(this.apiForm);

      if (resp) await this.$router.push('/apis');
      this.clearPassword();
    },
    clearPassword() {
      this.passwordChanged = false;
      this.apiForm.password = null;
      this.oldPassword = '';
      this.verifyPassword = '';
    },
    confirmChangePassword() {
      const verifyPasswordConfirm = this.verifyPassword === this.apiForm.password;
      const validPasswords = this.oldPassword !== '' && this.apiForm.password !== '' && verifyPasswordConfirm;

      if (validPasswords) {
        notify('warning', 'Salve o usuário para validar a alteração');
        this.toggleChangePasswordMenu();
        return;
      }

      notify('negative', 'Valores de senha inválidos');
    },
    async validatePassword() {
      this.passwordChanged = true;
      this.toggleVerifyPasswordMenu();
      await this.editApiSubmit();
    },
    toggleVerifyPasswordMenu() {
      this.verifyPasswordVisible = !this.verifyPasswordVisible;
    },
    toggleChangePasswordMenu() {
      this.changePasswordVisible = !this.changePasswordVisible;
    },
  },
  watch: {
    verifyPassword() {
      this.passwordChanged = true;
    },
  },
  async mounted() {
    await this.loadApi();
  },
};
</script>

<style scoped>

</style>
