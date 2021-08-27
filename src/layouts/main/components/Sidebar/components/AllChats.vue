<template>
  <div class="all-dialogs">
    <div v-for="(dialog, index) in all_dialogs" :key="index">
      <chatItem :chatoptions="dialog" />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import chatItem from "./chatItem.vue";
export default {
  components: {
    chatItem
  },
  setup() {
    const store = useStore();
    const all_dialogs = computed(() => store.getters.GET_ALL);
    return {
      all_dialogs //chatItemsLength
    };
  }
};
</script>

<style lang="scss" scoped>
.all-dialogs {
  height: calc(100vh - 8rem);
  overflow-y: auto;
}

::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(206, 206, 206);
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(170, 170, 170);
  }
</style>