<template>
    <div class="relative">
      <button type="button" class="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        @click="areOptionsVisible = !areOptionsVisible"
      >
        <span>{{ selected }}</span>
        <svg class="w-5 h-5 ml-2 -mr-1 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            :class="{ 'rotate-180': areOptionsVisible }"
        >
          <path
            fill-rule="evenodd"
            d="M10 2.5a.5.5 0 01.5.5v12.793l3.146-3.147a.5.5 0 01.707 0l.647.646a.5.5 0 010 .708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 010-.708l.646-.646a.5.5 0 01.708 0L9.5 15.293V3a.5.5 0 01.5-.5z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      
      <div
        v-if="areOptionsVisible"
        class="absolute z-10 w-40 mt-2 bg-white rounded-md shadow-lg"
      >
        <ul>
          <li class="py-2 px-4 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
            v-for="option in options"
            :key="option._id"
            @click="selectCategory(option)"
          >
            {{ option.title }}
          </li>
        </ul>
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
            selectCategory(option : ICategory) {
                this.$emit('select', option);
                this.areOptionsVisible = false;
            }
        },
    });
</script>

<style>
</style>