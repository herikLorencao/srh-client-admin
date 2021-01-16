export default async ({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const projectDependencyRoutes = ['usuarios', 'recomendacoes', 'avaliacoes', 'tags',
      'tipoitens', 'itens'];

    const mathRoutes = projectDependencyRoutes.find(
      (route) => to.path.split('/')[2] === route,
    );

    const projectId = store.getters['navigationInfo/getProjectId'];

    if (from.fullPath.includes('selecionar')) {
      store.commit('navigationInfo/setLastRouteNavigate', from);
    }

    if (!projectId && mathRoutes && mathRoutes.length > 0) {
      store.commit('navigationInfo/setLastRouteNavigate', to);
      next('/projetos/selecionar');
      return;
    }

    next();
  });
};
