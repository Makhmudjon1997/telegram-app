<template>
  <div class="textarea-box">
    <el-input
      type="textarea"
      autosize
      :disabled="sending"
      placeholder="Message"
      v-model="textarea1"
      prefix-icon="el-icon-search"
      suffix-icon="el-icon-search"
      @input="userTyping()"
      @keydown.enter.prevent="sendMessage"
    ></el-input>
    <button @click="sendMessage()" class="btn">Send</button>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  setup(_, { emit }) {
    const textarea1 = ref("");
    const sending = ref(false)
    const store = useStore();
    const user = computed(() => store.state.user);

    async function sendMessage(e) {
      console.log(e);
      if (e.key !== "Enter") {
        textarea1.value = e.target.value;
      }
      {
        emit("scrolToBottom");
        sending.value = true
        let message = textarea1.value;
        await store.dispatch("SEND_MESSAGE", {
          clear_draft: true,
          peer: {
            _: "inputPeerUser",
            user_id: user.value.id,
            access_hash: user.value.access_hash
          },
          message: message,
          random_id:
            Math.ceil(Math.random() * 0xffffff) +
            Math.ceil(Math.random() * 0xffffff)
        });
        sending.value = false
        textarea1.value = "";
      }
    }

    function userTyping() {
      store.dispatch("TYPING_MESSAGE");
    }

    return {
      textarea1,
      sendMessage,
      user,
      sending,
      userTyping
    };
  }
};
</script>

<style lang="scss">
.textarea-box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-textarea__inner {
  // width: 100%;
  margin: 0 auto;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  resize: none;
}
.btn {
  background: white;
  border-radius: 50%;
  color: black;
  border: none;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
</style>
