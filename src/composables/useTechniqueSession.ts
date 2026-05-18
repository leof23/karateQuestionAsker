import { computed, ref } from 'vue'

type ViewMode = 'list' | 'random'

type TechniqueCard = {
  position: number
  question: string
  answer: string
}

const parseCsvLine = (line: string) => {
  const values: string[] = []
  let current = ''
  let isQuoted = false

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index]

    if (char === '"') {
      const nextChar = line[index + 1]
      if (isQuoted && nextChar === '"') {
        current += '"'
        index += 1
      } else {
        isQuoted = !isQuoted
      }
      continue
    }

    if (char === ',' && !isQuoted) {
      values.push(current)
      current = ''
      continue
    }

    current += char
  }

  values.push(current)
  return values
}

const parseTechniqueCards = (csvRaw: string) => {
  const lines = csvRaw.split(/\r?\n/).filter((line) => line.trim().length > 0)

  return lines.slice(1).map((line, index) => {
    const columns = parseCsvLine(line)
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

  const nextButtonText = computed(() => (isCompleted.value ? 'Replay' : 'Show Next Card'))
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

    if (historyPointer.value < historyIndices.value.length - 1) {
      historyIndices.value = historyIndices.value.slice(0, historyPointer.value + 1)
    }

    historyIndices.value.push(nextIndex)
    historyPointer.value += 1
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
    nextButtonText,
    canShowPrevious,
    setMode,
    showNextCard,
    showPreviousCard
  }
}
