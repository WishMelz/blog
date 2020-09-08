import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
// 创建一个错误
function errorCreate(msg) {
    const error = new Error(msg)
    errorLog(error)
    throw error
}
// 记录和显示错误
function errorLog(error) {
    // 显示提示
    Message({
        message: error,
        type: 'error',
        duration: 5 * 1000
    })
}

axios.defaults.baseURL = "http://127.0.0.1:10110/";
axios.interceptors.request.use(
    config => {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        let token = localStorage.getItem("blogToken");
        if (!Object.hasOwnProperty.call(config.headers, "Authorization") && token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);





// 响应拦截器
axios.interceptors.response.use(
    response => {
        // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response.data
        // 这个状态码是和后端约定的
        const { code } = dataAxios
        // 根据 code 进行判断
        if (code === undefined) {
            return dataAxios
        } else {
            // 有 code 代表这是一个后端接口 可以进行进一步的判断
            switch (code) {
                case 200:
                    // [ 示例 ] code === 0 代表没有错误
                    return dataAxios.data
                case 400:
                    // 未登录[ 示例 ] 其它和后台约定的 code
                    errorCreate(`[ code: 400 - 系统异常 ] ${dataAxios.msg}: ${response.config.url}`)
                    //   errorLog(dataAxios.err)
                    break
                case 2001:
                    // 登录成功
                    localStorage.setItem('blogToken', dataAxios.data.token);
                    router.push('/back')
                    return true
                case 2002:
                    localStorage.removeItem('blogToken')
                    return false
                case 2003:
                    // 未登录[ 示例 ] 其它和后台约定的 code  token 错误
                    router.push('/login')
                    errorCreate(`[ code: 2003 - 登录过期 ] ${dataAxios.msg}: ${response.config.url}`)
                    break
                case 2004:
                    // 文章 没有
                    router.push('/404')
                    // errorCreate(`[ code: 2004 - 文章错误 ] ${dataAxios.msg}: ${response.config.url}`)
                    break
                default:
                    // 不是正确的 code
                    errorCreate(`${dataAxios.content}: ${response.config.url}`)
                    break
            }
        }
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误';
                    break
                case 401:
                    error.message = '未授权，请登录';
                    break
                case 403:
                    error.message = '拒绝访问';
                    break
                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`;
                    break
                case 408:
                    error.message = '请求超时';
                    break
                case 500:
                    error.message = '服务器内部错误';
                    break
                case 501:
                    error.message = '服务未实现';
                    break
                case 502:
                    error.message = '网关错误';
                    break
                case 503:
                    error.message = '服务不可用';
                    break
                case 504:
                    error.message = '网关超时';
                    break
                case 505:
                    error.message = 'HTTP版本不受支持';
                    break
                default:
                    break
            }
        }
        errorLog(error)
        return Promise.reject(error)
    }
)



export default axios