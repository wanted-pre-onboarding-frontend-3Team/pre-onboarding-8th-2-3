import request from './base';

export const getIssues = () => {
  return request({ url: `/issues` });
};

export const postIssue = (data) => {
  return request({ url: '/issues', method: 'POST', data });
};

export const updateIssue = (id, data) => {
  return request({ url: `/issues/${id}`, method: 'PUT', data });
};

export const deleteIssue = (id) => {
  return request({ url: `/issues/${id}`, method: 'DELETE' });
};
