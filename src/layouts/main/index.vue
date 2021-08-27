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
    export default {
        components: {
            Sidebar,
            Main
        },
        
    }
</script>

<style lang="scss">
.row{
    height: 100vh;
}
</style>