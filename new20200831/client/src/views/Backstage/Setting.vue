<template>
  <div class="seting">
    <el-card>
      <el-form :inline="true">
        <el-form-item label="站点标题：">
          <el-input @change="flg = false" v-model="dataList.title"></el-input>
        </el-form-item>
        <el-form-item label="站点副标题：">
          <el-input @change="flg = false" v-model="dataList.subtitle"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="flg" @click="sub">更新</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col>页脚设置：</el-col>
        <el-col :span="12">
          <el-input type="textarea" autosize v-model="dataList.footer"></el-input>
          <el-button @click="sub">更新</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: {},
      flg: true
    };
  },
  methods: {
    sub() {
      this.$http
        .put("be/seting", this.dataList)
        .then(res => {
          console.log(res);
          this.$message.success("修改成功");
          this.getDataList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    subFooter() {
      this.$http
        .put("be/seting/footer", {footer:this.dataList.footer})
        .then(res => {
          console.log(res);
          this.$message.success("修改成功");
          this.getDataList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataList() {
      this.$http
        .get("be/seting")
        .then(res => {
          this.dataList = res;
        })
        .catch(err => {
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
.seting {
  height: 100%;
}
.el-card {
  height: 100%;
}
</style>