<template>
  <div class="fullscreen bg-amber-10 text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Nada Encontrado...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue-grey-8"
        unelevated
        to="/"
        label="Voltar para início"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',
};
</script>
