<template>
  <q-page class="flex column items-center">
    <h1>Editar Tipo Item</h1>
    <q-form class="form flex column items-center" @submit="submitEditTypeItem">
      <q-input class="input" outlined v-model="typeItemForm.name" label="Nome"/>
      <div class="typeitem-attribute">
        <q-btn @click="toggleTypeItemAttributeDialog" class="btn" text-color="white"
               label="Vincular atributos"/>
      </div>
      <q-btn class="btn" text-color="white" label="Salvar" type="submit"/>
    </q-form>

    <q-dialog v-model="typeItemAttributeDialog" persistent>
      <q-card class="typeitem-attribute-dialog-card flex column items-center">
        <q-card-section class="row items-center text-dialog">
          Vincular atributo
        </q-card-section>
        <q-card-section class="table-attributes flex justify-center">
          <q-table class="table" :columns="columns" :data="attributes" row-key="id"
                   selection="multiple" :selected.sync="attributeSelect" flat/>
        </q-card-section>
        <q-card-actions class="actions flex justify-center">
          <q-btn @click="toggleTypeItemAttributeDialog" class="btn" text-color="white"
                 label="Cancelar"/>
          <q-btn @click="addAttributes" class="btn" text-color="white" label="Salvar"
                 type="submit"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import _ from 'lodash';
import TypeItemService from 'src/service/TypeItemService';
import AttributeService from 'src/service/AttributeService';

const translateType = (type) => {
  switch (type) {
    case 'TEXT':
      return 'Texto';
    case 'NUMBER':
      return 'Número';
    case 'DATE':
      return 'Data';
    default:
      return 'Indefinido';
  }
};

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
  {
    name: 'type',
    field: 'type',
    label: 'Tipo',
    align: 'center',
    format: translateType,
    sortable: true,
  },
  {
    name: 'value',
    field: 'value',
    label: 'Valor',
    align: 'center',
    sortable: true,
  },
];

export default {
  name: 'EditTypeItem',
  data() {
    return {
      columns,
      attributes: [],
      attributeSelect: [],
      attributesSelectOld: [],
      typeItemForm: {
        name: '',
      },
      typeItemAttributeDialog: false,
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
    async loadAttributes() {
      const attributeService = new AttributeService();
      const resp = await attributeService.list();
      // eslint-disable-next-line dot-notation
      if (resp && resp['_embedded'].attributes) this.attributes = resp['_embedded'].attributes;
    },
    toggleTypeItemAttributeDialog() {
      this.typeItemAttributeDialog = !this.typeItemAttributeDialog;
    },
    async loadTypeItemAttributes() {
      const typeItemService = new TypeItemService();
      // eslint-disable-next-line radix
      const typeItemId = parseInt(this.$route.params.id);
      const resp = await typeItemService.loadAttributes(typeItemId);
      // eslint-disable-next-line dot-notation
      if (resp && resp['_embedded'].attributes) this.attributesSelectOld = resp['_embedded'].attributes;
      this.attributeSelect = this.attributesSelectOld;
    },
    async addAttributes() {
      const typeItemService = new TypeItemService();
      const attributesDifferences = _.xorWith(this.attributeSelect, this.attributesSelectOld);
      const typeItemId = this.$route.params.id;

      await Promise.all(attributesDifferences.map(
        async (attribute) => {
          const insertedAttribute = await typeItemService
            .findAttributeInTypeItem(typeItemId, attribute.id);

          if (insertedAttribute) {
            await typeItemService.removeAttribute(attribute.id, typeItemId);
          } else {
            await typeItemService.addAttribute(attribute, typeItemId);
          }
        },
      ));

      this.toggleTypeItemAttributeDialog();
    },
  },
  async mounted() {
    await this.loadTypeItem();
    await this.loadAttributes();
    await this.loadTypeItemAttributes();
  },
};
</script>

<style scoped>

</style>
