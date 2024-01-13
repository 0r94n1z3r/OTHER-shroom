<template>
    <div class="home">
        <ILogo class="logo"/>
    </div>
</template>

<script setup>
    import ILogo from "@/components/icons/ILogo.vue";
</script>

<style lang="scss" scoped>
    .home{
        width: 100%;
        height: 100vh;
        @include flex-c;

        .logo{
            width: calc(90vw - 120px);
            height: 100%;
        }
    }
</style>