<template>
    <div v-for="item in chatOptionsList" :key="item.name">
        <chatItem :chatoptions="chatOptions"/>
    </div>
</template>

<script>
    import {ref} from 'vue';
    // import {useStore} from 'vuex'
    import chatItem from './chatItem.vue';

    export default {
        components: {
            chatItem
        },

        setup(){
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
                chatOptions, chatOptionsList, //chatItemsLength
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>