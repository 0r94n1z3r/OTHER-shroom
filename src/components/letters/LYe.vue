<template>
    <p class="effect-p">
        <span v-for="(i,k) in Letter.string" :key="k" :blown="!Letter.stop || null" v-html="i.w" :style="{'--time': `${0.03 + 0.07*Math.random()}s`}"></span>
    </p>
</template>

<script setup>
    import Router from "@/stores/Router.js";
    import { getRandomItem } from "@/script/helpers/random.js";
    
    import { computed, onMounted, watch } from "vue";

    const string = `Эпилепсия&nbsp;&mdash; это неврологическое расстройство, характеризующееся повторяющимися эпизодами эпилептических приступов. Во&nbsp;время приступа возникают временные нарушения нормальной активности мозга, что приводит к&nbsp;различным симптомам. Эти симптомы могут включать непроизвольные судороги, потерю сознания, изменение поведения, аномальные ощущения и&nbsp;восприятие. Причины эпилепсии могут быть разнообразными, включая генетические факторы, травмы головы, инфекции или мозговые опухоли. Диагноз обычно ставится после проведения электроэнцефалограммы (ЭЭГ) и&nbsp;клинического обследования. Эпилепсия часто контролируется с&nbsp;помощью антиэпилептических препаратов, хотя в&nbsp;некоторых случаях может потребоваться хирургическое вмешательство. Важно отметить, что эпилепсия не&nbsp;является инфекционным или заразным заболеванием, и&nbsp;люди с&nbsp;этим расстройством могут привести полноценную жизнь с&nbsp;помощью подходящего лечения и&nbsp;поддержки.`

    const Letter = computed(()=>Router().alpha.find(e => e.letter == "Э"));

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
            animation: blink alternate infinite var(--time) linear;
        }
    }

    @keyframes blink {
        0% {
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
</style>