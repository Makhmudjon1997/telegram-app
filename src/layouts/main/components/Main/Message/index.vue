<template>
  <div class="message-wrap" :class=" message.out ? 'message-wrap-out': ''">
    <div class="message" :class=" message.out ? 'message-out': ''">
      <!-- <img src="https://picsum.photos/50" alt /> -->
      <div class="text-box" :class=" message.out ? 'text-box-out': ''">
        <!-- <h4 class="user-name">{{ }}</h4> -->
        <div class="text-and-time">
          <p class="text">{{ message.message }}</p>
          <time>{{getTime(message.date)}}</time>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["message"],
  computed: {
  },
  methods: {
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

<style lang="scss" scoped>
.message-wrap {
  display: flex;
  justify-content: flex-start;
}

.message-wrap-out {
  display: flex;
  justify-content: flex-end;
}

.message {
  width: 80%;
  display: flex;
  align-items: flex-end;
  margin: 0.5em 0;

  img {
    border-radius: 50%;
  }

  .text-box {
    margin-left: 0.5em;
    margin-right: 0.5em;
    padding: 0.3em 0.5em;
    background-color: white;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-left-radius: 10px;

    .text-and-time {
      display: flex;
      justify-content: space-between;

      time {
        // background-color: white;
        display: flex;
        font-size: 11px;
        align-self: flex-end;
        color: green;
        margin-left: .3em;
      }
    }
  }

  .text-box-out {
      background-color: rgb(212, 255, 244);
  }
}

.message-out {
  flex-direction: row-reverse;
  .text-box {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
  }
}
</style>