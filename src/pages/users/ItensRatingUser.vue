<template>
  <q-page class="flex column items-center">
    <h1>Avaliações do Usuário</h1>
    <q-table class="table" :columns="columns" :data="ratings" row-key="itemId" flat/>
  </q-page>
</template>

<script>
import ItemRatingService from 'src/service/ItemRatingService';
import ItemService from 'src/service/ItemService';

const columns = [
  {
    name: 'itemId',
    field: 'itemId',
    label: 'Código do Item',
    align: 'center',
    sortable: true,
    style: 'width: 80px',
    headerStyle: 'width: 80px',
  },
  {
    name: 'name',
    field: 'name',
    label: 'Item',
    align: 'center',
    sortable: true,
  },
  {
    name: 'score',
    field: 'score',
    label: 'Nota',
    align: 'center',
    sortable: true,
  },
];

export default {
  name: 'ItensRatingUser',
  data() {
    return {
      columns,
      ratings: [],
    };
  },
  methods: {
    async loadItemRatings() {
      const itemRatingService = new ItemRatingService();
      const resp = await itemRatingService.listByEvaluator(this.$route.params.id);

      if (resp.content) {
        const promises = resp.content.map(async (itemRating) => {
          const itemService = new ItemService();
          const item = await itemService.find(itemRating.itemId);

          itemRating.itemId = item.id;
          itemRating.name = item.name;
        });

        await Promise.all(promises);
      }

      // eslint-disable-next-line dot-notation
      if (resp && resp.content) this.ratings = resp.content;
    },
  },
  async mounted() {
    await this.loadItemRatings();
  },
};
</script>

<style scoped>

</style>
