<template>
  <q-page class="flex column items-center">
    <h1>Criar Tag</h1>
    <q-form class="form flex column items-center" @submit="submitCreateTag">
      <q-input class="input" outlined v-model="tagForm.name" label="Nome" />
      <q-btn class="btn" text-color="white" label="Salvar" type="submit" />
    </q-form>
  </q-page>
</template>

<script>
import TagService from 'src/service/TagService';

export default {
  name: 'CreateTag',
  data() {
    return {
      tagForm: {
        name: '',
      },
    };
  },
  methods: {
    async submitCreateTag() {
      const tagService = new TagService();
      const resp = await tagService.create(this.tagForm);
      if (resp) this.$router.push(`/tags/editar/${resp.id}`);
    },
  },
};
</script>

<style scoped>

</style>
