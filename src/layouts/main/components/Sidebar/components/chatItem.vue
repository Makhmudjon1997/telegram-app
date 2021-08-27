<template>
  <div class="chatItem">
    <div class="user-img">
      <img src="https://picsum.photos/50" alt="">
    </div>
    <div class="user-name-message">
      <h4  v-if="chatoptions._ === 'user'">{{chatoptions.first_name}}</h4>
      <h4  v-else>{{chatoptions.title}}</h4>
      <span class="message">{{!!chatoptions.message ? chatoptions.message.slice(0, 30)  + '...': ''}}</span>
    </div>
    <div class="message-time-status">
      <time>{{getTime(chatoptions.date)}}</time>
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
  },
  methods: {
    getTime(d) {
      let time = new Date(d*1000)
      let hours = (time.getHours() + '').length > 1 ? time.getHours(): '0'+time.getHours()
      let minutes = (time.getMinutes() + '').length > 1 ? time.getMinutes(): '0'+time.getMinutes()
      return `${hours}:${minutes}`
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap');
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

      h4 {
        font-family: 'Open Sans', sans-serif;
        font-weight: 400;
      }

      .message {
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        font-size: 14px;
      }
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