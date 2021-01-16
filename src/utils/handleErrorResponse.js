import notify from '../helper/notify';

const translateFields = (field) => {
  switch (field) {
    case 'login':
      return 'login';
    case 'password':
      return 'senha';
    case 'name':
      return 'nome';
    case 'description':
      return 'descrição';
    default:
      return 'indefinido';
  }
};

export default (response) => {
  if (Array.isArray(response)) {
    response.forEach((responseInfo) => {
      notify('negative', `Campo ${translateFields(responseInfo.error)}: ${responseInfo.field}`);
    });
    return;
  }
  notify('negative', response.error);
};
