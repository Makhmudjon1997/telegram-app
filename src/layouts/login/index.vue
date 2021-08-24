<template>
    <transition name="fade" mode="out-in">
        <Phone @changeLoginView ="handleChange" v-if="currentLogin === 1"/>
        <QR @changeLoginView ="handleChange" v-else/>
    </transition>
</template>

<script>

import Phone from '../login/components/Phone.vue'
import QR from '../login/components/QR.vue'
import {ref} from 'vue'

export default {
    components: {
        Phone,
        QR,
    },
    setup () {
        let currentLogin = ref(1);

        function handleChange (n){
            currentLogin.value = n
        }
        
       return {currentLogin, handleChange}
    }
}

</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>