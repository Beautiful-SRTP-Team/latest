<template>
    <div class="info">
        <div class="title">
            <div class="head">
                <img src="../../public/cleverik.jpg" alt="ik">
            </div>
            <div class="level">
                {{level}}
            </div>
        </div>
        <div class="name">
            <div class="username">{{name}}</div>
            <div class="exp">{{EXP}}</div>
        </div>
    </div>
    <v-btn @click="fetch_data()" text="更新信息"/>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  const BaseUrl = "https://mock.apifox.cn/m1/2536058-0-default/get-user-info"
  const level = ref<string>("")
  const name = ref<string>("")
  const EXP = ref<string>("")
  const fetch_data = ()=>{
    fetch(BaseUrl,{method :"GET"})
      .then(function (reps){
        reps.json()
        .then((value) =>{
          console.log(value);
          level.value = `Lv. ${value.level}`
          name.value = value.name
          EXP.value = `EXP: ${value.exp}`
        })
      })
  }
  onMounted(fetch_data)
</script>

<style scoped>
    .info{
    margin-left: 1vw;
    margin-top: 2vh;
    height: 20vh;
    }
    .title{
        float: left;
        width: 15vh;
    }
    .head{
        height: 15vh;
        width: 15vh;
    }
    .head img{
        height: 15vh;
        border-radius: 50%;
    }
    .level{
        text-align: center;
        font-weight: 900;
        font-size: 3vh;
        line-height: 5vh;
    }
    .name{
        float:left;
        font-size: 2.5vh;
        font-family: 黑体;
        font-weight: 900;
        margin-top: 3vh;
        margin-left: 1.5vw;
    }
    .exp{
        margin-top: 2vh;
    }
</style>
