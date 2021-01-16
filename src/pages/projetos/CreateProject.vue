<template>
  <q-page class="flex column items-center">
    <h1>Criar Projeto</h1>
    <q-form class="form flex column items-center" @submit="submitCreateProject">
      <q-input class="input" outlined v-model="projectForm.name" label="Nome" />
      <q-input class="input" outlined readonly v-model="currentDate" label="Data" />
      <q-input class="input"  label="Descrição" outlined autogrow v-model="projectForm.description"
               type="textarea"/>
      <q-btn class="btn" text-color="white" label="Salvar" type="submit" />
    </q-form>
  </q-page>
</template>

<script>
import ProjectService from 'src/service/ProjectService';

export default {
  name: 'CreateProject',
  computed: {
    currentDate() {
      return new Intl.DateTimeFormat().format(new Date());
    },
  },
  data() {
    return {
      projectForm: {
        name: '',
        description: '',
        adminId: this.$store.getters['user/getUserId'],
        situation: 'OPEN',
        visible: false,
      },
    };
  },
  methods: {
    async submitCreateProject() {
      const projectService = new ProjectService();
      const resp = await projectService.create(this.projectForm);
      if (resp) this.$router.push(`/projetos/editar/${resp.id}`);
    },
  },
};
</script>

<style scoped>

</style>
