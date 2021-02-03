<template>
  <q-page class="flex column items-center">
    <h1>Editar Atributo</h1>
    <q-form class="form flex column items-center" @submit="submitEditAttribute">
      <q-input class="input" outlined v-model="attributeForm.name" label="Nome" />
      <div class="flex column type-options">
        <span>Tipo do atributo:</span>
        <q-option-group
          v-model="attributeForm.type"
          :options="options"
          color="primary"
          inline
        />
      </div>
      <q-input class="input" outlined v-model="attributeForm.value" label="Valor" />
      <q-btn class="btn" text-color="white" label="Salvar" type="submit" />
    </q-form>
  </q-page>
</template>

<script>
import AttributeService from 'src/service/AttributeService';

const options = [
  {
    label: 'Texto',
    value: 'TEXT',
  },
  {
    label: 'Númerico',
    value: 'NUMBER',
  },
  {
    label: 'Data',
    value: 'DATE',
  },
];

export default {
  name: 'EditAttribute',
  data() {
    return {
      attributeForm: {
        name: '',
        value: '',
        type: '',
      },
      options,
    };
  },
  methods: {
    async loadAttribute() {
      const attributeService = new AttributeService();
      const attributeId = this.$route.params.id;
      this.attributeForm = await attributeService.find(attributeId);
    },
    async submitEditAttribute() {
      const attributeService = new AttributeService();
      const resp = await attributeService.update(this.attributeForm);
      if (resp) await this.$router.push('/atributos');
    },
  },
  async mounted() {
    await this.loadAttribute();
  },
};
</script>

<style scoped>

</style>
