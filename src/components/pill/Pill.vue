<template>
    <div class="pill-wr">
        <div class="pill-box" @click="Router.consumePill()" :freeze="Router.pillFreeze || null">    
            <div class="letters">
                <div class="letter" 
                    v-for="(i,k) in text" 
                    :key="k"
                    :style="{transform: `rotate(${1/text.length*(k+1)}turn)`}"
                >
                    <h4>{{i}}</h4>
                </div>
            </div>
            <div class="pill-container">
                <div class="pill"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import RouterStore from "@/stores/Router.js";

    const Router = RouterStore();

//curved texts
    const text = ref('закинуть таблы | закинуть таблы | '.split(''));


</script>

<style lang="scss" scoped>
    .pill-wr {
        position: absolute;
        bottom: 60px;
        right: calc(25vh + 60px);

        width: 25vh;
        height: 25vh;

        transition: var(--anim-bounce) .4s;

        &::before{
            @include pseudo-absolute;
            height: calc(50% + 120px);
            width: 100%;
            top: 50%;
            left: 0;
        }

        &:not(:hover){
            transform: translateY(calc(50%  + 60px));
        }
    }

    .pill-box{
        position: relative;
        height: 100%;
        width: 100%;
        cursor: pointer;

        border: var(--brd);
        border-radius: 50%;
        
        background: var(--c-default);

        transition: var(--anim-bounce) .4s;


        &:not([freeze]):active{
            transition-duration: .1s;
            transform: translateY(10%);
        }
    }

    .letters{
        position: relative;
        height: 88%;
        width: 88%;
        top: 6%;
        left: 6%;
        animation: rotation 15s linear infinite;
        
        @keyframes rotation {
            0% {
                transform:rotate(0deg);
            }
            100% {
                transform:rotate(360deg);
            }
        }

        .letter{
            position: absolute;
            @include directions(0, 0, unset, 0);
            display: flex;
            justify-content: center;

            margin: auto;

            width: 6vh;
            height: 50%;
            transform-origin: 50% 100%;

            h4{
                font-size: 2.4vh;
            }
        }
    }

    .pill-container{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        @include flex-c;

        .pill{
            width: 48%;
            height: 48%;
            position: relative;
            border: var(--brd);
            border-radius: 50%;

            &::before{
                height: 100%;
                width: 3px;
                background: var(--c-text);
                @include pseudo-absolute;
                @include all-directions(0);
                margin: auto;
                transform: rotate(-.125turn);
            }
        }
    }
</style>