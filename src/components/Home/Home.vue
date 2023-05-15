<template>
    <Header />
    <Poster />
    <About />
    <Footer />
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Poster from './Poster/Poster.vue'
    import About from './About/About.vue'
    import Header from './Header/Header.vue'
    import Footer from './Footer/Footer.vue'

    export default defineComponent({
        name: 'Home',
        props: {},
        components: {
            Poster, About, Header, Footer
        },
        data() {
            return {}
        },
    });
</script>

<style>

</style>