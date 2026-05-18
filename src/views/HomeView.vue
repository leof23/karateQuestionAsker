<template>
  <div class="home">
    <div class="header">
      <h1 class="title">Karate Knowledge</h1>
      <p class="subtitle">Select a category to practice</p>
    </div>
    <div class="grid">
      <button class="category-card" @click="router.push('/zuki')">
        <span class="card-title">Zuki Wasa</span>
        <span class="card-desc">Punching Techniques</span>
      </button>
      <button class="category-card" @click="router.push('/uke')">
        <span class="card-title">Uke Wasa</span>
        <span class="card-desc">Blocking Techniques</span>
      </button>
      <button class="category-card" @click="router.push('/geri')">
        <span class="card-title">Geri Wasa</span>
        <span class="card-desc">Kicking Techniques</span>
      </button>
      <button class="category-card" @click="router.push('/dachi')">
        <span class="card-title">Dachi Wasa</span>
        <span class="card-desc">Stances</span>
      </button>
      <button class="category-card" @click="router.push('/vocabulary')">
        <span class="card-title">Vocabulary</span>
        <span class="card-desc">Karate Vocabulary</span>
      </button>
      <button class="category-card" @click="router.push('/ibukiwasa')">
        <span class="card-title">Ibuki Wasa</span>
        <span class="card-desc">Breathing Techniques</span>
      </button>
      <button class="category-card" @click="router.push('/karatedowasa')">
        <span class="card-title">Karate Do Wasa</span>
        <span class="card-desc">Technique Categories</span>
      </button>
      <button class="category-card" @click="router.push('/kumitewasa')">
        <span class="card-title">Kumite Wasa</span>
        <span class="card-desc">Sparring Techniques</span>
      </button>
      <button class="category-card" @click="router.push('/unsoku')">
        <span class="card-title">Unsoku</span>
        <span class="card-desc">Footwork Concepts</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
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