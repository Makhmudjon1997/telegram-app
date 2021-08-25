<template>
  <el-tabs stretch type="card" v-model="activeName" >
    <el-tab-pane label="All" name="first">
        <AllChats />
    </el-tab-pane>
    <el-tab-pane label="Personal" name="second">
        <PersonalChats />
    </el-tab-pane>
    <el-tab-pane label="Groups" name="third">
        <GroupChats />
    </el-tab-pane>
    <el-tab-pane label="Channels" name="fourth">
        <Channels />
    </el-tab-pane>
    <el-tab-pane label="Bots" name="fifth">
        <Bots />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import AllChats from './AllChats.vue'
import PersonalChats from './PersonalChats.vue'
import GroupChats from './GroupChats.vue'
import Channels from './Channels.vue'
import Bots from './Bots.vue'

  export default {
      components:{
          AllChats,
          PersonalChats,
          GroupChats,
          Channels,
          Bots
      },

    data() {
      return {
        activeName: 'first'
      };
    },

    methods: {
      // handleClick(tab, event) {
      //   this.activeName = tab
      //   console.log(tab, event);
      // }
    }
  };
</script>

<style lang="scss">



</style>