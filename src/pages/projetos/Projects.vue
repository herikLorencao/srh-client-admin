<template>
  <q-page class="flex flex-center">
    <div class="project-actions">
      <div @click="createProject" class="project-action-button">
        <q-icon class="icon" name="fas fa-plus-circle" />
        <span>Criar Projeto</span>
      </div>
      <div @click="listProjects" class="project-action-button">
        <q-icon class="icon" name="fas fa-plus-circle" />
        <span>Listar Projetos</span>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Projetos',
  methods: {
    createProject() {
      this.$router.push('/projetos/criar');
    },
    listProjects() {
      this.$router.push('/projetos/listar');
    },
  },
};
</script>

<style scoped>

</style>
