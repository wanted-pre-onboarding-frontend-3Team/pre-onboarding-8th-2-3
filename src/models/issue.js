import request from './base';

export const getIssueList = () => {
  return request({ url: `/issues` });
};

export const getIssue = (id) => {
  return request({ url: `/issues/${id}` });
};

export const editIssue = (id, data) => {
  return request({
    method: 'PUT',
    url: `/issues/${id}`,
    data,
  });
};

export const postIssue = (data) => {
  return request({
    method: 'POST',
    url: '/issues',
    data,
  });
};

export const getManagerList = () => {
  return request({ url: `/managers` });
};
