<template>
  <q-page class="flex column items-center">
    <h1>Listar Projetos</h1>
    <q-table class="table" :columns="columns" :data="projects" row-key="id"
             selection="single" :selected.sync="projectSelected" flat/>
    <div v-show="showActions" class="project-actions-list">
      <q-btn @click="editProject" class="btn" text-color="white" label="Editar"/>
      <q-btn @click="toggleDeleteDialog" class="btn" text-color="white" label="Remover"/>
    </div>

    <q-dialog v-model="deleteDialogVisible" persistent>
      <q-card>
        <q-card-section class="row items-center">
          Tem certeza que deseja remover o projeto?
        </q-card-section>
        <q-card-actions align="center">
          <q-btn @click="toggleDeleteDialog" class="btn" text-color="white" label="Cancelar"/>
          <q-btn @click="deleteProject" class="btn" text-color="white" label="Confirmar"/>
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
    name: 'situation',
    field: 'situation',
    label: 'Situação',
    align: 'center',
    format: (value) => (value === 'OPEN' ? 'ABERTO' : 'FECHADO'),
    headerClasses: 'table-header-style',
  },
];

export default {
  name: 'ListProjects',
  computed: {
    showActions() {
      return this.projectSelected.length > 0;
    },
  },
  data() {
    return {
      columns,
      projectSelected: [],
      projects: [],
      deleteDialogVisible: false,
    };
  },
  methods: {
    editProject() {
      const projectId = this.projectSelected[0].id;
      this.$router.push(`/projetos/editar/${projectId}`);
    },
    toggleDeleteDialog() {
      this.deleteDialogVisible = !this.deleteDialogVisible;
    },
    async deleteProject() {
      const projectService = new ProjectService();
      const projectId = this.projectSelected[0].id;
      await projectService.remove(projectId);
    },
  },
  async mounted() {
    const projectService = new ProjectService();
    const resp = await projectService.list();
    // eslint-disable-next-line dot-notation
    if (resp && resp['_embedded'].projects) this.projects = resp['_embedded'].projects;
  },
};
</script>

<style scoped>
</style>
<template>
  <q-page class="flex column items-center">
    <h1>Listar Projetos</h1>
    <q-table class="table" :columns="columns" :data="projects" row-key="id"
             selection="single" :selected.sync="projectSelected" flat/>
    <div v-show="showActions" class="project-actions-list">
      <q-btn @click="editProject" class="btn" text-color="white" label="Editar"/>
      <q-btn @click="toggleDeleteDialog" class="btn" text-color="white" label="Remover"/>
    </div>

    <q-dialog v-model="deleteDialogVisible" persistent>
      <q-card class="delete-dialog-card">
        <q-card-section class="row items-center text-dialog">
          Tem certeza que deseja remover o projeto?
        </q-card-section>
        <q-card-actions class="btn-actions" align="center">
          <q-btn @click="toggleDeleteDialog" class="btn" text-color="white" label="Cancelar"/>
          <q-btn @click="deleteProject" class="btn" text-color="white" label="Confirmar"/>
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
    name: 'situation',
    field: 'situation',
    label: 'Situação',
    align: 'center',
    format: (value) => (value === 'OPEN' ? 'ABERTO' : 'FECHADO'),
    headerClasses: 'table-header-style',
  },
];

export default {
  name: 'ListProjects',
  computed: {
    showActions() {
      return this.projectSelected.length > 0;
    },
  },
  data() {
    return {
      columns,
      projectSelected: [],
      projects: [],
      deleteDialogVisible: false,
    };
  },
  methods: {
    async loadProjects() {
      const projectService = new ProjectService();
      const resp = await projectService.list();
      // eslint-disable-next-line dot-notation
      if (resp && resp['_embedded'].projects) this.projects = resp['_embedded'].projects;
    },
    editProject() {
      const projectId = this.projectSelected[0].id;
      this.$router.push(`/projetos/editar/${projectId}`);
    },
    toggleDeleteDialog() {
      this.deleteDialogVisible = !this.deleteDialogVisible;
    },
    async deleteProject() {
      const projectService = new ProjectService();
      const projectId = this.projectSelected[0].id;
      await projectService.remove(projectId);
      await this.loadProjects();
      this.toggleDeleteDialog();
    },
  },
  async mounted() {
    await this.loadProjects();
  },
};
</script>

<style scoped>
</style>
