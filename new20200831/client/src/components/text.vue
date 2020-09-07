<template>
  <div>
    <mavon-editor
      v-model="content"
      ref="md"
      @imgAdd="imgAdd"
      @change="change"
      style="min-height: 600px"
    />
    <div class="btn">
      <el-select v-model="status" placeholder="请选择发布类型">
        <el-option label="发布" :value="1"></el-option>
        <el-option label="存草稿" :value="0"></el-option>
      </el-select>
      <el-button @click="submit">发布</el-button>
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
      status: "1",
      content: "", // 输入的markdown
      html: "" // 及时转的html
    };
  },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      //   console.log(pos);
      //   console.log($file);
      // return;
      var formdata = new FormData();
      formdata.append("image", $file);
      // this.img_file[pos] = $file;
      this.$http.post("upload", formdata).then(res => {
        console.log(res);
        this.$refs.md.$img2Url(pos, res.data.data);
      });
      // this.$http({
      //   url: "upload",
      //   method: "post",
      //   data: formdata
      // }).then(res => {
      //   // let _res = res.data;
      //   // // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      //   // this.$refs.md.$img2Url(pos, _res.url);
      // });
    },
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
    // 提交
    submit() {
      let data = {
        content: this.content,
        html: this.html,
        status:this.status
      };
      this.$http.post("blog", data).then(res=>{
        console.log(res);
      })
      console.log(this.content);
      console.log(this.html);
    }
  },
  mounted() {}
};
</script>

<style scoped>
.btn {
  margin-top: 20px;
}
</style>