<template>
  <q-page class="flex column flex-center">
    <h1>Editar Perfil</h1>
    <q-form class="form flex column items-center" @submit="editAdminSubmit">
      <q-input class="input" outlined v-model="profileForm.name" label="Nome"/>
      <q-input class="input" outlined v-model="profileForm.login" label="Login"/>
      <q-input class="input" outlined v-model="profileForm.email" label="Email"/>
      <div class="flex justify-between items-center toggle-admin">
        <q-btn class="btn-pass" text-color="white" icon="fas fa-key" label="Trocar Senha"
               @click="toggleChangePasswordMenu"/>
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
          <q-input class="input" type="password" outlined v-model="profileForm.password"
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
          <q-input class="input" type="password" outlined v-model="profileForm.password"
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
import notify from 'src/helper/notify';
import AdminService from 'src/service/AdminService';

export default {
  name: 'EditAdmin',
  data() {
    return {
      profileForm: {
        id: '',
        name: '',
        login: '',
        email: '',
        password: '',
        oldPassword: null,
      },
      verifyPassword: '',
      oldPassword: '',
      changePasswordVisible: false,
      verifyPasswordVisible: false,
      passwordChanged: false,
    };
  },
  methods: {
    async loadAdmin() {
      const adminService = new AdminService();
      const adminId = this.$store.getters['user/getUserId'];
      const resp = await adminService.find(adminId);
      if (resp) this.profileForm = resp;
    },
    async editAdminSubmit() {
      if (!this.passwordChanged && !this.profileForm.password) {
        this.toggleVerifyPasswordMenu();
        return;
      }

      if (this.oldPassword && this.oldPassword !== '') {
        this.profileForm.oldPassword = this.oldPassword;
      }

      const adminService = new AdminService();
      const resp = await adminService.update(this.profileForm);

      if (resp) await this.$router.push('/');
      this.clearPassword();
    },
    async validatePassword() {
      this.passwordChanged = true;
      this.toggleVerifyPasswordMenu();
      await this.editAdminSubmit();
    },
    toggleVerifyPasswordMenu() {
      this.verifyPasswordVisible = !this.verifyPasswordVisible;
    },
    toggleChangePasswordMenu() {
      this.changePasswordVisible = !this.changePasswordVisible;
    },
    clearPassword() {
      this.passwordChanged = false;
      this.profileForm.password = null;
      this.oldPassword = '';
      this.verifyPassword = '';
    },
    confirmChangePassword() {
      const verifyPasswordConfirm = this.verifyPassword === this.profileForm.password;
      const validPasswords = this.oldPassword !== '' && this.profileForm.password !== '' && verifyPasswordConfirm;

      if (validPasswords) {
        notify('warning', 'Salve o usuário para validar a alteração');
        this.toggleChangePasswordMenu();
        return;
      }

      notify('negative', 'Valores de senha inválidos');
    },
  },
  watch: {
    verifyPassword() {
      this.passwordChanged = true;
    },
  },
  async mounted() {
    await this.loadAdmin();
  },
};
</script>

<style scoped>

</style>
