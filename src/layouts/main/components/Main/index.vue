<template>
  <el-container class="container">
    <el-header class="header">
      <Header />
    </el-header>
    <div class="main">
      <div class="messages-container" ref="messagesBox" >
        <Message v-for="message in messages" :key="message.access_hash" :message="message" />
      </div>
      <div class="message-input">
        <Textarea @scrolToBottom="messagesBox.scrollTop = messagesBox.scrollHeight;"/>
      </div>
    </div>
  </el-container>
</template>

<script>
import Header from "./Header";
import Message from "./Message";
import Textarea from "./Textarea";
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
// import api from "@/utils/mtproto3";
export default {
  components: {
    Header,
    Message,
    Textarea
  },
  setup() {
    const store = useStore();
    const messages = computed(() => store.state.messages);
    const messagesBox  = ref(null)  
    onMounted(async () => {
      setTimeout(() => {
        messagesBox.value.scrollTop = messagesBox.value.scrollHeight;
        console.log('aaaa', messagesBox.value.scrollHeight)
      }, 1000)
      await store.dispatch("GET_USER");
      await store.dispatch("GET_DAILOGS");
      await store.dispatch("GET_DIALOG_FILTERS");
    });

    return {
      messages,
      messagesBox
    };
  }
};
</script>

<style lang="scss">
.container {
  height: 100vh;
}

.header {
  background-color: white;
  color: black;
  height: 4rem;
}

.main {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 1em;

  background: rgb(11, 121, 122);
  background: -moz-linear-gradient(
    0deg,
    rgba(11, 121, 122, 1) 0%,
    rgba(40, 53, 159, 0.15730042016806722) 100%
  );
  background: -webkit-linear-gradient(
    0deg,
    rgba(11, 121, 122, 1) 0%,
    rgba(40, 53, 159, 0.15730042016806722) 100%
  );
  background: linear-gradient(
    0deg,
    rgba(11, 121, 122, 1) 0%,
    rgba(40, 53, 159, 0.15730042016806722) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0b797a",endColorstr="#28359f",GradientType=1);

  height: calc(100% - 4rem);
}

.message-input {
  width: 60%;
}

.messages-container {
  width: 55%;
  max-height: calc(100vh - 4rem);
  overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: rgb(206, 206, 206);
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(170, 170, 170);
}
</style>
