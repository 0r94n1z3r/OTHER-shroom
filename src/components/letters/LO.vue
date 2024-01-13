<template>
    <p class="effect-p">
        <template v-if="Letter.stop">
            <span v-for="(i,k) in Letter.string" :key="k" v-html="i.w"></span>
        </template>
        <template v-else>
            <span class="word" v-for="(i,k) in Letter.string" :key="k">
                <span v-for="(j,f) in i.blownW" :key="f" class="letter" :style="{transform: `translateX(${Math.random()*14 - 7}%)`}">{{j}}</span>
            </span>
        </template>
    </p>
</template>

<script setup>
    import Router from "@/stores/Router.js";
    import { getRandomItem } from "@/script/helpers/random.js";
    
    import { computed, onMounted, watch } from "vue";

    const string = `Обсессивно-компульсивное расстройство (ОКР), это психическое заболевание, характеризующееся наличием навязчивых мыслей (обсессий) и&nbsp;повторяющихся действий (компульсий). Обсессии вызывают беспокойство, тревогу и&nbsp;неуместные мысли, которые не&nbsp;пропадают, вызывая повторное их&nbsp;возникновение. Компульсии являются попыткой справиться с&nbsp;тревогой, например, повторное мытье рук или проверка двери несколько раз. ОКР может привести к&nbsp;значительным нарушениям в&nbsp;повседневной жизни, вызывая дискомфорт и&nbsp;затрудняя выполнение обычных задач. Лечение обычно включает психотерапию и&nbsp;в&nbsp;некоторых случаях применение лекарственных препаратов.`
    
    const Letter = computed(()=>Router().alpha.find(e => e.letter == "О"));

    watch(
        ()=>Router().pillsConsumed,
        ()=>{Letter.value.stop = true}
    );

    onMounted(()=>{
        if(!Letter.value.string){
            Letter.value.string = string.split(' ').map(e => {return {w: `${e} `, blownW: `${e} `.replaceAll('&nbsp;', '').split('')}});
        }
    });
    
</script>

<style lang="scss" scoped>
    span{
        &.letter, &.word{
            display: inline-block;
        }

        &.word{
            padding-right: .3em;
        }
    }
</style>