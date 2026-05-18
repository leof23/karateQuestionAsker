<template>
  <ul class="numbers-grid">
    <li v-for="item in numbers" :key="item.value" class="number-card">
      <span class="numeral">{{ item.value }}</span>
      <span class="kanji">{{ item.kanji }}</span>
      <span class="romaji">{{ item.romaji }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface NumberItem {
  value: number
  kanji: string
  romaji: string
}

const numbers: NumberItem[] = [
  { value: 1, kanji: '一', romaji: 'ichi' },
  { value: 2, kanji: '二', romaji: 'ni' },
  { value: 3, kanji: '三', romaji: 'san' },
  { value: 4, kanji: '四', romaji: 'shi' },
  { value: 5, kanji: '五', romaji: 'go' },
  { value: 6, kanji: '六', romaji: 'roku' },
  { value: 7, kanji: '七', romaji: 'shichi' },
  { value: 8, kanji: '八', romaji: 'hachi' },
  { value: 9, kanji: '九', romaji: 'kyuu' },
  { value: 10, kanji: '十', romaji: 'juu' },
  { value: 11, kanji: '十一', romaji: 'juu-ichi' },
  { value: 12, kanji: '十二', romaji: 'juu-ni' },
  { value: 13, kanji: '十三', romaji: 'juu-san' },
  { value: 14, kanji: '十四', romaji: 'juu-shi' },
  { value: 15, kanji: '十五', romaji: 'juu-go' },
  { value: 16, kanji: '十六', romaji: 'juu-roku' },
  { value: 17, kanji: '十七', romaji: 'juu-shichi' },
  { value: 18, kanji: '十八', romaji: 'juu-hachi' },
  { value: 19, kanji: '十九', romaji: 'juu-kyuu' },
  { value: 20, kanji: '二十', romaji: 'ni-juu' }
]
</script>

<style scoped>
.numbers-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.number-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  padding: 1rem 0.5rem;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.numeral {
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1;
}

.kanji {
  font-size: 1.5rem;
  color: #1e293b;
  margin-top: 0.5rem;
  line-height: 1;
}

.romaji {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.25rem;
}

@media (max-width: 640px) {
  .numbers-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
