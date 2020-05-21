import { Interceptors } from './interceptors';
const baseUrl = process.env.NODE_ENV == "production" ? "https://nnnight.club:443/" : "http://localhost:8111/";


export class Api {
  public axios: any;
  constructor() {
    // 获取axios实例
    this.axios = new Interceptors().getInterceptors();
  }


  /**
   * get请求
   * @param params  参数
   * @param route  請求路徑
   */
  public Get(route: string, query: object) {
    const url = baseUrl + route;

    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: query
      }).then((res: object) => {
        // console.log(typeof (res))
        resolve(res);
      }).catch((err: object) => {
        reject(err);
      });
    });

  }


  /**
   * post请求
   * @param params  参数
   * @param route  請求路徑
   */
  public Post(route: string, params: object) {
    const url = baseUrl + route;
    return new Promise((resolve, reject) => {
      this.axios.post(url, params).then((res: object) => {
        resolve(res);
      }).catch((err: object) => {
        reject(err);
      });
    });

  }

}

