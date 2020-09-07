<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <div class="title">
      <el-form :inline="true" :model="addBlog" :rules="rules" ref="formRef">
        <el-form-item prop="title">
          <el-input v-model="addBlog.title"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <mavon-editor
      v-model="addBlog.content"
      ref="md"
      @imgAdd="imgAdd"
      @change="change"
      style="min-height: 600px"
    />
    <div class="btn">
      <el-select v-model="addBlog.status" placeholder="请选择发布类型">
        <el-option label="发布" value="1"></el-option>
        <el-option label="存草稿" value="0"></el-option>
      </el-select>
      <el-button @click="submit">保存</el-button>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";

export default {
  // 注册
  components: {
    mavonEditor
  },
  data() {
    return {
      fullscreenLoading: false,
      addBlog: {
        status: "1",
        content: "",
        html: "",
        title: "",
        id: ""
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", $file);
      // this.img_file[pos] = $file;
      this.$http.post("upload", formdata).then(res => {
        console.log(res);
        this.$refs.md.$img2Url(pos, res.data.data);
      });
    },
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.addBlog.html = render;
    },
    // 提交
    submit() {
      this.$refs["formRef"].validate(valid => {
        if (!valid) return false;

        let data = {
          ...this.addBlog
        };
        this.fullscreenLoading = true;
        this.$http
          .put("be/blog", data)
          .then(res => {
            console.log(res);
            this.$message.success("保存成功");
            this.fullscreenLoading = false;
          })
          .catch(err => {
            console.log(err);
            this.fullscreenLoading = false;
          });
      });
    },
    getDataList() {
      let id = this.$route.query.id;
      if (!id) {
        this.$message.error("参数错误");
        this.$router.push("/be/new-blog");
        return;
      }
      this.$http
        .get("be/blog/" + id)
        .then(res => {
          this.fullscreenLoading = false;
          this.addBlog.html = res.html;
          this.addBlog.content = res.content;
          this.addBlog.id = res.id;
          this.addBlog.title = res.title;
        })
        .catch(err => {
          this.fullscreenLoading = false;
          console.log(err);
        });
    }
  },
  created() {
    this.getDataList();
  },
  mounted() {}
};
</script>

<style scoped>
.btn {
  margin-top: 20px;
}
.title {
  text-align: center;
  padding: 10px 0 10px 0;
}
.title .el-input {
  width: 50%;
  min-width: 650px;
}
</style>