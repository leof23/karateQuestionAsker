<template>
  <div class="home">
    <LanguageSelector />
    <div class="header">
      <h1 class="title">{{ t('home.title') }}</h1>
      <p class="subtitle">{{ t('home.subtitle') }}</p>
    </div>
    <div class="grid">
      <button class="category-card" @click="router.push('/vocabulary')">
        <span class="card-title">{{ t('home.cards.vocabulary.title') }}</span>
        <span class="card-desc">{{ t('home.cards.vocabulary.desc') }}</span>
      </button>
      <button class="category-card" @click="router.push('/karatedowasa')">
        <span class="card-title">{{ t('home.cards.karatedowasa.title') }}</span>
        <span class="card-desc">{{ t('home.cards.karatedowasa.desc') }}</span>
      </button>
      <button class="category-card" @click="router.push('/zuki')">
        <span class="card-title">{{ t('home.cards.zuki.title') }}</span>
        <span class="card-desc">{{ t('home.cards.zuki.desc') }}</span>
      </button>
      <button class="category-card" @click="router.push('/uke')">
        <span class="card-title">{{ t('home.cards.uke.title') }}</span>
        <span class="card-desc">{{ t('home.cards.uke.desc') }}</span>
      </button>
      <button class="category-card" @click="router.push('/geri')">
        <span class="card-title">{{ t('home.cards.geri.title') }}</span>
        <span class="card-desc">{{ t('home.cards.geri.desc') }}</span>
      </button>
      <button class="category-card" @click="router.push('/ibukiwasa')">
        <span class="card-title">{{ t('home.cards.ibukiwasa.title') }}</span>
        <span class="card-desc">{{ t('home.cards.ibukiwasa.desc') }}</span>
      </button>
      <button class="category-card" @click="router.push('/kumitewasa')">
        <span class="card-title">{{ t('home.cards.kumitewasa.title') }}</span>
        <span class="card-desc">{{ t('home.cards.kumitewasa.desc') }}</span>
      </button>
      <button class="category-card" @click="router.push('/dachi')">
        <span class="card-title">{{ t('home.cards.dachi.title') }}</span>
        <span class="card-desc">{{ t('home.cards.dachi.desc') }}</span>
      </button>
      <button class="category-card" @click="router.push('/unsoku')">
        <span class="card-title">{{ t('home.cards.unsoku.title') }}</span>
        <span class="card-desc">{{ t('home.cards.unsoku.desc') }}</span>
      </button>
      <button class="category-card" @click="router.push('/numbers')">
        <span class="card-title">{{ t('home.cards.numbers.title') }}</span>
        <span class="card-desc">{{ t('home.cards.numbers.desc') }}</span>
      </button>
      <button class="category-card" @click="router.push('/dojokun')">
        <span class="card-title">{{ t('home.cards.dojokun.title') }}</span>
        <span class="card-desc">{{ t('home.cards.dojokun.desc') }}</span>
      </button>
      <button class="category-card" @click="router.push('/animals')">
        <span class="card-title">{{ t('home.cards.animals.title') }}</span>
        <span class="card-desc">{{ t('home.cards.animals.desc') }}</span>
      </button>
      <button class="category-card" @click="router.push('/emblem')">
        <span class="card-title">{{ t('home.cards.emblem.title') }}</span>
        <span class="card-desc">{{ t('home.cards.emblem.desc') }}</span>
      </button>
      <button class="category-card" @click="router.push('/kata-names')">
        <span class="card-title">{{ t('home.cards.kataNames.title') }}</span>
        <span class="card-desc">{{ t('home.cards.kataNames.desc') }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import LanguageSelector from '../components/LanguageSelector.vue'

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  width: 100%;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5rem;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-color: #cbd5e1;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.card-desc {
  font-size: 0.875rem;
  color: #64748b;
}
</style>