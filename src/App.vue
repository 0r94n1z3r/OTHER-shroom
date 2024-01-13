<template>
    <div class="pages-wr" :style="{transform: `translateY(${Router.viewId == 0?0:-100}vh)`}" @mousewheel="scrollHandler">
        <Home class="page"/>
        <Letter class="page"/>

        <Teleport to='body'>
            <div class="drugs-wr" :overdose="Router.overdose || null">
                <div class="drugs">
                    <Pill/>
                    <Blister/>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup>
    import Home from "@/views/Home.vue";
    import Letter from "@/views/Letter.vue";

    import Blister from "@/components/blister/Blister.vue";
    import Pill from "@/components/pill/Pill.vue";

    import RouterStore from "@/stores/Router.js";

    import { computed, ref, watch } from "vue";

    const Router = RouterStore();

    const scrollHandler = (e)=>{
        Router.viewId = e.wheelDelta > 0?0:1
    };
</script>

<style lang="scss">
    body{
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }
</style>

<style lang="scss" scoped>
    .pages-wr{
        transition: var(--anim-bounce) 1s;
    }

    .page {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        padding: 60px;
    }

    .drugs-wr{
        position: fixed;
        bottom: 0;
        right: 60px;
        width: calc(50% - 120px);
        // display: flex;
        // justify-content: center;
        // gap: 60px;
        height: 0px;

        .drugs{
            position: relative;
        }

        &[overdose]{
            .pill-wr{
                @include hidden(-10px);
            }
        }
    }
</style>
