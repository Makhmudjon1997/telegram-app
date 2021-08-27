<template>
  <el-container class="container">
    <el-header class="header">
      <Header /> 
    </el-header>
    <el-main class="main">
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
.container{
  height: 100vh
}

.header{
  background-color: white; 
  color:black; 
  height: 4rem
}

.main{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: rgb(170, 165, 163) !important;
  height: calc(100% - 4rem)
}

</style>
