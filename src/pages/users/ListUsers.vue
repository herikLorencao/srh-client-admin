<template>
  <q-page class="flex column items-center">
    <h1>Usuários</h1>

    <q-table class="table" :columns="columns" :data="users" row-key="id"
             selection="single" :selected.sync="userSelect" hide-pagination flat/>
    <q-pagination
      @input="loadUsers"
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

    <div v-show="showActions" class="project-actions-list">
      <q-btn @click="openRatingsUser" class="btn" text-color="white" label="Visualizar Avaliações"/>
      <q-btn @click="openRecommendations" class="btn" text-color="white"
             label="Visualizar Recomendações"/>
      <q-btn @click="toggleDeleteDialog" class="btn" text-color="white" label="Remover do Projeto"/>
    </div>

    <q-dialog v-model="deleteDialogVisible" persistent>
      <q-card class="delete-dialog-card">
        <q-card-section class="row items-center text-dialog">
          Tem certeza que deseja remover o usuário do projeto?
        </q-card-section>
        <q-card-actions class="btn-actions" align="center">
          <q-btn @click="toggleDeleteDialog" class="btn" text-color="white" label="Cancelar"/>
          <q-btn @click="deleteUserInProject" class="btn" text-color="white" label="Confirmar"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      deleteDialogVisible: false,
      pagination: {
        page: 1,
        pageNumber: 1,
      },
    };
  },
  methods: {
    async loadUsers(page = 1) {
      const apiPage = page - 1;
      const projectId = this.$store.getters['navigationInfo/getProjectId'];
      const projectService = new ProjectService();
      const resp = await projectService.listEvaluators(projectId, apiPage);

      if (resp && resp.page) this.pagination.pageNumber = resp.page.totalPages;

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
    toggleDeleteDialog() {
      this.deleteDialogVisible = !this.deleteDialogVisible;
    },
    async deleteUserInProject() {
      const projectService = new ProjectService();
      const projectId = this.$store.getters['navigationInfo/getProjectId'];
      const userId = this.userSelect[0].id;
      await projectService.removeEvaluatorInProject(projectId, userId);
      this.toggleDeleteDialog();
      await this.loadUsers();
    },
  },
  async mounted() {
    await this.loadUsers();
  },
};
</script>

<style scoped>

</style>
