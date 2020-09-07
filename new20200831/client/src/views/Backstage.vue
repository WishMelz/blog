<template>
  <div class="back">
    <el-container>
      <el-header>
        <div>API</div>
      </el-header>
      <el-container>
        <el-aside width="200px" id="ment-list">
          <el-menu
            router
            background-color="#4b5159"
            text-color="#FFF"
            default-active="/"
            unique-opened
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-notebook-2"></i>
                <span>文章</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/be/new-blog">写文章</el-menu-item>
                <el-menu-item index="/be/blog-list">文章列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-collection-tag"></i>
                <span>页面设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/be/routers">导航设置</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-collection-tag"></i>
                <span>舔狗日记</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="tg">日记</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- <el-menu-item index="music">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">博客音乐</span>
            </el-menu-item>
            <el-menu-item index="musiclist">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">音乐列表</span>
            </el-menu-item>-->
            <!-- <el-menu-item index="fileslist">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">历史文件</span>
            </el-menu-item>-->
          </el-menu>
        </el-aside>
        <el-main style="padding:10px">
          <router-view />
        </el-main>
      </el-container>
      <el-footer class="footer">
        <p>Everything will be ok.</p>
      </el-footer>
    </el-container>
  </div>
  <!-- <router-view /> -->
</template>

<script>
export default {};
</script>

<style scoped>
.back {
  height: 100%;
}
.el-container,
.el-container {
  height: 100%;
}
.el-header {
  color: #fff;
  text-align: center;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-header div {
  padding: 10px 0;
}
#ment-list,
.el-header {
  background: #4b5159;
}
/* .el-main {
  padding: 10px;
} */
.el-aside ul {
  border: none;
}
.footer {
  text-align: center;
  background: #4b5159;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>