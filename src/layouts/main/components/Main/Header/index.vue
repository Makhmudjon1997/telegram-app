<template>
  <div class="header">
    <div class="user-title">
      <!-- <chatItem :chatoptions="chatOptions"/> -->
      <img src="https://picsum.photos/50" alt="img" />
      <div class="user-info">
        <h4>{{ currentUser.first_name}}</h4>
        <p>{{UserStatus}}</p>
      </div>
    </div>
    <div class="icons">
      <el-icon class="searchIcon">
        <search />
      </el-icon>
      <el-icon class="actionsIcon">
        <more-filled />
      </el-icon>
    </div>
  </div>
</template>

<script>
import { Search, MoreFilled } from "@element-plus/icons";
import { computed } from "vue";
import { useStore } from "vuex";
// import chatItem from '@/layouts/main/components/Sidebar/components/chatItem.vue'
export default {
  components: {
    Search,
    MoreFilled
    // chatItem
  },

  setup() {
    //    const chatOptions = ref({
    //         avatar: "",
    //         name: 'Adham',
    //         lastMessage: 'hello from the All chat',
    //         time: '19:00',
    //         status: true
    //     });
    const store = useStore();
    const currentUser = computed(() => store.getters.GET_CURRENT_USER);

    function getDate(d) {
      let now_date = new Date();
      let hours_now = now_date.getHours();
      let date_now = now_date.getDate();
      let month_now = now_date.getMonth();
      let minutes_now = now_date.getMinutes();
      let time = new Date(d * 1000);

      if (time.getMonth() <= month_now && time.getDate() < date_now) {
          console.log(now_date.getTime() - time.getTime() > 86400000)
          console.log(now_date.getTime() -  time.getTime() )
       if( now_date.getTime() - time.getTime() > 86400000) {
            let hours =
          (time.getHours() + "").length > 1
            ? time.getHours()
            : "0" + time.getHours();
        let minutes =
          (time.getMinutes() + "").length > 1
            ? time.getMinutes()
            : "0" + time.getMinutes();
        return `${time.getDate()}.${(time.getMonth() +
          1) > 9 ? (time.getMonth() + 1): '0' + (time.getMonth()+1)} at ${hours}:${minutes}`;
       } else {
        let hours = now_date.getTime() - time.getTime()
        hours =  parseInt(hours / 3600000)
        return  hours  > 1 ? (hours + " hours ago a") : (hours + ' hour ago');
       }
      }

      if (time.getMonth() === month_now && time.getDate() === date_now && time.getHours() < hours_now) {
        let hours = hours_now - time.getHours()
        return  hours  > 1 ? (hours + " hours ago") : (hours + ' hour ago');
      }

      if (hours_now === time.getHours() && minutes_now === time.getMinutes()) {
        return "just now";
      }

      if (hours_now === time.getHours()) {
        return minutes_now - time.getMinutes() + " minutes ago";
      }

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
    const UserStatus = computed(() => {
      // userStatusEmpty#9d05049 = UserStatus;
      // userStatusOnline#edb93949 expires:int = UserStatus;
      // userStatusOffline#8c703f was_online:int = UserStatus;
      // userStatusRecently#e26f42f1 = UserStatus;
      // userStatusLastWeek#7bf09fc = UserStatus;
      // userStatusLastMonth#77ebc742 = UserStatus;

      let text = "";
      if (currentUser.value) {
        switch (currentUser.value.status._) {
          case "userStatusOnline":
            text = "online";
            break;
          case "userStatusEmpty":
            text = "unknown";
            break;
          case "userStatusOffline":
            text = "last seen " + getDate(currentUser.value.status.was_online);
            break;
          case "userStatusRecently":
            text = "last seen recently";
            break;
          case "userStatusLastWeek":
            text = "last seen a week ago";
            break;
          case "userStatusLastMonth":
            text = "last seen a month ago";
            break;
          default:
            text = "";
            break;
        }
      }

      return text;
    });

    return { currentUser, UserStatus };
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;

  .user-title {
    display: flex;
    align-items: center;

    img {
      border-radius: 50%;
    }

    .user-info {
      padding-left: 0.5rem;
    }
  }
  .icons {
    display: flex;
    flex-direction: column;
    width: 2%;

    .actionsIcon {
      margin-top: 10px;
    }
  }
}
</style>