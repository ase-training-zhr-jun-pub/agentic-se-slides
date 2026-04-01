<script setup lang="ts">
import { computed } from "vue";
import { handleBackground } from "slidev-theme-innoq";

const props = defineProps({
    background: {
        type: String,
        default: 'petrol'
    },
    label: {
      type: String,
      default: '',
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
        <h3 class="font-serif font-italic my-1.5 text-apricot">{{ props.label || `Chapter ${props.no}` }}</h3>
        <slot />
      </div>
  </div>
</template>
