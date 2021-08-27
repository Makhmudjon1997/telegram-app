<template>
    <div v-for="item in chatOptionsList" :key="item.name">
        <chatItem  
            v-for="(dialog, index) in all_dialogs" 
            :key="index"
            :chatoptions="dialog"
         />

    </div>
</template>

<script>
    import {computed, ref} from 'vue';
    import {useStore} from 'vuex'
    import chatItem from './chatItem.vue';

    export default {

        components: {
            chatItem
        },

        setup(){

            const store = useStore()
            const all_dialogs = computed(() => store.getters.GET_ALL)


            const chatOptions = ref({
                avatar: "",
                name: 'Adham',
                lastMessage: 'hello from the All chat',
                time: '19:00',
                status: true
            });

            const chatOptionsList = ref([chatOptions, chatOptions,chatOptions,chatOptions,chatOptions,chatOptions,chatOptions,chatOptions,]);

            // const store = useStore();
             
            return{
                chatOptions, chatOptionsList,
                all_dialogs //chatItemsLength
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>