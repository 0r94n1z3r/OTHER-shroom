<template>
    <p class="effect-p">
        <span v-for="(i,k) in Letter.string" :key="k" v-html="(!Letter.stop && i.blown)?i.blownW:i.w"></span>
    </p>
</template>

<script setup>
    import Router from "@/stores/Router.js";
    import { getRandomItem } from "@/script/helpers/random.js";
    
    import { computed, onMounted, watch } from "vue";

    const string = `Заикание&nbsp;&mdash; это речевое расстройство, которое характеризуется прерывистостью и&nbsp;повторением звуков, слогов или слов во&nbsp;время общения. Люди, страдающие от&nbsp;заикания, испытывают затруднения в&nbsp;плавности и&nbsp;ритме своей речи. Заикание может проявляться в&nbsp;различных формах, включая повторение звуков, затягивание звуков или блокировку звука. Это состояние может быть физиологическим или психологическим по&nbsp;своей природе и&nbsp;может иметь множество причин, включая генетические факторы, нервное напряжение, тревогу или низкую самооценку. Люди с&nbsp;заиканием часто испытывают эмоциональное напряжение и&nbsp;социальные трудности, так как страх перед осуждением и&nbsp;неудачей может усугублять их&nbsp;проблему. Тем не&nbsp;менее, с&nbsp;помощью специальных методов и&nbsp;терапии большинство людей с&nbsp;заиканием могут достичь значительного улучшения и&nbsp;развить более плавную и&nbsp;свободную речь.`
    
    const Letter = computed(()=>Router().alpha.find(e => e.letter == "З"));

    watch(
        ()=>Router().pillsConsumed,
        ()=>{
            Letter.value.stop = true,
            clearInterval(mutationInterval);
        }
    );

//

    let mutationInterval = null;
    onMounted(()=>{
        if(!Letter.value.string){
            Letter.value.string = string.split(' ').map(e => {return {w: `${e} `, blownW: `${e} `, blown: false, mutated: 0}});
        }

        const g = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
        const s = ['б', 'в', 'г', 'д', 'ж', 'з', 'й', 'к', 'л', 'м', 'н', 'п', 'р', 'с', 'т', 'ф', 'х', 'ц', 'ч', 'ш', 'щ'];

        mutationInterval = setInterval(()=>{
            let obj = getRandomItem(Letter.value.string);

            if (obj.mutated >= 3)return;
            obj.mutated++;
            
            let overflow = 0;
            let startingId = null;
            let piece = '';

            while(startingId == null && overflow<10){
                overflow++;
                let id = Math.floor(Math.random() * obj.blownW.length);
                if(s.includes(obj.blownW[id]) && g.includes(obj.blownW[id+1])){
                    startingId = id;
                    piece = obj.blownW[id]+obj.blownW[id+1]
                }
            }

            if(startingId == null ||overflow>10)return;
            
            for(let i = 0; i < Math.floor(Math.random() * 3); i++){
                setTimeout(()=>{
                    obj.blownW = obj.blownW.slice(0,-1);

                    obj.blownW = obj.blownW.slice(0, startingId+2) + piece + obj.blownW.slice(startingId+2);

                    obj.blownW += ' ';
                }, 300);
            }
            
            obj.blown = true;
        }, 500)
    })

    
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