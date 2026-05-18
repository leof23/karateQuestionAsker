<template>
  <div class="language-selector">
    <label for="language-select" class="label">{{ t('common.language') }}</label>
    <select id="language-select" class="select" v-model="selectedLocale">
      <option value="en">{{ t('languages.english') }}</option>
      <option value="es">{{ t('languages.spanish') }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale, type AppLocale } from '../i18n'

const { locale, t } = useI18n({ useScope: 'global' })

const selectedLocale = computed<AppLocale>({
  get: () => (locale.value === 'es' ? 'es' : 'en'),
  set: (value) => {
    setLocale(value)
  }
})
</script>

<style scoped>
.language-selector {
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.label {
  font-size: 0.875rem;
  color: #64748b;
}

.select {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background-color: #fff;
  color: #0f172a;
  padding: 0.35rem 0.5rem;
  font-size: 0.875rem;
}
</style>
