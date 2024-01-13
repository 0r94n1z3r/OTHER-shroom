<template>
    <div class="blister">
        <div class="pill-wr"
            v-for="i in Router.alpha" 
            :key="i.id" 
            :active="i.id == Router.letterIdToBe || null"
            :empty="
                i.empty ||
                (Router.overdose && i.letter != 'Ь') || 
                null
            "
        >
            <div class="pill-container" @click="Router.changeLetter(i.id, true)">
                <div class="pill">
                    <h2>{{i.letter}}</h2>
                </div>
            </div>
            <div class="dash"></div>
        </div>
    </div>
</template>

<script setup>
    import RouterStore from "@/stores/Router.js";
    const Router = RouterStore();
</script>

<style lang="scss" scoped>
    .blister{
        position: absolute;
        right: 0;
        bottom: 60px;
        padding: 2.5vh;
        padding-bottom: 3.5vh;
        border: var(--brd);
        border-radius: 5vh;
        background: var(--c-default);

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2.2vh;

        transition: var(--anim-bounce) .8s;

        &:not(:hover){
            transform: translateY(calc(100% - 60px));
        }

        &::before{
            @include pseudo-absolute;
            height: calc(60px + 3rem);
            width: 100%;
            top: calc(100% - 2.5rem);
        }

        .pill-wr{
            width: 5vh;
            height: 5vh;
            position: relative;

            &::before{
                @include pseudo-absolute;
                border-radius: 0 0 999vh 999vh;
                border: var(--brd);
                width: 100%;
                height: 65%;
                left: 0;
                bottom: -15%;  
            }

            .pill-container{
                border-radius: 50%;
                border: var(--brd);
                width: 100%;
                height: 100%;
                background: var(--c-default);
                border: 2px solid var(--c-text);
                cursor: pointer;
                transition: .1s .3s;
                overflow: hidden;
                position: relative;

                .pill{
                    height: 100%;
                    width: 100%;
                    @include flex-c;
                    border: 1px solid var(--c-text);
                    border-radius: 50%;
                    transition: .4s;
                }
 
                h2{
                    font-size: 2.4vh;
                }
            }

            .dash{
                position: absolute;
                top: calc(9% - 1.25vh);
                left: -1.25vh;
                pointer-events: none;
                border: dashed var(--c-text);
                border-width: 0 1px 1px 0;
                width: calc(100% + 2.5vh);
                height: calc(100% + 2.5vh);
            }

            &:nth-child(3n){
                .dash{
                    border-right-width: 0;
                }
            }

            &:nth-child(1n + 31){
                .dash{
                    border-bottom-width: 0;
                }
            }

            &[active], &[empty]{
                pointer-events: none;
                
                .pill-container{
                    transition: .0s;
                    transform: translateY(10%);

                    .pill{
                        transform: translateY(100%) scale(.5);
                    }
                }
            }
        }

        
    }
</style>