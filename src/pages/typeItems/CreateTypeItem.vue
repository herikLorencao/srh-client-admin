<template>
  <q-page class="flex column items-center">
    <h1>Criar Tipo Item</h1>
    <q-form class="form flex column items-center" @submit="submitCreateTypeItem">
      <q-input class="input" outlined v-model="typeItemForm.name" label="Nome"/>
      <q-btn class="btn" text-color="white" label="Salvar" type="submit"/>
    </q-form>
  </q-page>
</template>

<script>
import TypeItemService from 'src/service/TypeItemService';

export default {
  name: 'CreateTypeItem',
  data() {
    return {
      typeItemForm: {
        name: '',
      },
    };
  },
  methods: {
    async submitCreateTypeItem() {
      const typeItemService = new TypeItemService();
      const resp = await typeItemService.create(this.typeItemForm);
      if (resp) await this.$router.push(`/tipoitens/editar/${resp.id}`);
    },
  },
};
</script>

<style scoped>

</style>
