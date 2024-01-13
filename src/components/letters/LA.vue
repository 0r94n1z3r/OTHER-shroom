<template>
    <p class="effect-p">
        <span v-for="(i,k) in Letter.string" :key="k" :blown="(!Letter.stop && i.blown) || null" v-html="i.w"></span>
    </p>
</template>

<script setup>
    import Router from "@/stores/Router.js";
    import { getRandomItem } from "@/script/helpers/random.js";
    
    import { computed, onMounted, watch } from "vue";

    const string = `
        Амнезия&nbsp;&mdash; это состояние, характеризующееся частичной или полной потерей памяти. При амнезии человек может забыть информацию о&nbsp;событиях, людях, местах или даже свою собственную личность. Причины амнезии могут быть разнообразными, включая физические травмы головы, заболевания, психологический стресс или длительное употребление определенных веществ. Амнезия может быть временной или длительной, и&nbsp;ее&nbsp;проявления могут варьироваться от&nbsp;легкой памяти о&nbsp;пропущенных событиях до&nbsp;полной забвения предшествующих периодов жизни. Лечение амнезии зависит от&nbsp;ее&nbsp;причин и&nbsp;может включать медицинскую терапию, психотерапию или реабилитационные методы, направленные на&nbsp;восстановление памяти и&nbsp;улучшение качества жизни человека.
    `
    
    const Letter = computed(()=>Router().alpha.find(e => e.letter == "А"));

    onMounted(()=>{
        if(!Letter.value.string){
            Letter.value.string = string.split(' ').map(e => {return {w: `${e} `, blown: false}});
        }

        setInterval(()=>{
            getRandomItem(Letter.value.string).blown = true;
        }, 500)
    })

    watch(
        ()=>Router().pillsConsumed,
        ()=>Letter.value.stop = true  
    );
</script>

<style lang="scss" scoped>
    span{
        transition: 1s;

        &:not(:hover)[blown]{
            opacity: 0;
            filter: blur(10px);
        }

        &:hover{
            transition: 0.2s;
        }
    }
</style>