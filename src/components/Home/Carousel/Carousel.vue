<template>
    <section class="bg-black">
    <div class="max-w-5xl overflow-hidden mx-auto relative">
        <div class="flex container text-white bg-black transition-all duration-500 ease" :style="{ 'margin-left': '-' + (33.33 * currentSlideIndex) + '%' }">
            <CarouselItem class="p-3 flex-shrink-0 bg-black carousel-item"
                            v-for="product in carouselProducts"
                            :key="product._id"
                            :product_data="product"
            />
        </div>
        <button class="absolute top-1/2 left-1 transform -translate-y-1/2 bg-transparent border border-white rounded-full p-2" @click="prevSlide">
            <img src="../../../assets/icons/arrow-left.png" alt="left" class="w-5 h-5">
            <span class="arrow-background"></span>
        </button>
        <button class="absolute top-1/2 right-1 transform -translate-y-1/2 bg-transparent border border-white rounded-full p-2" @click="nextSlide">
            <img src="../../../assets/icons/arrow-right.png" alt="right" class="w-5 h-5">
            <span class="arrow-background"></span>
        </button>
    </div>
</section>
</template>
  

<script lang="ts">
    import { IDish } from '@/models/IDish';
    import { defineComponent } from 'vue';
    import { mapActions, mapGetters } from 'vuex';
    import CarouselItem from './CarouselItem.vue';

    export default defineComponent({
        name: 'Carousel',
        components: {CarouselItem},
        data() {
            return {
                carouselProducts: [] as IDish[],
                currentSlideIndex: 0,
                currentPage: 1,
                carouselPageSize: 10
            }
        },
        methods: {
            ...mapActions('dishes',[
                'GET_PRODUCTS_FROM_API',
            ]),
            prevSlide() {
                if (this.currentSlideIndex > 0) {
                    this.currentSlideIndex--;
                }
            },
            nextSlide() {
                if (this.currentSlideIndex >= this.carouselProducts.length - 3) {
                    this.currentSlideIndex = 0;
                } else {
                    this.currentSlideIndex++;
                }
            }
        },
        async mounted() {
            const res = await this.GET_PRODUCTS_FROM_API({ currentPage: this.currentPage, pageSize: this.carouselPageSize, saveState: false });
            this.carouselProducts = res.dishes;
        }
    })
</script>

<style>
.arrow-background {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Adjust the opacity value as desired */
    opacity: 0;
    pointer-events: none; /* This ensures that the background doesn't interfere with button clicks */
    border-radius: 9999px;
    transition: opacity 0.3s ease;
  }
  button:hover .arrow-background {
    opacity: 1;
  }

</style>