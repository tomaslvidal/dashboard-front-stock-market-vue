<template>
    <div>
        <font-awesome-icon
            :class="{
                'sticky_scrollable_arrow': true,
                'show_arrow' : scroll_arrow,
                'hide_arrow' : !scroll_arrow
            }"
            :icon="['fas' ,'chevron-circle-up']"
            @click="scrollToTop()"
            fixed-width
        />
    </div>
</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core';

    import {  faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';

    library.add( faChevronCircleUp );

    import $ from 'jquery';

    export default {
        methods: {
            scrollToTop(){
                $('html, body').animate({scrollTop:0}, '300');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @keyframes show_arrow{
        0% {
            opacity: 0;
            transform: translateX( 50px);
        }
        100%{
            opacity: 1;
            transform: translateX( 0px);
        }
    }
     @keyframes hide_arrow{
        0% {
            opacity: 1;
            transform: translateX( 0px);
        }
        100%{
            opacity: 0;
            transform: translateX( 50px);
            display: none;
        }
    }
    .sticky_scrollable_arrow{
        font-size: 2.5em;
        color: #007bff;
        cursor: pointer;
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 98;
        transition: all 600ms ease-in-out;
        background: transparent;
        width: 40px;
        box-shadow: 0px 2px 6px -2px rgba(0,0,0,0.75);
        border-radius: 30px;
        
    }
    .sticky_scrollable_arrow:hover{
        color: gray;
    }
    .hide_arrow{
        animation: hide_arrow 1s forwards;
        
    }
    .show_arrow{
        animation: show_arrow 1s ease-in-out;
        display: block;
       
    }


    @media (max-width: 800px){
        .sticky_scrollable_arrow{
            top:10px;
            bottom: 0;
        }
    }
</style>