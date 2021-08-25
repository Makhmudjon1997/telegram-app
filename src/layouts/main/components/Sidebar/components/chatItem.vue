<template>
  <div class="chatItem">
    <div class="user-img">
      <img src="https://picsum.photos/50" alt="">
    </div>
    <div class="user-name-message">
      <h4>{{chatoptions.name}}</h4>
      <span class="message">{{chatoptions.lastMessage}}</span>
    </div>
    <div class="message-time-status">
      <time>{{chatoptions.time}}</time>
      <span class="status">
        <el-icon :size="24" :color="chatoptions.status ? 'green' : ''">
          <SuccessFilled />
        </el-icon>
      </span>
    </div>
  </div>
</template>

<script>
import {SuccessFilled} from '@element-plus/icons'

export default {
  props: ['chatoptions'],
  components:{
    SuccessFilled
  }
}
</script>

<style lang="scss">
  .chatItem{
    display: flex;
    padding: 0.2em;

    .user-img{
      img{
        border-radius: 50%;
      }
    }
    
    .user-name-message{
      flex: 1;
      background-color: aqua;
      padding: 0.3em 0.5em;
    }

    .message-time-status{
      background-color: bisque;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 0.3em;
    }
  }
</style>