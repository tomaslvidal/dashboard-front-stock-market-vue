<template>
    <div>
        <div class="column row">
            <div class="col-12 justify-content-center d-flex align-items-center">
                <span class="title text-center mt-3" @click="home" style="cursor: pointer">
                    <i class="fas fa-brain"></i>

                    <br>

                    <span>
                        SISTEMA DE SIMULACIÓN
                    </span>

                    <hr>
                </span>
            </div>
        </div>

        <HeaderOne v-if="current_width < 768" />

        <ul class="nav flex-column my-3">
            <li class="nav-item" @click="open('link')">
                <router-link
                    class="nav-link active"
                    :to="{ name: 'config'}"
                >
                    <i :class="`${getMeta('config').icon} pr-2`"></i>

                    Configuración
                </router-link>
            </li>

            <li class="nav-item" @click="open('link')">
                <router-link
                    class="nav-link active"
                    :to="{ name: 'buy'}"
                >
                    <i :class="`${getMeta('buy').icon} pr-2`"></i>

                    Comprar
                </router-link>
            </li>

            <li class="nav-item" @click="open('link')">
                <router-link
                    class="nav-link active"
                    :to="{ name: 'leverage'}"
                >
                    <i :class="`${getMeta('leverage').icon} pr-2`"></i>
                    
                    Apalancamiento
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import HeaderOne from '@/views/components/header';

    import { Mixin } from '@/views/components/mixins';

    import $ from 'jquery';

    export default {
        name: 'Aside',
        mixins: [Mixin],
        components: {
            HeaderOne
        },
        computed: {
            state(){
                return this.$store.state.Root.aside.state;
            }
        },
        watch: {
            'current_width': function(val){                
                if(val >= 768){
                    if(this.$store.state.Root.aside.state.open){
                        this.$store.dispatch('Root/STATE_ASIDE', {
                            open: false
                        });
                    }
                }
                else if(val < 768){
                    if($('.aside').css('display') === 'none'){
                        console.log(1);
                        
                        if(!$('.content').length){
                        console.log(2);

                            $('.aside').removeClass('d-none');
                            
                            $('.aside').fadeIn(200);
                        }
                    }

                    if(!this.$store.state.Root.aside.state.open){
                        console.log(3);

                        if($('.aside').css('display') === 'block'){
                            this.$store.dispatch('Root/STATE_ASIDE', {
                                open: true
                            });
                        }
                    }
                }
            }
        },
        methods: {
            home(){
                window.location.href='/';
            },
            getMeta(name){
                const getItem = (name, key = 'name') => this.$router.options.routes.filter(item => item[key] === name);

                let item = getItem(name);

                if(!item.length){
                    item = getItem(`/${name}`, 'path');
                }
                
                if(item.length){
                    return item[0].meta;
                }

                return {};
            }
        }
    }
</script>

<style scoped>
    .column{
        min-height: 100px;
        max-height: 100px;
        background: #e64b4b;
    }

    .title{
        letter-spacing: 1px;
        font-size: 19px;
        font-weight: 400;
    }

    .nav-item{
        border-radius: 2px;
        padding: 2px;
        font-size: 15px;
        font-weight: 500;
    }
    
    .nav-item > a{
        color: #e7e7e7!important;
    }

    div.aside .nav-item:hover{
        background: rgb(77, 77, 77);
        transition: all 0.2s ease;
    }
</style>