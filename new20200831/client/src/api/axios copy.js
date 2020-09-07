import axios from 'axios'
import {Message} from 'element-ui'
// 创建一个错误
function errorCreate(msg) {
    const error = new Error(msg)
    throw error
}
// 记录和显示错误
function errorLog(error) {

    
    // 显示提示
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    })
}

// axios.defaults.baseURL = "http://127.0.0.1:10110/";
// 创建一个 axios 实例
const service = axios.create({
    baseURL: "http://127.0.0.1:10110/",
    timeout: 5000 // 请求超时时间
})
// 请求拦截器
// service.interceptors.request.use(
//     config => {
//         // 在请求发送之前做一些处理
//         const token = util.cookies.get('token')
//         // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
//         config.headers['token'] = token
//         return config
//     },
//     error => {
//         // 发送失败
//         console.log(error)
//         Promise.reject(error)
//     }
// )

// 响应拦截器
service.interceptors.response.use(
    response => {
        // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response.data
        // 这个状态码是和后端约定的
        const {code} = dataAxios
        // 根据 code 进行判断
        if (code === undefined) {
            // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
            return dataAxios
        } else {
            // 有 code 代表这是一个后端接口 可以进行进一步的判断
          switch (code) {
            case '100000':
              // [ 示例 ] code === 0 代表没有错误
              return dataAxios.data
            case '100001':
              // 未登录[ 示例 ] 其它和后台约定的 code
              errorCreate(`[ code: 100001 - 系统异常 ] ${dataAxios.content}: ${response.config.url}`)
              break
            case '100002':
              // 服务连接失败[ 示例 ] 其它和后台约定的 code
              errorCreate(`[ code: 100002 - 服务连接失败 ] ${dataAxios.content}: ${response.config.url}`)
              break
            case '100003':
              // 缺少字段[ 示例 ] 其它和后台约定的 code
              errorCreate(`[ code: 0004 - 缺少字段 ] ${dataAxios.content}: ${response.config.url}`)
              break
            case '200001':
              // 跳转路由
              router.push({
                name: 'login'
              })
              // 参数错误[ 示例 ] 其它和后台约定的 code
              errorCreate(`[ code: 0003 - 未登录或登陆过时 ] ${dataAxios.content}: ${response.config.url}`, `[ 请重新登陆 ]`)
              break
            case '200000':
              // token不存在[ 示例 ] 其它和后台约定的 code
              errorCreate(`[ code: 0004 - token不存在 ] ${dataAxios.content}: ${response.config.url}`)
              break
            case '200002':
              // 用户名活密码错误[ 示例 ] 其它和后台约定的 code
              errorCreate(`[ code: 0005 - 用户名活密码错误 ] ${dataAxios.content}: ${response.config.url}`)
              break
            case '200003':
              // 权限不足[ 示例 ] 其它和后台约定的 code
              errorCreate(`[ code: 0006 - 权限不足 ] ${dataAxios.content}: ${response.config.url}`)
              break
            case '200004':
              // 角色名称重名[ 示例 ] 其它和后台约定的 code
              errorCreate(`[ code: 0007 - 角色名称重名 ] ${dataAxios.content}: ${response.config.url}`)
              break
            case '200005':
              // 角色编码重名[ 示例 ] 其它和后台约定的 code
              errorCreate(`[ code: 0008 - 角色编码重名 ] ${dataAxios.content}: ${response.config.url}`)
              break
            case '200006':
              // 公司信息不存在[ 示例 ] 其它和后台约定的 code
              errorCreate(`[ code: 0009 - 公司信息不存在 ] ${dataAxios.content}: ${response.config.url}`)
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

export default service