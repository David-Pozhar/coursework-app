<template>
    <Header />
    <Poster />
    <Carousel />
    <Menu />
    <Footer />
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Poster from './Poster/Poster.vue'
    import Header from './Header/Header.vue'
    import Footer from './Footer/Footer.vue'
    import Menu from '../Menu/Menu.vue';
    import Carousel from './Carousel/Carousel.vue';

    export default defineComponent({
        name: 'Home',
        props: {},
        components: {
            Poster, Carousel, Menu, Header, Footer
        },
    });
</script>

<style>

</style>