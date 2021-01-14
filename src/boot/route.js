// eslint-disable-next-line no-unused-vars
export default async ({ router, store, Vue }) => {
  router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
      next();
      return;
    }

    Vue.$cookies.set('sessionToken', '');

    const validToken = false;

    if (validToken) {
      next();
      return;
    }

    next('/login');
  });
};
