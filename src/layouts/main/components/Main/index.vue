<template>
  <el-container style="height: 100vh">
    <el-header style="backgroundColor: white; color:black; height: 4rem">
      <Header />
    </el-header>
    <el-main style="height: calc(100% - 4rem)" class="main">
      <Message />
      <Message />
      <Textarea/>
    </el-main>
  </el-container>
</template>

<script>
import Header from './Header'
import Message from './Message'
import Textarea from './Textarea'
export default {
  components:{
    Header,
    Message,
    Textarea
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
