<template>
  <div class="numbers-view">
    <div class="header">
      <button class="back-btn" @click="router.push('/')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        {{ t('common.back') }}
      </button>
      <div class="title-container">
        <h2 class="view-title">{{ t('numbers.title') }}</h2>
        <span class="view-subtitle">{{ t('numbers.subtitle') }}</span>
      </div>
    </div>
    <NumbersGrid />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import NumbersGrid from '../components/NumbersGrid.vue'

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()
</script>

<style scoped>
.numbers-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  gap: 1.5rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: -0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background-color: #f1f5f9;
  color: #0f172a;
}

.title-container {
  display: flex;
  flex-direction: column;
}

.view-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.view-subtitle {
  font-size: 0.875rem;
  color: #64748b;
}
</style>
