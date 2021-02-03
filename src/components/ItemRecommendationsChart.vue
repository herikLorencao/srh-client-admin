<template>
  <div class="flex column">
    <VueApexCharts width="450" type="bar" :options="options" :series="series"></VueApexCharts>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'ItemRecommendationsChart',
  props: {
    subtitle: {
      required: true,
      type: String,
    },
  },
  components: {
    VueApexCharts,
  },
  data() {
    return {
      options: {
        chart: {
          type: 'bar',
          id: 'vuechart-example',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      }],
    };
  },
};
</script>

<style scoped>

</style>
