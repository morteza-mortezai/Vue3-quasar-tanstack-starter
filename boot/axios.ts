import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import ResponseData from 'src/types/ResponseData';
import { Notify,LocalStorage } from 'quasar'
import router from 'src/router'

export interface HttpResponse<T = unknown> {
  data: T
  code: string
  status: string
  message?: string
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}
const parseError = (result: any) => {
  if (result.status === 401) {
    LocalStorage.set('lastUrl', router)
    // setTimeout(() => {
    //   router.push({
    //     name: 'login',
    //     params: { redirect: router.currentRoute.fullPath },
    //   })
    // }, 350)
  } else {
    Notify.create({
      type: 'warning',
      position: 'top',
      message: 'error',
    })
  }
}
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 20000,
  headers: {
    'Content-type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  async (response: AxiosResponse) => {
    const res = response;
    const { status } = res;
    if (res.data?.status === 'success') {
      return res.data
    }
    // Custom status code validation
    // if (status !== 200) {
    //   return Promise.reject({
    //     response,
    //     message: 'CustomError',
    //   });
    // }

    parseError(res)
    return Promise.reject(res)
  },
  // export default catch
  (err) => {
    // let message='something went wrong'
    // if (error.response && error.response.data) {
    //   message=error.response.data
    // }
    // if (error.response && error.response.status==403) {
    //   window.location.replace("/auth/login");
    // }
    const response = err.response
    parseError(response.data)
    return Promise.reject(response)

    // Notify.create({
    //   message,
    //   type:'negative',
    //   position:'top'
    // })
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
