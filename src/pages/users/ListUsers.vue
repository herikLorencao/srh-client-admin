<template>
  <q-page class="flex column items-center">
    <h1>Usuários</h1>

    <q-table class="table" :columns="columns" :data="users" row-key="id"
             selection="single" :selected.sync="userSelect" flat/>

    <div v-show="showActions" class="project-actions-list">
      <q-btn @click="openRatingsUser" class="btn" text-color="white" label="Visualizar Avaliações"/>
      <q-btn @click="openRecommendations" class="btn" text-color="white"
             label="Visualizar Recomendações"/>
      <q-btn class="btn" text-color="white" label="Remover do Projeto"/>
    </div>
  </q-page>
</template>

<script>
import ProjectService from 'src/service/ProjectService';

const columns = [
  {
    name: 'id',
    field: 'id',
    label: 'Código',
    align: 'center',
    sortable: true,
    style: 'width: 80px',
    headerStyle: 'width: 80px',
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
  name: 'ListUsers',
  computed: {
    showActions() {
      return this.userSelect.length > 0;
    },
  },
  data() {
    return {
      columns,
      userSelect: [],
      users: [],
    };
  },
  methods: {
    async loadUsers() {
      const projectId = this.$store.getters['navigationInfo/getProjectId'];
      const projectService = new ProjectService();
      const resp = await projectService.listEvaluators(projectId);
      // eslint-disable-next-line dot-notation
      if (resp && resp['_embedded'].evaluators) this.users = resp['_embedded'].evaluators;
    },
    openRatingsUser() {
      const userId = this.userSelect[0].id;
      this.$router.push(`/projetos/usuarios/${userId}/avaliacoes`);
    },
    openRecommendations() {
      const userId = this.userSelect[0].id;
      this.$router.push(`/projetos/usuarios/${userId}/recomendacoes`);
    },
  },
  async mounted() {
    await this.loadUsers();
  },
};
</script>

<style scoped>

</style>
