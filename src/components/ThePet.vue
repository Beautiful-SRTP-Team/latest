<template>
    <div class="pet">
        <div class="lion">
            <embed src="../../public/学生狮子.svg" type="image/svg+xml"/>
        </div>
        <div class="blackboard">
            <div class="problem">
                {{question}}
            </div>
            <v-btn @click="fetch_question" text="更新题目"/>
        </div>
    </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  const BaseUrl = "	https://mock.apifox.cn/m1/2536058-0-default/quiz/fetch"
  const question = ref<string>("")
  const fetch_question = ()=>{
    fetch(BaseUrl,{method :"POST"})
      .then(function (reps){
        reps.json()
        .then((value:{content:{left:number,right:number,signal:string},quiz_id:string}) =>{
          console.log(value);
          question.value = `${value.content.left}${value.content.signal}${value.content.right}`
        })
      })
  }
  onMounted(fetch_question)
</script>

<style scoped>
    .pet{
    width: 95vw;
    height: 53vh;
    }
    .lion{
        float: left;
        width: 40vw;
    }
    .lion embed{
        margin-top: 0vw;
        margin-left: 13vw;
        height: 50vh;
    }
    .blackboard{
        float: left;
        margin-left: -2vw;
        margin-top: 3vh;
        width: 44vw;
        height: 42.2vh;
        background-image: url("../../public/黑板.svg");
    }
    .blackboard .problem{
        margin-left: 9vw;
        margin-top: 12vh;
        font-size: 11vh;
        color: cornsilk;
    }
</style>
