<template>
    <el-row class="row">
        <el-col :span="7">
            <Sidebar />
        </el-col>
        <el-col :span="17">
                <Main />
        </el-col>
    </el-row>
</template>

<script>
    import Sidebar from './components/Sidebar/index'
    import Main from './components/Main/index'
    import { computed } from "vue";
    import { useStore } from "vuex";
    export default {
        components: {
            Sidebar,
            Main
        },
        setup() {
            const store = useStore();
            const user = computed(() => store.state.user);
            const hash_ = computed(() => {
                let hash = 0
                if(user.value)
                    hash = (((hash * 0x4F25) & 0x7FFFFFFF) + user.value.id) & 0x7FFFFFFF
                console.log('hash', hash)
                return  hash
            })
            
            return {
                hash_
            }
        }
        
    }
</script>

<style lang="scss">
.row{
    height: 100vh;
}
</style>