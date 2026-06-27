<template>
  <div class="animals-view">
    <div class="header">
      <button class="back-btn" @click="router.push('/')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        {{ t('common.back') }}
      </button>
      <div class="title-container">
        <h2 class="view-title">{{ t('home.cards.animals.title') }}</h2>
        <span class="view-subtitle">{{ t('home.cards.animals.desc') }}</span>
      </div>
    </div>
    <div class="controls">
      <div class="mode-toggle">
        <button class="mode-btn" :class="{ active: mode === 'list' }" @click="setMode('list')">{{ t('common.list') }}</button>
        <button class="mode-btn" :class="{ active: mode === 'random' }" @click="setMode('random')">{{ t('common.random') }}</button>
      </div>
      <button class="next-btn" :disabled="!canShowPrevious" @click="showPreviousCard">{{ t('common.previous') }}</button>
      <button class="next-btn" @click="handleShowNext">{{ t(nextButtonKey) }}</button>
    </div>
    <p class="technique-indicator" :class="{ success: showSuccessAnimation }" v-if="currentCard">
      {{ t('common.techniqueNumberOf', { current: techniqueNumber, total: totalTechniques }) }}
      <span class="success-chip" v-if="showSuccessAnimation">{{ t('common.completed') }}</span>
    </p>
    <div class="content" v-if="currentCard">
      <div class="flip-card-wrapper" @click="isFlipped = !isFlipped">
        <div class="flip-card" :class="{ 'is-flipped': isFlipped }">
          <div class="flip-card-inner">
            <div class="flip-card-face flip-card-front">
              <ImageCard
                :key="`${mode}-${currentCard.position}-${cardRenderKey}-front`"
                :id="String(currentCard.position)"
                :caption="currentCard.caption"
                :src="currentCard.src"
                :alt="currentCard.alt"
                aspect-ratio="1/1"
              />
            </div>
            <div class="flip-card-face flip-card-back">
              <div class="card-badge">{{ t('flipCard.answer') }}</div>
              <p class="card-content">{{ currentCard.alt }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ImageCard from '../components/ImageCard.vue'
import { useTechniqueSession } from '../composables/useTechniqueSession'
import animalsCsvRaw from '../../animals.csv?raw'

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()

const animalImages = import.meta.glob('../assets/animals/*.webp', { eager: true, query: '?url', import: 'default' })

const parseAnimals = (csvRaw: string) => {
  const lines = csvRaw.split(/\r?\n/).filter((line) => line.trim().length > 0)

  return lines.slice(1).map((line, index) => {
    const columns = line.split(',')
    const position = Number(columns[0]?.trim()) || index + 1
    const caption = columns[1]?.trim() || ''
    const description = columns.slice(2).join(',').trim()
    const imagePath = Object.keys(animalImages).find((path) => path.endsWith(`/${position}.webp`))

    return {
      position,
      caption,
      alt: description,
      src: imagePath ? (animalImages[imagePath] as string) : null,
    }
  })
}

interface AnimalCard {
  position: number
  caption: string
  alt: string
  src: string | null
}

const animals = parseAnimals(animalsCsvRaw)
const csvForSession = ['position,name,description', ...animals.map((animal) => `${animal.position},${animal.caption},${animal.alt}`)].join('\n')

const {
  mode,
  currentCard: rawCurrentCard,
  cardRenderKey,
  techniqueNumber,
  showSuccessAnimation,
  totalTechniques,
  nextButtonKey,
  canShowPrevious,
  setMode,
  showNextCard,
  showPreviousCard
} = useTechniqueSession(csvForSession)

const currentCard = computed<AnimalCard | null>(() => {
  const rawCard = rawCurrentCard.value
  if (!rawCard) {
    return null
  }

  const found = animals.find((animal) => animal.position === rawCard.position)
  return found ?? null
})

const isFlipped = ref(false)

const handleShowNext = () => {
  isFlipped.value = false
  showNextCard()
}
</script>

<style scoped>
.animals-view {
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

.flip-card-wrapper {
  perspective: 1000px;
  cursor: pointer;
  width: 100%;
  max-width: 500px;
  -webkit-tap-highlight-color: transparent;
}

.flip-card {
  width: 100%;
  aspect-ratio: 1 / 1;
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

.flip-card-front .image-card {
  box-shadow: none;
  border: none;
  padding: 0;
  max-width: none;
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
</style>
