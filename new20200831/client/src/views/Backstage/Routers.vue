<template>
  <div class="pagerouter" v-loading.fullscreen.lock="fullscreenLoading">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>页面设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="3">
          <el-input v-model="addRouter.routerName" placeholder="请输入名字"></el-input>
        </el-col>
        <el-col :span="5">
          <el-input v-model="addRouter.routerPath" placeholder="请输入路径"></el-input>
        </el-col>
        <el-col :span="5">
          <el-button @click="add">添加</el-button>
        </el-col>
        <el-col :span="24">
          <el-table :data="dataList" border>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="routerName" label="路由名字" width="200">
              <template slot-scope="props">
                <el-input
                  v-model="props.row.routerName"
                  @change="inputChange(props.row.id,'routerName',props.row.routerName)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="routerPath" label="路由路径" width="250">
              <template slot-scope="props">
                <el-input
                  v-model="props.row.routerPath"
                  @change="inputChange(props.row.id,'routerPath',props.row.routerPath)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="routerPath" label="是否开启" width="250">
              <template slot-scope="props">
                <el-switch
                  :value="props.row.canRouter == 1"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="changeSwitch(props.row.id,props.row.canRouter)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="250">
              <template slot-scope="props">
                <el-button type="danger" size="mini" @click="del(props.row.id)">删除</el-button>
                <el-button type="success" size="mini">
                  <a :href="props.row.routerPath" target="_blank">打开链接</a>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
      fullscreenLoading: false,
      addRouter: {
        routerName: "",
        routerPath: ""
      }
    };
  },
  methods: {
    getRouterList() {
      this.fullscreenLoading = true;
      this.$http
        .get("be/routers")
        .then(res => {
          this.dataList = res;
          this.fullscreenLoading = false;
        })
        .catch(err => {
          this.fullscreenLoading = false;
          console.log(err);
        });
    },
    inputChange(id, key, value) {
      this.fullscreenLoading = true;
      this.$http.put("be/routers", { id, key, value }).then(() => {
        this.fullscreenLoading = false;
        this.getRouterList();
      });
    },
    del(id) {
      this.$confirm("确定要删除这条记录吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.fullscreenLoading = true;
          this.$http.delete(`routers/${id}`).then(res => {
            this.fullscreenLoading = false;
            if (res.data.code == 200) {
              this.getRouterList();
              this.$message({
                type: "success",
                message: res.data.msg
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    add() {
      if (this.addRouter.routerName == "" || this.addRouter.routerPath == "") {
        this.$message.error("不能为空！！");
      } else {
        this.fullscreenLoading = true;
        this.$http
          .post("be/routers", this.addRouter)
          .then(res => {
            console.log(res);
            this.fullscreenLoading = false;
            this.$message.success("添加成功");
            this.getRouterList();
          })
          .catch(err => {
            this.fullscreenLoading = false;
            console.log(err);
          });
      }
    },
    changeSwitch(id, v) {
      let status = v == 0 ? 1 : 0;
      this.fullscreenLoading = true;
      this.$http
        .put("be/routers", { id, key: "canRouter", value: status })
        .then(res => {
          console.log(res);
          this.fullscreenLoading = false;
          this.getRouterList();
        })
        .catch(err => {
          this.fullscreenLoading = false;
          console.log(err);
        });
    }
  },
  created() {
    this.getRouterList();
  }
};
</script>

<style scoped>
.el-card {
  margin-top: 20px;
}
</style>