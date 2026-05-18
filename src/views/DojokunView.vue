<template>
  <div class="dojokun-view">
    <div class="header">
      <button class="back-btn" @click="router.push('/')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        {{ t('common.back') }}
      </button>
      <div class="title-container">
        <h2 class="view-title">{{ t('home.cards.dojokun.title') }}</h2>
        <span class="view-subtitle">{{ t('home.cards.dojokun.desc') }}</span>
      </div>
    </div>

    <div class="content" :aria-label="t('home.cards.dojokun.title')">
      <div class="inner">
        <header class="oath-header">
          <h1 class="kanji">道場訓</h1>
          <p class="romaji">DŌJŌ KUN</p>
          <span class="hairline" aria-hidden="true"></span>
        </header>

        <ol class="phrases">
          <li v-for="(phrase, idx) in phrases" :key="idx" class="phrase">
            <span class="counter">{{ counters[idx] ?? `${idx + 1}.` }}</span>
            <span class="text">{{ phrase }}</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import dojokunRaw from '../../dojokun.txt?raw'

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()

const phrases = computed<string[]>(() =>
  dojokunRaw
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0),
)

const counters = ['一、', '二、', '三、', '四、', '五、', '六、', '七、', '八、', '九、', '十、']
</script>

<style scoped>
.dojokun-view {
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

.content {
  display: flex;
  justify-content: center;
}

.inner {
  width: 100%;
  max-width: 600px;
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.oath-header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.kanji {
  font-family: 'Noto Serif JP', 'Hiragino Mincho ProN', 'Yu Mincho', serif;
  font-size: 2.5rem;
  font-weight: 600;
  color: #0f172a;
  letter-spacing: 0.4em;
  margin: 0 0 0.5rem 0;
}

.romaji {
  font-family: Georgia, 'Noto Serif JP', serif;
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #64748b;
  margin: 0 0 1.25rem 0;
}

.hairline {
  display: block;
  width: 60px;
  height: 2px;
  background-color: #e2e8f0;
  margin: 0 auto;
}

.phrases {
  list-style: none;
  margin: 0;
  padding: 0;
}

.phrase {
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  align-items: baseline;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f1f5f9;
  font-size: 1.15rem;
  line-height: 1.8;
  color: #334155;
}

.phrase:last-child {
  border-bottom: none;
}

.counter {
  font-family: 'Noto Serif JP', 'Hiragino Mincho ProN', serif;
  color: #0f172a;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.text {
  font-style: italic;
}

@media (max-width: 540px) {
  .inner {
    padding: 1.5rem 1rem;
  }

  .kanji {
    font-size: 2rem;
    letter-spacing: 0.3em;
  }

  .phrase {
    grid-template-columns: 2rem 1fr;
    font-size: 1rem;
  }
}
</style>
