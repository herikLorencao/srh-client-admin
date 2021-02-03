<template>
  <q-page class="flex column items-center">
    <h1>Criar Item</h1>
    <q-form class="form flex column items-center" @submit="submitCreateItem">
      <q-input class="input" outlined v-model="itemForm.name" label="Nome"/>
      <q-input class="input" outlined v-model="itemForm.description" label="Descrição"/>

      <div class="itens-table flex column items-center">
        <span class="table-title">Escolher Tipo de Item (opcional)</span>
        <q-table class="table" :columns="columns" :data="typeItens" row-key="id"
                 selection="single" :selected.sync="typeItemSelect" flat/>
        <q-pagination
          @input="loadTypeItens"
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
      </div>
      <q-btn class="btn" text-color="white" label="Salvar" type="submit"/>
    </q-form>
  </q-page>
</template>

<script>
import ItemService from 'src/service/ItemService';
import TypeItemService from 'src/service/TypeItemService';

const columns = [
  {
    name: 'id',
    field: 'id',
    label: 'Código',
    align: 'center',
    sortable: true,
  },
  {
    name: 'name',
    field: 'name',
    label: 'Nome',
    align: 'center',
    sortable: true,
  },
];

export default {
  name: 'CreateItem',
  data() {
    return {
      columns,
      itemForm: {
        name: '',
        description: '',
      },
      typeItens: [],
      typeItemSelect: [],
      pagination: {
        page: 1,
        pageNumber: 1,
      },
    };
  },
  methods: {
    async loadTypeItens(page = 1) {
      const apiPage = page - 1;
      const typeItemService = new TypeItemService();
      const resp = await typeItemService.list(apiPage);
      if (resp && resp.page) this.pagination.pageNumber = resp.page.totalPages;
      // eslint-disable-next-line dot-notation
      if (resp && resp['_embedded'].typeitems) this.typeItens = resp['_embedded'].typeitems;
    },
    async submitCreateItem() {
      const itemService = new ItemService();
      this.itemForm.projectId = this.$store.getters['navigationInfo/getProjectId'];

      if (this.typeItemSelect.length > 0) {
        this.itemForm.typeItemId = this.typeItemSelect[0].id;
      }

      const resp = await itemService.create(this.itemForm);
      if (resp) await this.$router.push(`/projetos/itens/editar/${resp.id}`);
    },
  },
  async mounted() {
    await this.loadTypeItens();
  },
};
</script>

<style scoped>

</style>
