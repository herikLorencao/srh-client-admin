<template>
  <q-page class="flex column items-center">
    <h1>Editar Tag</h1>
    <q-form class="form flex column items-center" @submit="submitEditTag">
      <q-input class="input" outlined v-model="tagForm.name" label="Nome" />
      <q-btn class="btn" text-color="white" label="Salvar" type="submit" />
    </q-form>
  </q-page>
</template>

<script>
import TagService from 'src/service/TagService';

export default {
  name: 'EditTag',
  data() {
    return {
      tagForm: {
        name: '',
      },
    };
  },
  methods: {
    async loadTag() {
      const tagService = new TagService();
      const tagId = this.$route.params.id;
      this.tagForm = await tagService.find(tagId);
    },
    async submitEditTag() {
      const tagService = new TagService();
      await tagService.update(this.tagForm);
      await this.$router.push('/tags');
    },
  },
  async mounted() {
    await this.loadTag();
  },
};
</script>

<style scoped>

</style>
