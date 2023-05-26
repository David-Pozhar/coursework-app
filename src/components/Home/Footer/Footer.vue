<template>
    <footer id="footer" class="bg-gray-800">
      <div class="grid grid-cols-2 gap-8 py-8 px-6 md:grid-cols-4">
        <div>
          <h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase">Company</h2>
          <ul class="text-gray-300">
            <li class="mb-4">
              <router-link to="/about" class="hover:underline">About Us</router-link>
            </li>
            <li class="mb-4">
              <router-link to="/" class="hover:underline">Menu</router-link>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="flex justify-center items-center mb-6 text-sm font-semibold text-gray-400 uppercase">Follow Us</h2>
          <div class="flex items-center justify-between">
            <a href="https://www.instagram.com/david_maphin/" class="hover:underline">
              <img src="../../../assets/icons/instagram.svg" alt="Instagram" class="h-6 w-6">
            </a>
            <a href="https://www.facebook.com/profile.php?id=100014070430655" class="hover:underline">
              <img src="../../../assets/icons/facebook.svg" alt="Facebook" class="h-6 w-6">
            </a>
            <a href="https://web.telegram.org/k/#@dmaphin" class="hover:underline">
              <img src="../../../assets/icons/telegram.svg" alt="Telegram" class="h-7 w-7">
            </a>
          </div>
        </div>
      </div>
      <div class="py-6 px-4 bg-gray-700 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-300 sm:text-center">© 2023 Food Delivery. All Rights Reserved.</span>
      </div>
    </footer>
  </template>
  

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'Footer'
    });
</script>

<style>

</style>