import axios from 'axios';

const request = async (url, method, data = null, headers = null, params = null) => {
  const response = await axios({
    url,
    method,
    headers,
    params,
    data,
  });

  if (response.statusText === 'OK') {
    return response;
  }

  throw new Error(`${url} 에서 ${method} 요청이 실패했습니다.`);
};

export default request;
