import { computed, ref } from 'vue'
import { parseCsvRows } from './parseCsv'

type ViewMode = 'list' | 'random'

type TechniqueCard = {
  position: number
  question: string
  answer: string
}

const parseTechniqueCards = (csvRaw: string) => {
  const rows = parseCsvRows(csvRaw)

  return rows.slice(1).map((columns, index) => {
    const [position = '', name = '', ...descriptionParts] = columns
    const parsedPosition = Number(position.trim())

    return {
      position: Number.isFinite(parsedPosition) ? parsedPosition : index + 1,
      question: name.trim(),
      answer: descriptionParts.join(',').trim()
    }
  })
}

export const useTechniqueSession = (csvRaw: string) => {
  const cards = computed<TechniqueCard[]>(() => parseTechniqueCards(csvRaw))
  const totalTechniques = computed(() => cards.value.length)

  const mode = ref<ViewMode>('list')
  const currentIndex = ref(0)
  const cardRenderKey = ref(0)
  const techniqueNumber = ref(1)
  const showSuccessAnimation = ref(false)
  const isCompleted = ref(false)
  const remainingRandomIndices = ref<number[]>([])
  const historyIndices = ref<number[]>([0])
  const historyPointer = ref(0)

  const currentCard = computed(() => {
    if (cards.value.length === 0) {
      return null
    }

    return cards.value[currentIndex.value]
  })

  const nextButtonKey = computed(() => (isCompleted.value ? 'common.replay' : 'common.showNextCard'))
  const canShowPrevious = computed(() => historyPointer.value > 0)

  const setMode = (nextMode: ViewMode) => {
    mode.value = nextMode
    currentIndex.value = 0
    techniqueNumber.value = 1
    showSuccessAnimation.value = false
    isCompleted.value = false
    remainingRandomIndices.value = []
    historyIndices.value = [0]
    historyPointer.value = 0
    cardRenderKey.value += 1
  }

  const showNextCard = () => {
    if (cards.value.length === 0) {
      return
    }

    if (isCompleted.value) {
      isCompleted.value = false
      showSuccessAnimation.value = false
    }

    let nextIndex = currentIndex.value
    const hasForwardHistory = historyPointer.value < historyIndices.value.length - 1

    if (hasForwardHistory) {
      historyPointer.value += 1
      nextIndex = historyIndices.value[historyPointer.value]
    } else {
      if (mode.value === 'list') {
        nextIndex = (currentIndex.value + 1) % cards.value.length
      } else {
        if (remainingRandomIndices.value.length === 0) {
          remainingRandomIndices.value = cards.value
            .map((_, index) => index)
            .filter((index) => index !== currentIndex.value)
        }

        if (remainingRandomIndices.value.length > 0) {
          const randomPoolIndex = Math.floor(Math.random() * remainingRandomIndices.value.length)
          const [selectedIndex] = remainingRandomIndices.value.splice(randomPoolIndex, 1)
          nextIndex = selectedIndex
        }
      }

      historyIndices.value.push(nextIndex)
      historyPointer.value += 1
    }

    currentIndex.value = nextIndex

    techniqueNumber.value = (techniqueNumber.value % cards.value.length) + 1

    if (techniqueNumber.value === totalTechniques.value) {
      showSuccessAnimation.value = true
      isCompleted.value = true
      remainingRandomIndices.value = []
    }

    cardRenderKey.value += 1
  }

  const showPreviousCard = () => {
    if (cards.value.length === 0 || historyPointer.value === 0) {
      return
    }

    historyPointer.value -= 1
    currentIndex.value = historyIndices.value[historyPointer.value]
    techniqueNumber.value = techniqueNumber.value <= 1 ? cards.value.length : techniqueNumber.value - 1
    showSuccessAnimation.value = false
    isCompleted.value = false
    cardRenderKey.value += 1
  }

  return {
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
  }
}
