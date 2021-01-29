<template>
  <q-page class="flex column items-center">
    <h1>Editar Tipo Item</h1>
    <q-form class="form flex column items-center" @submit="submitEditTypeItem">
      <q-input class="input" outlined v-model="typeItemForm.name" label="Nome" />
      <q-btn class="btn" text-color="white" label="Salvar" type="submit" />
    </q-form>
  </q-page>
</template>

<script>
import TypeItemService from 'src/service/TypeItemService';

export default {
  name: 'EditTypeItem',
  data() {
    return {
      typeItemForm: {
        name: '',
      },
    };
  },
  methods: {
    async loadTypeItem() {
      const typeItemService = new TypeItemService();
      const typeItemId = this.$route.params.id;
      this.typeItemForm = await typeItemService.find(typeItemId);
    },
    async submitEditTypeItem() {
      const typeItemService = new TypeItemService();
      const resp = await typeItemService.update(this.typeItemForm);
      if (resp) await this.$router.push('/tipoitens');
    },
  },
  async mounted() {
    await this.loadTypeItem();
  },
};
</script>

<style scoped>

</style>
