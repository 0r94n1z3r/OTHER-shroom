<template>
    <p class="effect-p">
        <span v-for="(i,k) in Letter.string" :key="k" :blown="!Letter.stop || null" v-html="i.w" :style="{'--time': `${0.01 + 0.07*Math.random()}s`}"></span>
    </p>
</template>

<script setup>
    import Router from "@/stores/Router.js";
    import { getRandomItem } from "@/script/helpers/random.js";
    
    import { computed, onMounted, watch } from "vue";

    const string = `Невроз&nbsp;&mdash; это психическое расстройство, характеризующееся появлением различных симптомов, таких как тревога, страх, нервозность, беспокойство, усталость, раздражительность и&nbsp;снижение настроения. Он&nbsp;обычно возникает в&nbsp;результате длительного стресса, эмоциональных конфликтов или травматических событий. Симптомы невроза могут включать панические приступы, фобии, обсессивно-компульсивные действия, сонные нарушения и&nbsp;соматические симптомы, такие как головные боли и&nbsp;желудочные расстройства. Невроз может существенно повлиять на&nbsp;качество жизни человека, но&nbsp;обычно может быть успешно лечен с&nbsp;помощью психотерапии, изменения образа жизни и&nbsp;в&nbsp;некоторых случаях, применения лекарственных препаратов.`
    
    const Letter = computed(()=>Router().alpha.find(e => e.letter == "Н"));

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
            animation: shake alternate infinite var(--time) linear;
        }
    }

    @keyframes shake {
        0% {
            transform: translateY(-2px);
        }
        100%{
            transform: translateY(2px);
        }
    }
</style>