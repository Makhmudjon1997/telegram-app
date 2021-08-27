<template>
  <el-tabs  stretch type="card" v-model="activeName" style="padding: 9px 0">
    <el-tab-pane style="height: calc(100vh - 8rem); overflow-y: auto;" label="All" name="first">
        <AllChats />
    </el-tab-pane>
    <!-- <el-tab-pane name="second">
        <template #label>
            <span size="small">Personal </span><span class="badge">5</span>
        </template>
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
    </el-tab-pane> -->
  </el-tabs>
</template>

<script>
import {ref} from 'vue'

import AllChats from './AllChats.vue'
// import PersonalChats from './PersonalChats.vue'
// import GroupChats from './GroupChats.vue'
// import Channels from './Channels.vue'
// import Bots from './Bots.vue'

  export default {
      components:{
          AllChats,
        //   PersonalChats,
        //   GroupChats,
        //   Channels,
        //   Bots
      },

      setup(){
          const activeName = ref('first')
          return {activeName}
      },
      
  };
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

    .badge {
        
        border: 1px solid red;
        border-radius: 50%;
        background: green;
        color: white;
        padding: 0.2em 0.4em;
        font-size: 13px;
        font-weight: 800;
        margin-left: .3em;
        
        font-family: 'Roboto', sans-serif;
    }


</style>