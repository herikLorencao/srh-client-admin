<template>
  <q-page class="flex column items-center">
    <h1>Editar Projeto</h1>
    <q-form @submit="submitEditProject" class="form flex column items-center">
      <q-input class="input" outlined v-model="projectForm.name" label="Nome"/>
      <q-input class="input" outlined readonly v-model="projectForm.date" label="Data"/>
      <q-input class="input" label="Descrição" outlined autogrow v-model="projectForm.description"
               type="textarea"/>
      <div class="input flex column situation-input">
        <span>Situação:</span>
        <q-select v-model="projectForm.situation" :options="situationOptions" outlined/>
        <q-tooltip anchor="bottom middle" self="center middle" content-class="bg-orange-8">
          Define se o projeto já foi realizado ou não
        </q-tooltip>
      </div>
      <div class="input visible-input">
        <q-toggle v-model="projectForm.visible" color="orange" label="Visibilidade"/>
        <q-tooltip anchor="center middle" self="center middle" content-class="bg-orange-8">
          Define se o projeto estará visível para os outros usuários
        </q-tooltip>
      </div>
      <q-btn class="btn edit-btn" text-color="white" label="Salvar" type="submit"/>
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
      situationOptions: [
        'Aberto', 'Fechado',
      ],
    };
  },
  methods: {
    async submitEditProject() {
      const projectService = new ProjectService();
      const form = this.projectForm;

      form.adminId = this.$store.getters['user/getUserId'];
      form.situation = this.projectForm.situation === 'Aberto' ? 'OPEN' : 'CLOSED';

      await projectService.update(form);
      await this.$router.push('/projetos/listar');
    },
    async loadProject() {
      const projectService = new ProjectService();
      this.projectForm = await projectService.find(this.$route.params.id);
      this.projectForm.situation = this.projectForm.situation === 'OPEN' ? 'Aberto' : 'Fechado';
    },
  },
  async mounted() {
    await this.loadProject();
  },
};
</script>

<style scoped>

</style>
