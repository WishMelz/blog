<template>
  <div class="backIndex">
      <!-- <h1>后台管理系统</h1> -->
      <div class="time" v-if="times != ''">
          {{times | getTime}}
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            times:'',
            setTimes:null
        }
    },
    created(){
        this.setTimes = setInterval(()=>{
            this.times = Date.now();
        },1000)
    },
    beforeDestroy(){
        clearInterval(this.setTimes)
    }
}
</script>

<style scoped>
    h1 {
        text-align: center;
        padding-top: 30px;
        font-size: 2em;
    }
    .time {
        font-size: 10em;
        text-align: center;
        letter-spacing:2px;
    }
 
                     
    .backIndex {
        display: flex;
        align-items: center;
        height: 100%;
    }
</style>