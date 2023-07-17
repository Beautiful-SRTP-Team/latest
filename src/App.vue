<template>
  <v-app>
    <v-main class="body">
      <UserInfo/>
      <ThePet/>
      <BottomLine/>
    </v-main>
  </v-app>
</template>

<script>
  import UserInfo from './components/UserInfo.vue'
  import ThePet from './components/ThePet.vue'
  import BottomLine from './components/BottomLine.vue'

  export default {
    name: 'App',

    components: {
      UserInfo,
      ThePet,
      BottomLine
    }
    
  }
</script>

<style scoped>
  .body{
    background-color: antiquewhite;
  }
</style>
