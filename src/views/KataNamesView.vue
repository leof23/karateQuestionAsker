<template>
  <div class="kata-names-view">
    <div class="header">
      <button class="back-btn" @click="router.push('/')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        {{ t('common.back') }}
      </button>
      <div class="title-container">
        <h2 class="view-title">{{ t('kataNames.title') }}</h2>
        <span class="view-subtitle">{{ t('kataNames.subtitle') }}</span>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="kata-table">
        <thead>
          <tr>
            <th class="col-wkf" scope="col">{{ t('kataNames.columns.wkf') }}</th>
            <th class="col-name" scope="col">{{ t('kataNames.columns.name') }}</th>
            <th class="col-translation" scope="col">{{ t('kataNames.columns.translation') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="`${row.wkf}-${row.name}`">
            <td class="col-wkf">{{ row.wkf }}</td>
            <td class="col-name">{{ row.name }}</td>
            <td class="col-translation">{{ row.translation }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { parseCsvRows } from '../composables/parseCsv'
import kataNamesCsvRaw from '../../kataNames.csv?raw'

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()

type KataRow = {
  wkf: string
  name: string
  translation: string
}

const parsed = parseCsvRows(kataNamesCsvRaw)
const rows: KataRow[] = parsed.slice(1).map((columns) => {
  const [wkf = '', name = '', ...translationParts] = columns
  return {
    wkf: wkf.trim(),
    name: name.trim(),
    translation: translationParts.join(',').trim()
  }
})
</script>

<style scoped>
.kata-names-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
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

.table-wrapper {
  overflow-x: auto;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.kata-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.kata-table th,
.kata-table td {
  text-align: left;
  padding: 0.625rem 0.875rem;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: top;
}

.kata-table thead th {
  background: #f8fafc;
  color: #0f172a;
  font-weight: 700;
  position: sticky;
  top: 0;
}

.kata-table tbody tr:last-child td {
  border-bottom: none;
}

.col-wkf {
  width: 96px;
  white-space: nowrap;
  color: #475569;
}

.col-name {
  width: 230px;
  font-weight: 600;
  color: #1e293b;
}

.col-translation {
  color: #475569;
}
</style>
