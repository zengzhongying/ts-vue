import axios from 'axios';
import { Message } from 'element-ui';

export class Interceptors {
  public instance: any;

  constructor() {
    // 创建axios实例
    this.instance = axios.create({ timeout: 1000 * 12 });
    // 初始化拦截器
    this.initInterceptors();
  }

  // 为了让http.ts中获取初始化好的axios实例
  public getInterceptors() {
    return this.instance;
  }


  // 初始化拦截器
  public initInterceptors() {
    // 设置post请求头
    this.instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    /**
     * 请求拦截器
     * 每次请求前，如果存在token则在请求头中携带token
     */
    // this.instance.interceptors.request.use(
    //   (config: any) => {
    //     // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    //     // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    //     // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    //     if (config.headers.isJwt) {
    //       const token = localStorage.getItem('id_token');
    //       if (token) {
    //         config.headers.Authorization = 'Bearer ' + token;
    //       }
    //     }
    //     return config;
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   },
    // );


    // 响应拦截器
    this.instance.interceptors.response.use(
      // 请求成功
      (res: any) => {
        // if (res.headers.authorization) {
        //   localStorage.setItem('id_token', res.headers.authorization);
        // } else {
        //   if (res.data && res.data.token) {
        //     localStorage.setItem('id_token', res.data.token);
        //   }
        // }

        if (res.status === 200) {
          return Promise.resolve(res.data);
        } else {
          this.errorHandle(res);
          return Promise.reject(res.data);
        }
      },
      // 请求失败
      (error: any) => {
        const { response } = error;
        if (response) {
          // 请求已发出，但是不在2xx的范围
          this.errorHandle(response);
          return Promise.reject(response.data);
        } else {
          // 处理断网的情况
          // eg:请求超时或断网时，更新state的network状态
          // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
          // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
          Message.warning('网络连接异常,请稍后再试!');
        }
      });
  }


  /**
   * http握手错误
   * @param res  响应回调,根据不同响应进行不同操作
   */
  private errorHandle(res: any) {
    // 状态码判断
    switch (res.status) {
      case 401:
        break;
      case 403:
        break;
      case 404:
        Message.warning('请求的资源不存在');
        break;
      default:
        Message.warning('连接错误');
    }
  }
}
