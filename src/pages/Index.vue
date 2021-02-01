<template>
  <q-page class="flex column flex-center">
    <div class="flex column items-center welcome-painel">
      <img src="../assets/loginLogo.png" alt="Logo"/>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  computed: {
    username() {
      const userData = this.$store.getters['user/getUserInfoData'];
      return userData && userData.name ? userData.name : null;
    },
  },
};
</script>
