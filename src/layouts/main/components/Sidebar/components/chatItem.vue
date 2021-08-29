<template>
  <div class="chatItem">
    <div class="user-img" :class="is_user_online ? 'user-img-online': ''">
      <img src="https://picsum.photos/50" alt />
    </div>
    <div class="user-name-message">
      <div class="title-muted">
        <h4 v-if="chatoptions._ === 'user'">{{ chatoptions.first_name }}</h4>
      <h4 v-else>{{!! chatoptions.title ? chatoptions.title.slice(0, 20) + '...' : '' }}</h4>
      <div v-if="!!chatoptions.muted" class="muted">
        <el-icon>
          <MuteNotification />
        </el-icon>
      </div>
      </div>
      <span class="message">
        <span v-if="(chatoptions._ === 'channel' || chatoptions._ === 'chat') && !chatoptions.broadcast">
          {{chatoptions.from}}:
        </span>
        {{
        !!chatoptions.message ? chatoptions.message.slice(0, 30) : ""
        }}
      </span>
    </div>
    <div  class="message-time-status">
      <time>{{ getTime(chatoptions.date) }}</time>

      <!-- read_inbox_max_id:4896
      read_outbox_max_id:4895
      top_message -->
      <span class="status">
        <el-icon  v-if="chatoptions.out && chatoptions.top_message === chatoptions.read_outbox_max_id"
                  :size="14" 
                  :color="chatoptions.status ? 'green' : 'green'" 
                  class="message-red">
          <Select class="read-icon-1"/>
          <Select class="read-icon-2"/>
        </el-icon> 

        <el-icon  v-if="chatoptions.out && chatoptions.top_message !== chatoptions.read_outbox_max_id"
                  :size="14" 
                  :color="chatoptions.status ? 'green' : ''" 
                  class="message-red">
          <Select class="read-icon-1"/>
        </el-icon> 
       
        <div v-if="!chatoptions.out && chatoptions.unread_count > 0" class="unread-message-count">
          {{ chatoptions.unread_count }}
        </div>
      </span>
       <!-- <span v-if="chatoptions._ === 'channel'" class="status">
        <el-icon  v-if="chatoptions.out && chatoptions.read_outbox_max_id === chatoptions.top_message" 
                  :size="14" 
                  :color="chatoptions.status ? 'green' : ''" 
                  class="message-red">
          <Select class="read-icon-1"/>
          <Select class="read-icon-2"/>
        </el-icon> 
        <el-icon  v-if="chatoptions.out && chatoptions.read_outbox_max_id !== chatoptions.top_message" 
                  :size="14" 
                  :color="chatoptions.status ? 'green' : ''" 
                  class="message-red">
          <Select class="read-icon-1"/>
        </el-icon> 
        <div v-else-if="!chatoptions.out && chatoptions.unread_count > 0" class="unread-message-count">
          {{ chatoptions.unread_count }}
        </div>
      </span> -->
    </div>
  </div>
</template>

<script>
import { Select, MuteNotification } from "@element-plus/icons";

export default {
  props: ["chatoptions"],
  components: {
    Select,
    MuteNotification
  },
  data() {
    return {
      is_user_online: true,
    }
  },

  methods: {
    userStatus() {
      // userStatusEmpty#9d05049 = UserStatus;
      // userStatusOnline#edb93949 expires:int = UserStatus;
      // userStatusOffline#8c703f was_online:int = UserStatus;
      // userStatusRecently#e26f42f1 = UserStatus;
      // userStatusLastWeek#7bf09fc = UserStatus;
      // userStatusLastMonth#77ebc742 = UserStatus;
      switch (this.chatoptions.status._) {
        case 'userStatusEmpty':
          this.is_user_online = false
          break;
        case 'userStatusOnline':
          this.is_user_online = true
          break;
        case 'userStatusOffline':
          this.is_user_online = false
          break;
        case 'userStatusRecently':
          this.is_user_online = false
          break;
        case 'userStatusLastWeek':
          this.is_user_online = false
          break; 
        case 'userStatusLastMonth':
          this.is_user_online = false
          break;     
        default:
          break;
      }
    },
    getTime(d) {
      let time = new Date(d * 1000);
      let hours =
        (time.getHours() + "").length > 1
          ? time.getHours()
          : "0" + time.getHours();
      let minutes =
        (time.getMinutes() + "").length > 1
          ? time.getMinutes()
          : "0" + time.getMinutes();
      return `${hours}:${minutes}`;
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap");
.chatItem {
  display: flex;
  padding: 0.2em 0.5em;
  border-bottom: 1px solid #f5f5f5;

  &:hover {
    background: rgb(241, 241, 241);
    cursor: pointer;
  }

  .user-img {
    position: relative;
    img {
      border-radius: 50%;
    }
  }
  .user-img-online {
    position: relative;
  }

  .user-img-online::after {
      position: absolute;
      content: "";
      width: 17px;
      height: 17px;
      background: green;
      top: 65%;
      left: 65%;
      border: 3px solid white;
      border-radius: 50%;
    }

  .user-name-message {
    .title-muted {
      display: flex;
      align-items: center;

      .muted {
        margin-left: 0.2em;
      }
    }

    flex: 1;
    padding: 0.3em 0.5em;

    h4 {
      font-family: "Open Sans", sans-serif;
      font-weight: 400;
    }

    .message {
      font-family: "Open Sans", sans-serif;
      font-weight: 300;
      font-size: 14px;
    }
  }

  .message-time-status {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.3em;
      font-family: "Open Sans", sans-serif;
      font-size: 14px;


    .message-red { 
      position: relative;
      .read-icon-1, .read-icon-2, {
        position: absolute;
      }
      .read-icon-2 {
        // top: 5%;
        left: 1.5%;
      }
    }
    .unread-message-count {
      background: green;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.5em;
      height: 1.5em;
      color: #fff;
      border-radius: 50%;
    }
  }
}
</style>
