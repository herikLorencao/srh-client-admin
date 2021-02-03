<template>
  <q-page class="flex column items-center">
    <h1>Avaliações</h1>
    <q-table class="table" :columns="columns" :data="ratings" row-key="itemId" flat/>
    <q-pagination
      @input="loadItemRatings"
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
  </q-page>
</template>

<script>
import ItemRatingService from 'src/service/ItemRatingService';
import ItemService from 'src/service/ItemService';
import UserService from 'src/service/UserService';

const columns = [
  {
    name: 'evaluatorId',
    field: 'evaluatorId',
    label: 'Código do Usuário',
    align: 'center',
    sortable: true,
    style: 'width: 80px',
    headerStyle: 'width: 80px',
  },
  {
    name: 'evaluatorName',
    field: 'evaluatorName',
    label: 'Login do Usuário',
    align: 'center',
    sortable: true,
  },
  {
    name: 'itemId',
    field: 'itemId',
    label: 'Código do Item',
    align: 'center',
    sortable: true,
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
  name: 'ListItemRatings',
  data() {
    return {
      columns,
      ratings: [],
      pagination: {
        page: 1,
        pageNumber: 1,
      },
    };
  },
  methods: {
    async loadItemRatings(page = 1) {
      const apiPage = page - 1;
      const itemRatingService = new ItemRatingService();
      const resp = await itemRatingService.listByProject(this.$store.getters['navigationInfo/getProjectId'], apiPage);
      if (resp && resp.totalPages) this.pagination.pageNumber = resp.totalPages;

      if (resp.content) {
        const promises = resp.content.map(async (itemRating) => {
          const itemService = new ItemService();
          const userService = new UserService();

          const item = await itemService.find(itemRating.itemId);
          const evaluator = await userService.find(itemRating.evaluatorId);

          itemRating.itemId = item.id;
          itemRating.name = item.name;

          itemRating.evaluatorName = evaluator.login;
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
