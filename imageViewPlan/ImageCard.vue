<template>
  <figure
    class="image-card"
    :class="{ 'is-clickable': clickable }"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable ? 0 : undefined"
    @click="handleSelect"
    @keydown.enter.prevent="handleSelect"
    @keydown.space.prevent="handleSelect"
  >
    <figcaption class="image-card__caption">{{ caption }}</figcaption>

    <div class="image-card__frame" :style="{ aspectRatio: aspectRatioStyle }">
      <img
        v-if="src && !errored"
        :src="src"
        :alt="alt || caption"
        class="image-card__img"
        :class="{ 'is-loaded': loaded }"
        @load="loaded = true"
        @error="errored = true"
      />
      <div v-if="src && !loaded && !errored" class="image-card__skeleton" aria-hidden="true"></div>
      <svg
        v-if="!src || errored"
        class="image-card__placeholder"
        viewBox="0 0 120 80"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="116" height="76" rx="6" fill="none" stroke="currentColor" stroke-width="2" />
        <circle cx="28" cy="26" r="9" fill="none" stroke="currentColor" stroke-width="2" />
        <polyline
          points="14,66 46,40 60,52 84,28 106,50"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linejoin="round" stroke-linecap="round"
        />
      </svg>
    </div>
  </figure>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

type AspectRatio = '16/10' | '1/1' | '4/3'

const props = withDefaults(
  defineProps<{
    id?: string
    caption: string
    src?: string | null
    alt?: string
    aspectRatio?: AspectRatio
    clickable?: boolean
  }>(),
  { id: '', src: null, alt: '', aspectRatio: '16/10', clickable: false },
)

const emit = defineEmits<{ select: [id: string] }>()

const loaded = ref(false)
const errored = ref(false)
const aspectRatioStyle = computed(() => props.aspectRatio.replace('/', ' / '))

watch(
  () => props.src,
  () => {
    loaded.value = false
    errored.value = false
  },
)

const handleSelect = () => {
  if (!props.clickable) {
    return
  }

  emit('select', props.id)
}
</script>

<style scoped>
.image-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
  padding: 1.5rem;
  margin: 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  font: inherit;
}

.image-card.is-clickable {
  cursor: pointer;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.image-card.is-clickable:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
.image-card.is-clickable:active { transform: scale(0.99); }
.image-card.is-clickable:focus-visible { outline: 2px solid #334155; outline-offset: 2px; }

.image-card__caption {
  font-size: 1.375rem;
  font-weight: 500;
  color: #1e293b;
  text-align: center;
  margin: 0;
}

.image-card__frame {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
  background: #f8fafc;
  color: #334155;
}

.image-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
.image-card__img.is-loaded { opacity: 1; }

.image-card__skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 37%, #f1f5f9 63%);
  background-size: 400% 100%;
  animation: image-card-shimmer 1.2s linear infinite;
}

.image-card__placeholder { width: 60%; height: auto; }

@keyframes image-card-shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: 0 0; }
}

@media (prefers-reduced-motion: reduce) {
  .image-card.is-clickable, .image-card__img { transition: none; }
  .image-card__skeleton { animation: none; }
}
</style>
