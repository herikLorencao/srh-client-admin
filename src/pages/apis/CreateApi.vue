<template>
  <q-page class="flex column items-center">
    <h1>Criar Api</h1>
    <q-form class="form flex column items-center" @submit="submitCreateApi">
      <q-input class="input" outlined v-model="apiForm.name" label="Nome"/>
      <q-input class="input" outlined v-model="apiForm.login" label="Login"/>
      <q-input class="input" outlined v-model="apiForm.email" label="Email"/>
      <q-input class="input" type="password" outlined v-model="apiForm.password" label="Senha"/>
      <q-input class="input" type="password" outlined v-model="verifyPassword"
               label="Repetir Senha"/>
      <q-btn class="btn" text-color="white" label="Salvar" type="submit" />
    </q-form>
  </q-page>
</template>

<script>
import ApiService from 'src/service/ApiService';
import notify from 'src/helper/notify';

export default {
  name: 'CreateApi',
  computed: {
    correctPassword() {
      return this.apiForm.password === this.verifyPassword;
    },
  },
  data() {
    return {
      apiForm: {
        name: '',
        login: '',
        email: '',
        password: '',
        isAdmin: true,
      },
      verifyPassword: '',
    };
  },
  methods: {
    async submitCreateApi() {
      const apiService = new ApiService();

      if (this.correctPassword) {
        const resp = await apiService.create(this.apiForm);
        if (resp) await this.$router.push('/apis');
      } else {
        notify('negative', 'As senhas não conferem');
      }
    },
  },
};
</script>

<style scoped>

</style>
