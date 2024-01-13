<template>
    <div class="letter-page">
        <div class="letters-container" :overdose="Router.overdose || null" @mousewheel.stop="Router.nextLetter($event.wheelDelta)">
            <h3 class="letter next-letter" :out-of-focus="!letterSwitchV || null" :switch="letterSwitchEnd || null" :style="{transform: `translateY(${letterSwitchV * 100 - 100}%)`}">
                {{activeLetterToBe.letter}}
            </h3>
            <h3 class="letter" :switch="letterSwitchEnd || null" :style="{transform: `translateY(${letterSwitchV * 100 - 100}%)`}">
                {{activeLetterOld.letter}}
            </h3>
            <h3 class="letter next-letter" :out-of-focus="!letterSwitchV || null" :switch="letterSwitchEnd || null" :style="{transform: `translateY(${letterSwitchV * 100 - 100}%)`}">
                {{activeLetterToBe.letter}}
            </h3>
        </div>
        <div class="content" :transition="Router.changeLetterFreeze || null">
            <h2>{{activeLetter.title}}</h2>
            <div class="text" @mousewheel.stop>
                <Component :is="activeLetter.component"/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import RouterStore from "@/stores/Router.js";

    import { computed, ref, watch } from "vue";

    const Router = RouterStore();

    const activeLetter = computed(()=>Router.alpha.find(e => e.id == Router.letterId));
    const activeLetterOld = computed(()=>Router.alpha.find(e => e.id == Router.letterIdOld));
    const activeLetterToBe = computed(()=>Router.alpha.find(e => e.id == Router.letterIdToBe));

//scroll
    const letterSwitchEnd = ref(false);
    const letterSwitchV = ref(0);

    watch(()=>Router.letterIdToBe, (n)=>{
        if(Router.letterIdOld == n)return;

        letterSwitchV.value = Router.letterIdOld < n?-1:1;

        setTimeout(()=>{
            Router.letterIdOld = n;
            letterSwitchEnd.value = true;
            letterSwitchV.value = 0;
            setTimeout(()=>{letterSwitchEnd.value = false;}, 100)
        },801);
    });
</script>

<style lang="scss" scoped>
    .letter-page{
        display: grid;

        grid-template-columns: repeat(12, 1fr);
    }

    .letters-container{
        grid-column: span 6;
        overflow: hidden;
        border: var(--brd);
        border-radius: 55px;

        .letter{
            height: 100%;
            width: 100%;
            padding: 55px;
            @include flex-c;
            font-size: calc(40vw - 110px);
            transition: var(--anim-bounce) .8s;

            &[out-of-focus]{
                filter: blur(100px);
            }

            &[switch]{
                transition: 0s;
            }

            // &.next-letter{
            //     filter: blur(100px);
            // }
        }

        &[overdose]{
            pointer-events: none;
        }
    }

    .content{
        grid-column: span 6;
        transition: .4s;
        padding-left: 60px;
        @include flex-col;
        min-height: 0;

        &[transition]{
            opacity: 0;
            filter: blur(5px);
        }

        h2{
            font-size: 64px;
            text-align: center;
            width: 100%;
            margin-bottom: 30px;
        }

        .text{
            overflow-y: auto;
            overflow-x: hidden;
            margin-bottom: 120px;
        }
    }
</style>