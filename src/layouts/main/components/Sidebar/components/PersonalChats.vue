<template>
  <div>
    <div v-for="item in chatOptionsList" :key="item.name">
      <chatItem :chatoptions="chatOptions" />
      
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import chatItem from "./chatItem.vue";
export default {
  components: {
    chatItem,
  },

  setup() {
    const chatOptions = ref({
      avatar: "",
      name: "Elbek",
      lastMessage: "Personal hello from the personal chat",
      time: "19:00",
      status: false,
    });

    const chatOptionsList = ref([
      chatOptions,
      chatOptions,
      chatOptions,
      chatOptions,
    ]);
    
    const chatItemsLength = chatOptionsList.value.length;
    // console.log(chatItemsLength);

    return {
      chatOptions,
      chatOptionsList,
      chatItemsLength
    };
  },
};
</script>

<style lang="scss" scoped></style>
