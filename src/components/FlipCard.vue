<template>
  <div class="flip-card-wrapper" @click="isFlipped = !isFlipped">
    <div class="flip-card" :class="{ 'is-flipped': isFlipped }">
      <div class="flip-card-inner">
        <div class="flip-card-face flip-card-front">
          <div class="card-badge">{{ t('flipCard.question') }}</div>
          <p class="card-content">{{ question }}</p>
          <div class="card-hint">{{ t('flipCard.clickToFlip') }}</div>
        </div>
        <div class="flip-card-face flip-card-back">
          <div class="card-badge">{{ t('flipCard.answer') }}</div>
          <p class="card-content">{{ answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  question: string
  answer: string
}>()

const { t } = useI18n({ useScope: 'global' })
const isFlipped = ref(false)
</script>

<style scoped>
.flip-card-wrapper {
  perspective: 1000px;
  cursor: pointer;
  width: 100%;
  max-width: 500px;
  -webkit-tap-highlight-color: transparent;
}

.flip-card {
  width: 100%;
  aspect-ratio: 1.6 / 1;
  position: relative;
}

.flip-card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.flip-card.is-flipped .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
}

.flip-card-back {
  transform: rotateY(180deg);
  background: #f8fafc;
}

.card-badge {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  background: #f1f5f9;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
}

.card-content {
  font-size: 1.25rem;
  color: #1e293b;
  text-align: center;
  line-height: 1.6;
  margin: 0;
  font-weight: 500;
}

.card-hint {
  position: absolute;
  bottom: 1.5rem;
  font-size: 0.875rem;
  color: #94a3b8;
}
</style>