<template>
    <p class="effect-p">
        <span v-for="(i,k) in Letter.string" :key="k" v-html="(!Letter.stop && i.blown)?i.blownW:i.w"></span>
    </p>
</template>

<script setup>
    import Router from "@/stores/Router.js";
    import { getRandomItem } from "@/script/helpers/random.js";
    
    import { computed, onMounted, watch } from "vue";

    const string = `
        Деменция, это нейрологическое расстройство, характеризующееся прогрессивной утратой познавательных способностей, включая память, мышление, ориентацию, внимание, способность планировать и&nbsp;принимать решения. Она обычно связана с&nbsp;повреждением мозга, вызванным различными причинами, такими как болезнь Альцгеймера, сосудистая деменция или другие неврологические состояния. Симптомы деменции могут включать забывчивость, путаницу, изменения настроения, трудности в&nbsp;общении и&nbsp;самообслуживании. Деменция существенно влияет на&nbsp;качество жизни пациента и&nbsp;требует поддержки и&nbsp;ухода со&nbsp;стороны близких и&nbsp;медицинских специалистов.
    `
    
    const Letter = computed(()=>Router().alpha.find(e => e.letter == "Д"));

    const replaceLettersWithRandom = (string)=>{
        const chars = string.split('');

        for (let i = 0; i < chars.length; i++){
            if(!(chars[i] === '&' && chars[i + 1] === 'n' && chars[i + 2] === 'b' && chars[i + 3] === 's' && chars[i + 4] === 'p' && chars[i + 5] === ';')){
                const randomLetter = String.fromCharCode(1040 + Math.floor(Math.random() * 66));
                chars[i] = randomLetter;
            }else{
                i += 5;
            }
        }

        const result = chars.join('');

        console.log(result);

        return result;
    }

    onMounted(()=>{
        if(!Letter.value.string){
            Letter.value.string = string.split(' ').map(e => {return {w: `${e} `, blownW: `${replaceLettersWithRandom(e)} `, blown: false}});
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

</style>