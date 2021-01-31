<template>
  <q-page class="flex column items-center">
    <h1>Selecionar Projeto</h1>
    <q-table class="table" :columns="columns" :data="projects" row-key="id"
             selection="single" :selected.sync="projectSelected" flat/>
    <div v-show="showActions" class="project-actions-list">
      <q-btn @click="selectProject" class="btn" text-color="white" label="Selecionar"/>
    </div>
  </q-page>
</template>

<script>
import ProjectService from 'src/service/ProjectService';
import notify from 'src/helper/notify';

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
  name: 'SelectProject',
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
    };
  },
  methods: {
    async loadProjects() {
      const projectService = new ProjectService();
      const resp = await projectService.list();
      // eslint-disable-next-line dot-notation
      if (resp && resp['_embedded'].projects) {
        // eslint-disable-next-line dot-notation
        const allProjects = resp['_embedded'].projects;
        const adminId = this.$store.getters['user/getUserId'];
        this.projects = allProjects.filter((project) => project.adminId === adminId);
      }
    },
    selectProject() {
      const projectId = this.projectSelected[0].id;
      const lastRouteNavigate = this.$store.getters['navigationInfo/getLastRouteNavigate'];

      this.$store.commit('navigationInfo/setProjectId', projectId);
      notify('positive', 'Projeto selecionado com sucesso');

      if (lastRouteNavigate && !lastRouteNavigate.fullPath.includes('selecionar')) {
        this.$router.push(lastRouteNavigate.fullPath);
      }
    },
  },
  async mounted() {
    await this.loadProjects();
  },
};
</script>

<style scoped>

</style>
