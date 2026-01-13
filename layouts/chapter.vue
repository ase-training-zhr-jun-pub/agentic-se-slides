<script setup lang="ts">
import { computed } from "vue";
import { handleBackground } from "slidev-theme-innoq";

const props = defineProps({
    background: {
        type: String,
        default: 'petrol'
    },
    no: {
      type: Number,
    }
});

const style = computed(() => handleBackground(props.background))
</script>


<template>
  <div class="slidev-layout chapter p-25" :style="style">
      <div class="bg-petrol h-full shadow-xl grid place-content-center text-center">
        <h4 class="font-serif font-italic my-0 text-apricot">Chapter {{props.no}}</h4>
        <slot />
      </div>
  </div>
</template>
