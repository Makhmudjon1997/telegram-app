<template>
  <div class="chatItem">
    <div class="user-img">
      <img src="https://picsum.photos/50" alt="">
    </div>
    <div class="user-name-message">
      <h4>{{chatoptions.first_name}}</h4>
      <span class="message">{{!!chatoptions.message ? chatoptions.message.slice(0, 20) : ''}}...</span>
    </div>
    <!-- <div class="message-time-status">
      <time>{{chatoptions.time}}</time>
      <span class="status">
        <el-icon :size="24" :color="chatoptions.status ? 'green' : ''">
          <SuccessFilled />
        </el-icon>
      </span>
    </div> -->
  </div>
</template>

<script>
// import {SuccessFilled} from '@element-plus/icons'

export default {
  props: ['chatoptions'],
  components:{
    // SuccessFilled
  }
}
</script>

<style lang="scss">
  .chatItem{
    display: flex;
    padding: 0.2em 0.5em;

    &:hover{
      background: rgb(241, 241, 241);
      cursor: pointer;
    }

    .user-img{
      img{
        border-radius: 50%;
      }
    }
    
    .user-name-message{
      flex: 1;
      padding: 0.3em 0.5em;
    }

    .message-time-status{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 0.3em;
    }
  }
</style>