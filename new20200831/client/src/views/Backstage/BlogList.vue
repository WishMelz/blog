<template>
  <!-- 文章list -->
  <div style="height:100%;position: relative;">
    <el-row>
      <el-col :span="24" style="margin-bottom:10px">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>文章列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="24">
        <el-form :inline="true" size="mini">
          <el-form-item label="内容">
            <el-input v-model="search"></el-input>
          </el-form-item>
          <el-form-item label="搜索区域">
            <el-select v-model="status">
              <el-option label="标题" value="title"></el-option>
              <el-option label="html内容" value="html"></el-option>
              <el-option label="结构内容" value="content"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容">
            <el-button @click="getDataList">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="ctime" label="时间">
        <template slot-scope="scop">{{ scop.row.ctime | getTime }}</template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scop">{{scop.row.status == 1 ? '已发布' : '草稿' }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scop">
          <el-button size="mini" @click="edit(scop.row.id)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="page.pageSize"
      :page-sizes="[10, 20, 50, 100]"
      layout="sizes,total, prev, pager, next"
      :total="page.total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
      page: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      status: "title",
      search: ""
    };
  },
  methods: {
    getDataList() {
      let params = {
        search: this.search,
        status: this.status
      };
      this.$http
        .get(`be/blog/${this.page.pageNum}/${this.page.pageSize}`, { params })
        .then(res => {
          this.dataList = res.data;
          this.page.total = res.total
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(v) {
      this.page.pageSize = v;
      this.getDataList();
    },
    handleCurrentChange(v) {
      this.page.pageNum = v;
      this.getDataList();
    },
    edit(id) {
      this.$router.push("/be/edit-blog?id=" + id);
    }
  },
  created() {
    this.getDataList();
  }
};
</script>

<style scoped>
.conhtml {
  max-height: 40px;
}
.pagination {
  position: absolute;
  bottom: 10px;
}
</style>