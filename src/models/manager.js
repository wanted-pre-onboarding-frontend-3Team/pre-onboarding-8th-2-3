import request from './base';

export const getManagers = () => {
  return request({ url: `/managers` });
};
