<template>
  <q-page class="flex column items-center">
    <h1>Editar Projeto</h1>
    <q-form @submit="submitEditProject" class="form flex column items-center">
      <q-input class="input" outlined v-model="projectForm.name" label="Nome"/>
      <q-input class="input" outlined readonly v-model="projectForm.date" label="Data"/>
      <q-input class="input" label="Descrição" outlined autogrow v-model="projectForm.description"
               type="textarea"/>
      <q-btn class="btn" text-color="white" label="Salvar" type="submit"/>
    </q-form>
  </q-page>
</template>

<script>
import ProjectService from 'src/service/ProjectService';

export default {
  name: 'EditProject',
  data() {
    return {
      projectForm: {
        name: '',
        date: '',
        description: '',
      },
    };
  },
  methods: {
    async submitEditProject() {
      const projectService = new ProjectService();
      await projectService.update(this.projectForm);
    },
  },
  async mounted() {
    const projectService = new ProjectService();
    this.projectForm = await projectService.find(this.$route.params.id);
  },
};
</script>

<style scoped>

</style>
