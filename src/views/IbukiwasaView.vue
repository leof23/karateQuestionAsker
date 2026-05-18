<template>
  <div class="ibukiwasa-view">
    <div class="header">
      <button class="back-btn" @click="router.push('/')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        {{ t('common.back') }}
      </button>
      <div class="title-container">
        <h2 class="view-title">{{ t('home.cards.ibukiwasa.title') }}</h2>
        <span class="view-subtitle">{{ t('home.cards.ibukiwasa.desc') }}</span>
      </div>
    </div>
    <div class="controls">
      <div class="mode-toggle">
        <button class="mode-btn" :class="{ active: mode === 'list' }" @click="setMode('list')">{{ t('common.list') }}</button>
        <button class="mode-btn" :class="{ active: mode === 'random' }" @click="setMode('random')">{{ t('common.random') }}</button>
      </div>
      <button class="next-btn" :disabled="!canShowPrevious" @click="showPreviousCard">{{ t('common.previous') }}</button>
      <button class="next-btn" @click="showNextCard">{{ t(nextButtonKey) }}</button>
    </div>
    <p class="technique-indicator" :class="{ success: showSuccessAnimation }" v-if="currentCard">
      {{ t('common.techniqueNumberOf', { current: techniqueNumber, total: totalTechniques }) }}
      <span class="success-chip" v-if="showSuccessAnimation">{{ t('common.completed') }}</span>
    </p>
    <div class="content" v-if="currentCard">
      <FlipCard
        :key="`${mode}-${currentCard.position}-${cardRenderKey}`"
        :question="currentCard.question"
        :answer="currentCard.answer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import FlipCard from '../components/FlipCard.vue'
import { useTechniqueSession } from '../composables/useTechniqueSession'
import ibukiwasaCsvRaw from '../../ibukiwasa.csv?raw'

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()

const {
  mode,
  currentCard,
  cardRenderKey,
  techniqueNumber,
  showSuccessAnimation,
  totalTechniques,
  nextButtonKey,
  canShowPrevious,
  setMode,
  showNextCard,
  showPreviousCard
} = useTechniqueSession(ibukiwasaCsvRaw)
</script>

<style scoped>
.ibukiwasa-view {
  max-width: 800px;
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

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.mode-toggle {
  display: flex;
  background: #f1f5f9;
  border-radius: 8px;
  padding: 0.25rem;
}

.mode-btn {
  border: none;
  background: transparent;
  color: #475569;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mode-btn.active {
  background: #ffffff;
  color: #0f172a;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.12);
}

.next-btn {
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: #1e293b;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 0.875rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.next-btn:hover {
  border-color: #94a3b8;
  background: #f8fafc;
}

.next-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.technique-indicator {
  margin: 0 0 1rem 0;
  text-align: center;
  font-size: 0.95rem;
  color: #475569;
  font-weight: 600;
}

.technique-indicator.success {
  animation: success-pop 0.7s ease;
  color: #166534;
}

.success-chip {
  margin-left: 0.5rem;
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  background: #dcfce7;
  color: #166534;
  font-size: 0.75rem;
  font-weight: 700;
}

@keyframes success-pop {
  0% {
    transform: scale(1);
  }
  35% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
}

.content {
  display: flex;
  justify-content: center;
}
</style>
