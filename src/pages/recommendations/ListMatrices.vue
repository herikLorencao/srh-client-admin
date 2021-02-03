<template>
  <q-page class="flex column items-center">
    <h1>Matrix de Recomendação</h1>
    <q-table class="table" :columns="columns" :data="recommendations" row-key="id" flat/>
  </q-page>
</template>

<script>
import RecommendationService from 'src/service/RecommendationService';

const formatAlgorithm = (algorithmId) => {
  switch (algorithmId) {
    case 1:
      return 'Colaborativo';
    case 2:
      return 'Conteúdo';
    case 3:
      return 'H. Ponderado (S)';
    case 4:
      return 'H. Misto (S)';
    case 5:
      return 'H. Ponderado (M)';
    case 6:
      return 'H. Misto (M)';
    default:
      return 'Indefinido';
  }
};

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
    name: 'weight',
    field: 'weight',
    label: 'Nota',
    align: 'center',
    sortable: true,
  },
  {
    name: 'runtimeInMiliSeconds',
    field: 'runtimeInMiliSeconds',
    label: 'Tempo(s)',
    align: 'center',
    sortable: true,
  },
  {
    name: 'algorithmId',
    field: 'algorithmId',
    label: 'Algoritmo',
    align: 'center',
    format: formatAlgorithm,
    sortable: true,
  },
];

export default {
  name: 'ListMatrices',
  data() {
    return {
      columns,
      recommendations: [],
    };
  },
  methods: {
    async loadRecommendations() {
      const recommendationService = new RecommendationService();
      const matrixId = this.$route.params.id;
      const resp = await recommendationService.listByMatrixId(matrixId);
      if (resp && resp.content) {
        this.recommendations = resp.content;
      }
    },
  },
  async mounted() {
    await this.loadRecommendations();
  },
};
</script>

<style scoped>

</style>
