<template>
  <div class="home">
    <div class="header" id="showstar">
      <div class="inners">
        <div class="title">
          <div class="inner">
            <h1>WishMeLzzz</h1>
            <h2>生活其实很有趣</h2>
          </div>
        </div>
      </div>
      <div class="nav">
        <ul>
          <li v-for="(v,i) in routers" :key="i">
            <a :href="v.routerPath">{{ v.routerName }}</a>
          </li>
       
        </ul>
      </div>
    </div>
    <router-view />
    <footer>
              浙ICP备14545548号
    </footer>
  </div>
</template>

<script>
export default {
  data(){
    return {
      routers:[]
    }
  },
  methods:{
    getDataList(){
      this.$http.get('web/routers').then(res=>{
        console.log(res);
        this.routers = res;
      })
    }
  },
  created(){
    this.getDataList()
  }

};
</script>

<style scoped>


.header .title {
  background: url(https://img.xjh.me/random_img.php?type=bg&ctype=nature&return=302)
    center center / cover no-repeat rgb(34, 34, 34);
  overflow: hidden;
  width: 100%;
  /* height: 40vh; */
  max-height: 40vh;
  box-shadow: 0 1px 2px rgba(150, 150, 150, 0.7);
  text-align: center;
  display: table;
}

.header .inner {
  display: table-cell;
  vertical-align: middle;
  width: 100%;
  position: relative;
  z-index: 2;
  padding: 60px 0;
  background: rgb(0 0 0 / 20%);
}


.header h1 {
  font-family: "Playball", cursive;
  color: #fff;
  font-size: 3rem;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  margin: 10px 0 10px 0;
  letter-spacing: -1px;
  font-weight: 700;
  animation: fade-in-down 1s both;
  animation-delay: 0.5s;
}

.header h2 {
  margin: 0;
  font-size: 1.3rem;
  line-height: 1.5em;
  font-weight: 400;
  letter-spacing: 0.01rem;
  color: rgba(255, 255, 255, 0.8);
  -webkit-animation: fade-in-down 0.9s;
  animation: fade-in-down 0.9s both;
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.3s;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
  overflow: hidden;
  font-family: "Playball", cursive;
}

.header .nav {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
    background: hsla(0,0%,100%,.6);
    z-index: 1;
}

.header .nav ul {
  text-align: center;
}

.header .nav li {
  font-family: "Josefin Sans Light", -apple-system, BlinkMacSystemFont,
    "Helvetica Neue", "PingFang SC", "'Hiragino Sans GB", STHeiti,
    "Microsoft Yahei", "Source Han Sans SC", "Noto Sans CJK SC",
    "WenQuanYi Micro Hei", Arial, Verdana, sans-serif;
  color: #95a5a6;
  display: inline-block;
  padding: 1rem;
  font-size: 1rem;
  text-align: center;
}

.header .nav a {
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}

.header .nav li a:link {
  color: #2daebf;
  text-decoration: none;
}



.header .inners h2 {
  color: #e6e6e6;
}

/* .header h2 {
  position: relative;
  margin-top: -20px;
  display: inline-block;
  letter-spacing: 4px;
  color: #797979;
  font-size: 2em;
  margin-bottom: 20px;
} */


footer {
  margin-top: 30px;
  width: 100%;
  text-align: center;
  padding: 50px 0;
}


</style>