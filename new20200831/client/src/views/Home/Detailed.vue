<template>
  <div class="detailed" v-loading="fullscreenLoading">
    <div class="post" id="post" v-if="!fullscreenLoading">
      <div class="postTitle">{{blogData.title}}</div>
      <div class="postTime">@ {{blogData.ctime | getTime}}</div>
      <div class="postCont markdown-body" v-html="blogData.html"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullscreenLoading: false,
      blogData: {}
    };
  },
  methods: {
    getDataList() {
      let id = this.$route.query.p;
      if (!id) {
        this.$route.push("/404");
        return;
      }
      this.fullscreenLoading = true;
      this.$http
        .get("web/blog/" + id)
        .then(res => {
          this.fullscreenLoading = false;
          this.blogData = res;
          document.title = document.title + ' | ' + res.title
        })
        .catch(err => {
          this.fullscreenLoading = false;
          console.log(err);
        });
    }
  },
  created() {
    this.getDataList();
  }
};
</script>

<style scoped>
.detailed {
  width: 51%;
  margin: 0 auto;
  padding-top: 20px;
  min-height: 450px;
}

.post {
  width: 100%;
}

.post div {
  width: 100%;
  box-sizing: border-box;
}

.postTitle {
  text-align: center;
  padding: 10px;
  font-weight: bold;
  font-size: 2rem;
  font-weight: 400;
  color: #606975;
  text-shadow: 5px 2px 9px rgba(0, 0, 0, 0.3);
}

.postTime {
  font-family: "Noto Sans SC";
  text-align: right;
  text-shadow: 0px -1px 2px rgba(0, 0, 0, 0.3);
  border-bottom: 1px dashed #9eabb3;
  padding: 30px 10px 0 0;
}

.postCont {
  padding-top: 20px;
}
</style>