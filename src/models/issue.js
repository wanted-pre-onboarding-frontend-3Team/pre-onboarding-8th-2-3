import request from './base';

export const getIssues = () => {
  return request({ url: `/issues` });
};

// export const postIssue = () => {
//   request({
//     method: 'POST',
//     url: '/issues',
//     data: {
//     },
//   });
// };
