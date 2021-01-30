<template>
  <q-page class="flex column flex-center">
    <h1>Bem Vindo Admin!</h1>
    <div class="flex justify-between chart-painel">
      <ItemRecommendationsChart :subtitle="'Teste'" class="chart"/>
      <ItemRecommendationsChart :subtitle="'Teste 2'" class="chart"/>
    </div>
  </q-page>
</template>

<script>
import ItemRecommendationsChart from 'components/ItemRecommendationsChart';

export default {
  name: 'PageIndex',
  components: {
    ItemRecommendationsChart,
  },
};
</script>
