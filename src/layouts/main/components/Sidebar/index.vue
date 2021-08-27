<template>
  <div class="sidebar">
      <div style="height: 3.2rem">
          <Navbar />
      </div>
      <tabs-view />
      <button class="btn btn-contact">Click</button>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import tabsView from './components/tabs-view.vue'
export default {
    components: {
        Navbar,
        tabsView,
    }
}
</script>

<style lang="scss">
    .sidebar {
        position: relative;        
        background-color: white;
        height: 100vh;
        border: 1px solid grey;
        // overflow-y: auto;
    
        .btn-contact{
            right: 76%;
            bottom: 3%;
            position: fixed;
            background-color: $primary-color;
            color: white;
        }
    }
</style>