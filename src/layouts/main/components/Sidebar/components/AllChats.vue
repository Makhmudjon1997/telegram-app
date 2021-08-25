<template>
    <div>
        <chatItem :chatoptions="{
                avatar: '',
                name: 'Adham',
                lastMessage: 'hello from the chat',
                time: '19:00',
                status: false
            }"/>
    </div>
</template>

<script>
    import {ref} from 'vue';
    import chatItem from './chatItem.vue';

    export default {
        components: {
            chatItem
        },

        setup(){
            const chatOptions = ref({
                avatar: "",
                name: 'Adham',
                lastMessage: 'hello from the chat',
                time: '19:00',
                status: false
            })

            return{
                chatOptions
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>