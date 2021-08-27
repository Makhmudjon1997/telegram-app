<template>
    <div class="header">
        <div class="user-title">
            <!-- <chatItem :chatoptions="chatOptions"/> -->
            <img src="https://picsum.photos/50" alt="img">
            <div class="user-info">
                <h4>Name</h4>
                <p>Status</p>
            </div>
        </div>
        <div class="icons">
            <el-icon class="searchIcon">
                <search />
            </el-icon>
            <el-icon class="actionsIcon"> 
                <more-filled />
            </el-icon>
        </div>
    </div>
</template>

<script>
import { Search, MoreFilled} from '@element-plus/icons'
// import {ref} from 'vue'
// import chatItem from '@/layouts/main/components/Sidebar/components/chatItem.vue'
export default {
    components: {
        Search,
        MoreFilled
        // chatItem
    },

    setup () {
        //    const chatOptions = ref({
        //         avatar: "",
        //         name: 'Adham',
        //         lastMessage: 'hello from the All chat',
        //         time: '19:00',
        //         status: true
        //     });

        return {}
    }
}
</script>

<style lang="scss" scoped>

.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:  5px 0;

    .user-title{
        display: flex;  
        align-items: center;

        img{
            border-radius: 50%;
        }

        .user-info{
            padding-left: 0.5rem;
        }

    }
    .icons{
        display: flex;
        flex-direction: column;
        width: 2%;

        .actionsIcon{
            margin-top: 10px;
            
        }
    }
}
</style>