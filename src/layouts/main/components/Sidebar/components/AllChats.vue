<template>
    <div 
        v-for="(dialog, index) in all_dialogs" 
            :key="index"
    >
        <chatItem  
            
            :chatoptions="dialog"
         />

    </div>
</template>

<script>
    import {computed} from 'vue';
    import {useStore} from 'vuex'
    import chatItem from './chatItem.vue';
    export default {
        components: {
            chatItem
        },
        setup(){
            const store = useStore()
            const all_dialogs = computed(() => store.getters.GET_ALL)
            return{
                all_dialogs //chatItemsLength
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>