<template>
    <p class="effect-p">
        <span v-for="(i,k) in Letter.string" :key="k" :blown="!Letter.stop || null" v-html="i.w" :style="{'--time': `${2 + 10*Math.random()}s`}"></span>
    </p>
</template>

<script setup>
    import Router from "@/stores/Router.js";
    import { getRandomItem } from "@/script/helpers/random.js";
    
    import { computed, onMounted, watch } from "vue";

    const string = `
        Меланхолия&nbsp;&mdash; это сложное эмоциональное состояние, характеризующееся глубокой печалью, тоской и&nbsp;унынием. Она описывает чувство внутренней пустоты и&nbsp;непонимания, которое может сопровождать человека на&nbsp;протяжении продолжительного времени. Меланхолия влияет на&nbsp;настроение, энергию и&nbsp;мотивацию, вызывая чувство отчуждения от&nbsp;окружающего мира. Люди, испытывающие меланхолию, могут часто ощущать грусть, низкую самооценку и&nbsp;потерю интереса к&nbsp;привычным радостям жизни. Это состояние может быть вызвано различными факторами, включая биологические, психологические и&nbsp;социальные причины. Меланхолия необходима для глубоких размышлений и&nbsp;рефлексии, однако, когда она становится доминирующим состоянием, может требоваться поддержка и&nbsp;помощь для преодоления этого состояния и&nbsp;возвращения к&nbsp;эмоциональному равновесию.
    `

    const Letter = computed(()=>Router().alpha.find(e => e.letter == "М"));

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
        &[blown]{
            animation: pulse alternate infinite var(--time);
        }
    }

    @keyframes pulse {
        0% {
            opacity: 0.05;
        }
        100%{
            opacity: 0.5;
        }
    }
</style>