<template>
  <div class="main">
    <div class="poem-map" v-loading="loading">
      <div class="poem-border poem-left"></div>
      <div class="poem-border poem-right"></div>
      <h2>来两句诗</h2>
      <div id="peom_sentence" v-text="poem.content">宿空房，秋夜长，夜长无寐天不明。</div>
      <div id="poem_info">
        【
        <span v-text="poem.dynasty">唐代</span>】
        <span v-text="poem.author">白居易</span>
        《
        <span v-text="poem.title">上阳白发人</span>》
      </div>
    </div>
    <div class="area">
      <div class="item clearfix" v-for="(v,i) in dataList" :key="i">
        <div class="item-title">
          <router-link :to="'/detailed?p='+v.id" target="_blank">
            <a>{{v.title}}</a>
          </router-link>
          <div class="item-ctime">@ {{v.ctime | getTime}}</div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="page.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      poem: {
        content: "",
        author: "",
        dynasty: "",
        title: ""
      },
      dataList: [],
      page: {
        pageNum: "1",
        pageSize: 10,
        total: 0
      }
    };
  },
  methods: {
    getDataList() {
      this.$http
        .get("web/blog/1/10")
        .then(res => {
          this.dataList = res.data;
          this.page.total = res.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCurrentChange(v) {
      console.log(v);
    }
  },
  created() {
    this.getDataList();
    this.loading = true;
    this.$http
      .get("/web/atps")
      .then(res => {
        this.loading = false;
        this.poem.content = res.data.content;
        this.poem.author = res.data.origin.author;
        this.poem.dynasty = res.data.origin.dynasty;
        this.poem.title = res.data.origin.title;
      })
      .catch(err => {
        this.loading = false;
        console.log(err);
      });
  }
};
</script>

<style scoped>
.pagination {
  text-align: right;
  max-width: 830px;
  margin: 3px auto;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
}
.main {
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 80px;
}

.main .area {
  margin: 0 auto;
}

.main .item {
  min-height: 10px;
  position: relative;
  max-width: 830px;
  margin: 3.5rem auto;
  padding-bottom: 3.5rem;
  border-bottom: #ebf2f6 1px solid;
  word-wrap: break-word;
  margin-top: 0;
  margin-bottom: 26px;
  padding-bottom: 0;
}

.main .item-title {
  font-size: 20px;
  padding: 0 10px;
  float: right;
  width: 100%;
  clear: both;
  border-bottom: 1px dashed #9eabb3;
  box-sizing: border-box;
  background-size: 35px 35px;
}

.main .item-title a {
  display: inline-block;
  font-size: 1.6rem;
  line-height: 3rem;
  font-weight: bold;
  letter-spacing: -1px;
  font-family: "Open Sans", "Microsoft Jhenghei", "Microsoft Yahei", sans-serif;
  color: #7396a7;
  transition: color 0.3s ease;
}

.main .item-ctime {
  /* padding: 0 10px; */
  float: left;
  width: 100%;
  clear: both;
  text-align: left;
  padding-right: 5px;
  margin: 0;
  font-family: "Open Sans", sans-serif;
  font-size: 0.8rem;
  line-height: 1rem;
  color: #9eabb3;
  padding-bottom: 5px;
}
#peom_sentence {
  font-size: 25px;
}

#poem_info {
  font-size: 15px;
  margin: 15px auto;
}
.poem-map {
  position: relative;
  width: 730px;
  max-width: 80%;
  border: 2px solid #797979;
  border-top: none;
  text-align: center;
  margin: 40px auto;
}

.poem-border {
  position: absolute;
  height: 2px;
  width: 27%;
  background-color: #797979;
}

.poem-left {
  left: 0;
}

.poem-right {
  right: 0;
}
.poem-map h2 {
  position: relative;
  top: -20px;
  display: inline-block;
  letter-spacing: 4px;
  color: #797979;
  font-size: 1.6em;
  margin-bottom: 20px;
  margin: 0;
  line-height: 1.5em;
  font-weight: 400;
  -webkit-animation: fade-in-down 0.9s;
  animation: fade-in-down 0.9s both;
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.3s;
  text-shadow: 0 3px 6px rgb(0 0 0 / 2%);
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
  overflow: hidden;
  font-family: "Playball", cursive;
}

footer {
  margin-top: 30px;
  width: 100%;
  text-align: center;
  padding: 50px 0;
}
</style>