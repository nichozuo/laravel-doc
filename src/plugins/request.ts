import { notification } from 'antd';
import { extend } from 'umi-request';

const request = extend({
  prefix: '/api/docs/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  errorHandler: function (error) {
    notification['error']({
      message: error.message,
    });
  },
});

request.interceptors.response.use(async (response) => {
  const data = await response.clone().json();
  console.log('response data', data);
  if (data.code !== 0) {
    notification['error']({
      message: data.message,
      description: data.description,
    });
    Promise.reject(data);
  }
  return response;
});

export default request;
