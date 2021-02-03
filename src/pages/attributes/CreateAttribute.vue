<template>
  <q-page class="flex column items-center">
    <h1>Criar Atributo</h1>
    <q-form class="form flex column items-center" @submit="submitCreateAttribute">
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
  name: 'CreateAttribute',
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
    async submitCreateAttribute() {
      const attributeService = new AttributeService();
      const resp = await attributeService.create(this.attributeForm);
      if (resp) await this.$router.push('/atributos');
    },
  },
};
</script>

<style scoped>

</style>
