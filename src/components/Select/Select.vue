<template>
    <div class="select_wrapper">
        <p 
            class="title"
            @click="areOptionsVisible = !areOptionsVisible"
        >{{ selected }}</p>
        <div 
            class="options"
            v-if="areOptionsVisible"    
        >
            <p
                v-for="option in options"
                :key="option._id"
                @click="selectOption(option)"
            >
                {{ option.title }}
        </p>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { ICategory } from '@/models/ICategory';

    export default defineComponent({
        name: 'Select',
        props: {
            options: {
                type: Array as () => ICategory[],
                default() {
                    return []
                }
            },
            selected: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                areOptionsVisible: false
            }
        },
        methods: {
            selectOption(option : ICategory) {
                this.$emit('select', option);
                this.areOptionsVisible = false;
            }
        },
    });
</script>

<style>
    .select_wrapper {
        position: relative;
        width: 200px;
        cursor: pointer;
        text-align: left;
    }

    .select_wrapper p{
        margin: 0;
    }

    .title {
        border: solid 1px #aeaeae;
        padding: 8px;
    }

    .options {
        border: solid 1px #aeaeae;
        background: #ffffff;
        position: absolute;
        top: 30px;
        left: 0;
        width: 100%;
        padding: 8px;
    }

    .options p:hover {
        background: #e7e7e7;
    }
</style>