<template>
  <el-container style="height: 100vh">
    <el-header style="backgroundColor: black; color:white; height: 4rem">Header</el-header>
    <el-main style="height: calc(100% -4rem); border: 1px solid red" class="main">
      <Message />
      <Message />
    </el-main>
  </el-container>
</template>

<script>
import Message from './Message'
export default {
  components:{
    Message
  }
};
</script>

<style lang="scss">
.main{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: rgb(170, 165, 163) !important;
}

</style>
