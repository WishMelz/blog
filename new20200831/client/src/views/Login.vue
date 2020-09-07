<template>
  <div class="login">
    <div class="info">
      <el-form
        :model="login"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="name">
          <el-input v-model="login.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="login.password" type='password' placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="loginBtn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: { username: "admin", password: "admin" },
      rules: {
        username: { required: true, message: "请输入用户名", trigger: "blur" },
        password: { required: true, message: "请输入密码", trigger: "blur" },
      }
    };
  },
  methods: {
    loginBtn() {
      this.$http.post('be/login',{...this.login}).then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
    }
  }
};
</script>

<style scoped>
.login {
  height: 100%;
  position: relative;
  /* background-image: url(https://img.xjh.me/random_img.php?type=bg&ctype=nature&return=302); */
  background: url(https://img.xjh.me/random_img.php?type=bg&ctype=nature&return=302)
    no-repeat center center;
  background-size: cover;
}
.info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  /* height: 500px; */
  width: 500px;
  background: #cccccc36;
  border-radius: 5px;
  text-align: center;
  padding: 30px 90px 20px 0px;
}
</style>