<template>
    <div class="qr">
        <img src="" alt="QRimage"> <!--qr code goes here -->
        <h3 class="heading">Log in Telegram by QR Code</h3>
        <ul class="list">
            <li class="item">Open Telegram on your phone</li>
            <li class="item"> <span>Go to</span>  <strong style="margin-left: .5em"> Settings > Devices > Scan QR</strong></li>
            <li class="item">Point your phone at this screen to confirm login</li>
        </ul>
        <button class="btn" @click="$emit('changeLoginView', 1)">LOG IN BY PHONE NUMBER</button>
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

    :root{
        counter-reset: listItem;
    }

    .qr{
        font-family: 'Roboto', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;   
        padding: 80px 0; 
        width: 25.5rem;
        margin: 0 auto;
    }

    .heading{
        margin-top: 20px;
        margin-bottom: 0;
    }

    .item{
        padding: 10px 0;
        list-style: none;
        counter-increment: listItem;
        display: flex;
        align-items: center;

        &::before{
            content: counter(listItem);
            margin-right: 15px;
            padding: 0.2em 0.5em;
            background-color: $primary-color;
            color: white;
            border-radius: 50%;
        }
    }

    .btn{
       @include btn__login
    }


</style>