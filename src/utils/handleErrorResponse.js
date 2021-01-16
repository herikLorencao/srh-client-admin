import notify from '../helper/notify';

export default (response) => {
  if (Array.isArray(response)) {
    response.forEach((responseInfo) => notify('negative', responseInfo.error));
    return;
  }
  notify('negative', response.error);
};
