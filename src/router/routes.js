const routes = [
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
    ],
  },
  {
    path: '/projetos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/projects/Projects') },
      { path: 'criar', component: () => import('pages/projects/CreateProject') },
      { path: 'editar/:id', component: () => import('pages/projects/EditProject') },
      { path: 'listar', component: () => import('pages/projects/ListProjects') },
      { path: 'selecionar', component: () => import('pages/projects/SelectProject') },
    ],
  },
  {
    path: '/projetos/usuarios',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/users/ListUsers') },
      { path: ':id/avaliacoes', component: () => import('pages/users/ItensRatingUser') },
      { path: ':id/recomendacoes', component: () => import('pages/users/RecommendationUser') },
    ],
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
