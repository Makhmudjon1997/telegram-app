<template>
    <div class="message">
        <img src="https://picsum.photos/50" alt="">
        <div class="text-box">
            <h4 class="user-name">Makhmud</h4>
            <div class="text-and-time">
                <p class="text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus iste fuga dolor ipsa aliquam ratione?</p>
                <time>19:00</time>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
    .message{
        display: flex;
        justify-content: center;
        align-items: flex-end;
        margin: 0.5em 0;
        

        img{
            border-radius: 50%;
        }

        .text-box{
            margin-left: 0.5em;
            padding: 0.3em 0.5em; 
            background-color: white;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            border-top-left-radius: 10px;
            // border-bottom-left-radius: 10px;
        

            .text-and-time{
                display: flex;
                justify-content: space-between;

                time{
                    background-color: white;
                    display: flex;
                    align-self: flex-start;
                }
            }
        }
    }
</style>