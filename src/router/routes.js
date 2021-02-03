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
    path: '/admins',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admins/ListAdmins') },
      { path: 'criar', component: () => import('pages/admins/CreateAdmin') },
      { path: 'editar/:id', component: () => import('pages/admins/EditAdmin') },
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
    path: '/projetos/recomendacoes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/recommendations/ListRecommendations') },
      { path: 'matrix/:id', component: () => import('pages/recommendations/ListMatrices') },
    ],
  },
  {
    path: '/projetos/avaliacoes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/itemRatings/ListItemRatings') },
    ],
  },
  {
    path: '/projetos/itens',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/items/ListItemsByProject') },
      { path: 'criar', component: () => import('pages/items/CreateItem') },
      { path: 'editar/:id', component: () => import('pages/items/EditItem') },
    ],
  },
  {
    path: '/projetos/tags',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/tags/ListTagsInProject') },
    ],
  },
  {
    path: '/projetos/tipoitens',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/typeItems/ListTypeItemInProject') },
    ],
  },
  {
    path: '/tags',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/tags/ListTags') },
      { path: 'criar', component: () => import('pages/tags/CreateTag') },
      { path: 'editar/:id', component: () => import('pages/tags/EditTag') },
    ],
  },
  {
    path: '/tipoitens',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/typeItems/ListTypeItems') },
      { path: 'criar', component: () => import('pages/typeItems/CreateTypeItem') },
      { path: 'editar/:id', component: () => import('pages/typeItems/EditTypeItem') },
    ],
  },
  {
    path: '/atributos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/attributes/ListAttributes') },
      { path: 'criar', component: () => import('pages/attributes/CreateAttribute') },
      { path: 'editar/:id', component: () => import('pages/attributes/EditAttribute') },
    ],
  },
  {
    path: '/apis',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/apis/ApiList') },
      { path: 'criar', component: () => import('pages/apis/CreateApi') },
      { path: 'editar/:id', component: () => import('pages/apis/EditApi') },
    ],
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
