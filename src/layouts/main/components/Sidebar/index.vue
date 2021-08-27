<template>
  <div class="sidebar">
    <div style="height: 3.2rem">
      <Navbar />
    </div>
    <tabs-view />
    <!-- <button >Click</button> -->
    <el-popover placement="top-end" :width="220" v-model:visible="openPopover">
      <template #reference>
        <el-button class="btn btn-contact" @click="openPO">
            <el-icon :size="15">
                <CloseBold v-if="openPopover" class="read-icon-1"/>
                <Edit v-else class="read-icon-1"/>
            </el-icon>
        </el-button>
      </template>
      <div class="new-group-panel">
        <el-button @click="closePO"> 
            <el-icon :size="30">
                <Bell />
            </el-icon> 
            New Channel
        </el-button>
         <el-button @click="closePO"> 
            <el-icon :size="30">
                <Avatar />
            </el-icon> 
            New Group
        </el-button>
         <el-button @click="closePO"> 
            <el-icon :size="30">
                <Avatar/>
            </el-icon> 
            New Private Chat
        </el-button>
      </div>
    </el-popover>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import tabsView from "./components/tabs-view.vue";
import { Edit, Bell, Avatar, CloseBold} from "@element-plus/icons";

export default {
  components: {
    Navbar,
    tabsView,
    Edit,
    Avatar,
    Bell,
    CloseBold
  },
  data() {
      return { 
          openPopover: false
      }
  },
  methods: {
      openPO() {
          this.openPopover = true
      },
      closePO() {
          this.openPopover = false
      }
  }
};
</script>

<style lang="scss">
.sidebar {
  position: relative;
  background-color: white;
  height: 100vh;
  border: 1px solid grey;
  // overflow-y: auto;

  .btn-contact {
    left: 80%;
    bottom: 2%;
    position: absolute;
    background-color: $primary-color;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

 
}

 .new-group-panel {
      display: flex;
      flex-direction: column;

      .el-button {
          margin: 0 !important;
          border: 1px solid transparent !important;
          .el-icon {
              margin-right: .4em !important;
          }
         span { 
              display: flex !important;
              align-items: center !important;
            //   justify-content: space-around !important;
         }
      }
  }

</style>