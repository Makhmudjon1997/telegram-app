<template>
  <div class="sidebar">
      <tabs-view />
      <!-- <chatItem /> -->
  </div>
</template>

<script>
// import chatItem from './components/chatItem.vue';
import tabsView from './components/tabs-view.vue'
export default {
    components: {
        tabsView,
        // chatItem
    }
}
</script>

<style lang="scss">
    .sidebar {
        background-color: white;
        height: 100%;
        border: 1px solid red;
    }
</style>