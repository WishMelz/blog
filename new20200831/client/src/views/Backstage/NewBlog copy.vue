<template>
  <div>
        <div id="editorId"></div>
  </div>
</template>

<script>
import wangEditor from 'wangeditor';
export default {
  data() {
    return {
      editorId: "editorId",
      editor: null
    };
  },
  methods: {
    
    // 为了防止组件在同一个页面多次被调用，需要生成一个随机的不重复id,可以通过时间和随机数生成
    randomId() {
      let baseId = "wang_editor";
      let now = Date.now();
      let num = Math.random().toFixed(4) * 10000;
      return `${baseId}_${now}_${num}`;
    },
    //初始化编辑器
    initEditor() {
      let _this = this;
      _this.editorId = _this.randomId(); //生成一个id
      this.$nextTick(() => {
        //获取实例,wangEditor是被注册在window的
        // 如果不明白，可以let wangEditor = window.wangEditor
        let editor = new wangEditor("#editorId");
        _this.editor = editor; //将实例保存待调用其他api
        editor.create(); //开始创建编辑器；
      });
    }
  },
  created(){
      this.initEditor()
  }
};
</script>

<style>
</style>