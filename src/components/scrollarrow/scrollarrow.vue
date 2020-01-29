<template>
    <div>
        <div 
            :class="{
                'sticky_scrollable_arrow' : true,
                'show_arrow' : scroll_arrow,
                'hide_arrow' : !scroll_arrow
            }"
        >
            <font-awesome-icon
                class="arrow_icon"
                :icon="['fas' ,'arrow-up']"
                @click="scrollToTop()"
                fixed-width
            />
        </div>
    </div>
</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core';

    import {  faChevronCircleUp, faArrowUp } from '@fortawesome/free-solid-svg-icons';

    library.add( faChevronCircleUp, faArrowUp );

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
        background: black;
        cursor: pointer;
        position: fixed;
        display: flex;
        bottom: 80px;
        right: 20px;
        justify-content: center;
        align-items: center;
        z-index: 98;
        transition: all 600ms ease-in-out;
        width: 50px;
        height: 50px;
        box-shadow:0px 3px 15px -1px rgba(0, 0, 0, 0.75);
        border-radius: 30px;
        
    }
    .arrow_icon{
        color: #efefef;
        display: block;
        font-size: 0.5em;
    }
    .sticky_scrollable_arrow:hover{
        color: gray;
    }
    .hide_arrow{
        animation: hide_arrow 1s forwards;
        
    }
    .show_arrow{
        animation: show_arrow 1s ease-in-out;
        display: flex;
       
    }


    @media (max-width: 576px){
        .sticky_scrollable_arrow{
            display: none;
        }

    }
</style>