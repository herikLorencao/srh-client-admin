<template>
  <q-page class="flex column flex-center">
    <h1 v-show="username">Bem Vindo {{ username }}!</h1>
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
  computed: {
    username() {
      const userData = this.$store.getters['user/getUserInfoData'];
      return userData && userData.name ? userData.name : null;
    },
  },
};
</script>
