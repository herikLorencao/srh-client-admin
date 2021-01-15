import jwt from 'jsonwebtoken';

// eslint-disable-next-line no-unused-vars
export default async ({ router, store, Vue }) => {
  router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
      next();
      return;
    }

    const sessionToken = Vue.$cookies.get('sessionToken');

    try {
      jwt.verify(sessionToken, Buffer.from('VGFrZSBPbiBNZSBUYWtlIE1lIE9u', 'base64'), { algorithms: ['HS256'] });
      next();
    } catch (e) {
      console.log(e);
      next('/login');
    }
  });
};
