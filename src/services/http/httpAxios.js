import axios from 'axios'
import qs from 'qs'
import config from '../../config/config'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
axios.defaults.baseURL = config.SERVER_ADDRESS;
axios.defaults.timeout = config.HTTP_TIME_OUT;

axios.interceptors.response.use((response) => {
  return response;
},(error) => {
  return Promise.reject(error);
});

// //POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  if(config.method  === 'post'){
    config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  return Promise.reject("错误的入参"+error);
});


export default {
  post: function (url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  get: function (url,params) {
    return new Promise((resolve,reject) => {
      axios.get(url,{params:params})
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
