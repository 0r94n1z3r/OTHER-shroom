<template>
    <p class="effect-p">
        <span v-for="(i,k) in Letter.string" :key="k" :blown="!Letter.stop || null" v-html="i.w" 
            :style="{
                '--time': `${0.5 + 1*Math.random()}s`,
                '--blowtime': Math.random() > .8 ? `${0.5 + 1*Math.random()}s`:'0s'
            }"
        ></span>
    </p>
</template>

<script setup>
    import Router from "@/stores/Router.js";
    import { getRandomItem } from "@/script/helpers/random.js";
    
    import { computed, onMounted, watch } from "vue";

    const string = `Синдром дефицита внимания и&nbsp;гиперактивности (СДВГ)&nbsp;&mdash; неврологическое расстройство, которое обычно начинается в&nbsp;детском возрасте и&nbsp;проявляется через повышенную двигательную активность, трудности сосредоточиться и&nbsp;поддерживать внимание, а&nbsp;также импульсивное поведение. Люди с&nbsp;СДВГ могут испытывать проблемы в&nbsp;обучении, социальной адаптации и&nbsp;взаимодействии с&nbsp;окружающим миром. Основные симптомы включают беспокойство, отвлекаемость, гиперактивность, невозможность сидеть на&nbsp;месте и&nbsp;низкую контролируемость импульсов. Диагностика и&nbsp;лечение СДВГ обычно проводятся специалистами психиатрии или педиатрии с&nbsp;применением медикаментозной терапии, психообразовательных методов и&nbsp;психологической поддержки.`

    const Letter = computed(()=>Router().alpha.find(e => e.letter == "С"));

    watch(
        ()=>Router().pillsConsumed,
        ()=>{Letter.value.stop = true}
    );

    onMounted(()=>{
        if(!Letter.value.string){
            Letter.value.string = string.split(' ').map(e => {return {w: `${e} `}});
        }
    });
    
</script>

<style lang="scss" scoped>
    span{
        display: inline-block;
        padding-right: 0.3em;

        &:not(:hover)[blown]{
            animation: 
                rgb alternate infinite var(--time) linear, 
                blow alternate infinite var(--blowtime) linear
            ;
        }
    }

    @keyframes rgb {
        0% {
            color: hsl(0, 100%, 50%);
        }
        8% {
            color: hsl(calc(30 * 1), 100%, 50%);
        }
        16% {
            color: hsl(calc(30 * 2), 100%, 50%);
        }
        24% {
            color: hsl(calc(30 * 3), 100%, 50%);
        }
        32% {
            color: hsl(calc(30 * 4), 100%, 50%);
        }
        40% {
            color: hsl(calc(30 * 5), 100%, 50%);
        }
        48% {
            color: hsl(calc(30 * 6), 100%, 50%);
        }
        56% {
            color: hsl(calc(30 * 7), 100%, 50%);
        }
        64% {
            color: hsl(calc(30 * 8), 100%, 50%);
        }
        72% {
            color: hsl(calc(30 * 9), 100%, 50%);
        }
        80% {
            color: hsl(calc(30 * 10), 100%, 50%);
        }
        88% {
            color: hsl(calc(30 * 11), 100%, 50%);
        }
    }

    @keyframes blow{
        0%{
            transform: scale(.5);
        }
        100%{
            transform: scale(2);
        }
    }
</style>