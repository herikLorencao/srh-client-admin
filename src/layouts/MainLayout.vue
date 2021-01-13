<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="flex justify-between">
        <div>
          <q-btn
            flat
            dense
            round
            icon="fas fa-bars"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />

          <q-btn
            flat
            dense
            round
            icon="fas fa-home"
            aria-label="Home"
          />
        </div>

        <div class="flex">
          <q-toolbar-title>
            Admin
          </q-toolbar-title>
          <q-btn
            flat
            dense
            round
            icon="fas fa-user"
            aria-label="User"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list class="flex column">
        <q-img class="logo-main-image self-center" src="../assets/primaryLogo.png" />

        <ItemMenu v-for="linkData in links" :key="linkData.link" :link="linkData.link"
                  :icon="linkData.icon" :label="linkData.label" :parent="linkData.parent"
                  :route-selected="routeSelected"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer :elevated="false" class="application-footer">
      <q-toolbar>
        <q-toolbar-title class="flex justify-center footer-text">
          Desenvolvido por Herik dos S. Lorenção
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import ItemMenu from 'components/ItemMenu/ItemMenu';

const linksData = [
  {
    link: '/projetos',
    icon: 'fas fa-home',
    label: 'Projetos',
  },
  {
    link: '/projetos/usuarios',
    icon: 'fas fa-user',
    label: 'Usuários',
    parent: 'projetos',
  },
  {
    link: '/projetos/recomendacoes',
    icon: 'fas fa-user',
    label: 'Recomendações',
    parent: 'projetos',
  },
  {
    link: '/projetos/avaliacoes',
    icon: 'fas fa-user',
    label: 'Avaliações',
    parent: 'projetos',
  },
  {
    link: '/projetos/tags',
    icon: 'fas fa-user',
    label: 'Tags',
    parent: 'projetos',
  },
  {
    link: '/projetos/tipoitens',
    icon: 'fas fa-user',
    label: 'Tipos de item',
    parent: 'projetos',
  },
  {
    link: '/projetos/itens',
    icon: 'fas fa-user',
    label: 'Itens',
    parent: 'projetos',
  },
  {
    link: '/tags',
    icon: 'fas fa-home',
    label: 'Tags',
  },
  {
    link: '/tipoitens',
    icon: 'fas fa-home',
    label: 'Tipos de item',
  },
  {
    link: '/api',
    icon: 'fas fa-home',
    label: 'APIs',
  },
];

export default {
  name: 'MainLayout',
  components: { ItemMenu },
  computed: {
    routeSelected() {
      return this.$route.path;
    },
  },
  data() {
    return {
      leftDrawerOpen: false,
      links: linksData,
    };
  },
};
</script>
