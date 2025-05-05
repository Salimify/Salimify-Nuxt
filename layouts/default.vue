<script setup lang="ts">
import {useGlobalMeta} from "~/logic/useGlobalMeta";

useGlobalMeta()
</script>

<template>
  <main class="px-4 py-10 text-gray-700 dark:text-gray-200">
    <Navbar/>
    <NuxtPage />
    <Footer/>
  </main>
</template>
