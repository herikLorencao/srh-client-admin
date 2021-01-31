<template>
  <q-page class="flex column items-center">
    <h1>Criar Item</h1>
    <q-form class="form flex column items-center" @submit="submitCreateItem">
      <q-input class="input" outlined v-model="itemForm.name" label="Nome" />
      <q-input class="input" outlined v-model="itemForm.description" label="Descrição" />
      <q-btn class="btn" text-color="white" label="Salvar" type="submit" />
    </q-form>
  </q-page>
</template>

<script>
import ItemService from 'src/service/ItemService';

export default {
  name: 'CreateItem',
  data() {
    return {
      itemForm: {
        name: '',
        description: '',
      },
    };
  },
  methods: {
    async submitCreateItem() {
      const itemService = new ItemService();
      this.itemForm.projectId = this.$store.getters['navigationInfo/getProjectId'];
      const resp = await itemService.create(this.itemForm);
      if (resp) await this.$router.push('/projetos/itens');
    },
  },
};
</script>

<style scoped>

</style>
