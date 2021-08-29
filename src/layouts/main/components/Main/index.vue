<template>
  <el-container class="container">
    <el-header class="header">
      <Header />
    </el-header>
    <el-main class="main">
      <Message />
      <Message />
      <Textarea />
    </el-main>
  </el-container>
</template>

<script>
import Header from "./Header";
import Message from "./Message";
import Textarea from "./Textarea";
import { onMounted } from "vue";
import { useStore } from "vuex";
import api from "@/utils/mtproto3";
export default {
  components: {
    Header,
    Message,
    Textarea
  },
  setup() {
    const store = useStore();

    onMounted(async () => {
      await store.dispatch("GET_USER");
      await store.dispatch("GET_DAILOGS");
      await store.dispatch("GET_DIALOG_FILTERS")
      
      // (async () => {
        const resolvedPeer = await api.call("contacts.resolveUsername", {
          username: "alisher_khamraev_rustamugli"
          // phone: '+998330990001'
        });

        console.log(resolvedPeer)

        const user = resolvedPeer.users.find(
          user => user.id === resolvedPeer.peer.user_id
        );
        console.log('User', user)
        const inputPeer = {
          _: "inputPeerUser",
          user_id: user.id,
          access_hash: user.access_hash
        };

        const LIMIT_COUNT = 40;
        const allMessages = [];

        // const firstHistoryResult = 
        await api.call("messages.getHistory", {
          peer: inputPeer,
          limit: LIMIT_COUNT
        });

        // const historyCount = firstHistoryResult.count;

        for (let offset = 0; offset < 1; offset += LIMIT_COUNT) {
          const history = await api.call("messages.getHistory", {
            peer: inputPeer,
            add_offset: offset,
            limit: LIMIT_COUNT
          });

          allMessages.push(...history.messages);
        }

        console.log("allMessages:", allMessages);
      // })();
    });
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
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: rgb(170, 165, 163) !important;
  height: calc(100% - 4rem);
}
</style>
