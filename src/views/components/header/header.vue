<template>
    <header class="header row bg-primary">
        <div class="col-12">
            <div class="d-flex h-100 justify-content-start align-items-center">
                <span class="text-light d-flex align-items">
                    <i @click="open" class="fas fa-bars menu pl-1" style="cursor: pointer; font-size: 25px"></i>
                </span>
            </div>
        </div>
    </header>
</template>

<script>
    import { Mixin } from '@/views/components/mixins';

    export default {
        name: 'Header',
        mixins: [Mixin]
    }
</script>

<style lang="scss" scoped>
    @import './styles';
</style>