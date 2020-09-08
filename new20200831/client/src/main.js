import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "mavon-editor/dist/css/index.css";
Vue.use(ElementUI);

// axios.defaults.baseURL = "http://127.0.0.1:10110/";
import axios from '@/api/axios'
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.filter('getTime', function (v) {
  if (v == null) {
    return ''
  } else {
    let newDate = new Date(+v);
    let strData = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds() > 10 ? newDate.getSeconds() : '0' + newDate.getSeconds()}`
    return strData
  }
})
router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  if(to.path == '/' || to.path == '/detailed' || to.path == '/login'){
    next()
  }else {
    let token = localStorage.getItem('blogToken');
    if(token){
      next()
    }else {
      next('/login')
    }
  }
  next()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
