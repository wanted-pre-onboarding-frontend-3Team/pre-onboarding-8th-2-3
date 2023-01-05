import request from './base';

export const getIssues = () => {
  return request({ url: `/issues` });
};

export const getSelectIssue = (id) => {
  return request({ url: `/issues/${id}` });
};

export const getManages = () => {
  return request({ url: `/managers` });
};

export const postIssue = (data) => {
  request({
    method: 'POST',
    url: '/issues',
    data,
  });
};

export const editIssue = (id, data) => {
  request({
    method: 'PUT',
    url: `/issues/${id}`,
    data,
  });
};

export const deleteIssue = (id) => {
  return request({
    method: 'DELETE',
    url: `/issues/${id}`,
  });
};
