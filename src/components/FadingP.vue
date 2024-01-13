<template>
    <div class="fading-p" :fade="fade || null">
        <div class="fading-p-container">
            <span v-for="(i,k) in parsedText" :key="k" :style="{'--shift': `${Math.random() * 200 - 100}px`}">{{i}}</span>
        </div>
    </div>
</template>

<script setup>
    import { computed, ref } from "vue";

    const props = defineProps({
        text: String,
        fade: Boolean,
    })

    const parsedText = computed(()=>props.text.split(' ')); 
</script>

<style lang="scss" scoped>
    .fading-p{
        span{
            transition: filter 1.5s, transform 1.5s, opacity 2.5s;
            display: inline-block;
            padding-right: .3em;
            --shift: 0;
        }

        &:not([fade]){
            span{
                &:hover{
                    transition: filter .1s, opacity 2.5s;
                    filter: blur(10px);
                    opacity: 0;
                }
            }
        }

        &[fade]{
            span{
                transform: translateZ(var(--shift));
                pointer-events: none;
                filter: blur(10px);
                opacity: 0;
            }
        }
    }
</style>