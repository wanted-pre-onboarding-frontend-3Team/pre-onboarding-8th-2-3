import request from './request';

const IssuesModel = {
  url: 'http://localhost:3001/issues',

  async get() {
    return request(this.url, 'GET');
  },

  async post(data) {
    const newIssues = request(this.url, 'POST', data);
    console.log(newIssues);
  },
  update() {},
  delete() {},
};

export default IssuesModel;
