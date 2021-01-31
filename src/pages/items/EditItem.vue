<template>
  <q-page class="flex column items-center">
    <h1>Editar Item</h1>
    <q-form class="form flex column items-center" @submit="submitEditItem">
      <q-input class="input" outlined v-model="itemForm.name" label="Nome" />
      <q-input class="input" outlined v-model="itemForm.description" label="Nome" />
      <q-btn class="btn" text-color="white" label="Salvar" type="submit" />
    </q-form>
  </q-page>
</template>

<script>
import ItemService from 'src/service/ItemService';

export default {
  name: 'EditItem',
  data() {
    return {
      itemForm: {
        name: '',
        description: '',
      },
    };
  },
  methods: {
    async loadItem() {
      const itemService = new ItemService();
      const itemId = this.$route.params.id;
      this.itemForm = await itemService.find(itemId);
    },
    async submitEditItem() {
      const itemService = new ItemService();
      this.itemForm.projectId = this.$store.getters['navigationInfo/getProjectId'];

      const resp = await itemService.update(this.itemForm);
      if (resp) await this.$router.push('/projetos/itens');
    },
  },
  async mounted() {
    await this.loadItem();
  },
};
</script>

<style scoped>

</style>
