function calculateInformationGain(samplesSet: string[], targetSamplesSet: string[]) {
  const { entropy, entropiesOptions, probabilities } = getEntropy(samplesSet, targetSamplesSet)

  let informationGain = entropy
  for (const currentEntropy in entropiesOptions) {
    informationGain += - (probabilities[currentEntropy] * entropiesOptions[currentEntropy])
  }

  return informationGain
}

function getEntropy(samplesSet: string[], targetSamplesSet: string[]) {
  let entropy = 0;
  const entropiesOptions: any = {};
  const currentOccurrences: any = {};
  const noCurrentOccurrences: any = {};
  const targetOccurrences: any = {};
  const probabilities: any = {};

  samplesSet.forEach((value, index) => {
    const targetValue = targetSamplesSet[index]

    if (!(value in currentOccurrences)){
      currentOccurrences[value] = {}
    }

    if (!(targetValue in currentOccurrences[value]))
      currentOccurrences[value][targetValue] = 0;

    currentOccurrences[value][targetValue] += 1

    if (!(value in noCurrentOccurrences))
      noCurrentOccurrences[value] = 0;

    noCurrentOccurrences[value] += 1
  })

  targetSamplesSet.forEach(value => {
    if (!(value in targetOccurrences))
      targetOccurrences[value] = 0
    targetOccurrences[value] += 1
  })

  const noOccurrences = targetSamplesSet.length

  for (const occurrences in targetOccurrences) {
    const occurrenceValue = targetOccurrences[occurrences]
    const probability = occurrenceValue/noOccurrences
    entropy += -(probability * Math.log2(probability))
  }

  for (const currentOccurrence in currentOccurrences) {
    let entropyOption = 0
    let totalNoOption = 0

    if (!(currentOccurrence in entropiesOptions))
      entropiesOptions[currentOccurrence] = 0

    for (const currentOption in currentOccurrences[currentOccurrence]) {
      const noOption = currentOccurrences[currentOccurrence][currentOption]
      totalNoOption += noOption
      const probability = noOption/noCurrentOccurrences[currentOccurrence]
      entropyOption += - (probability * Math.log2(probability))
    }

    probabilities[currentOccurrence] = totalNoOption/samplesSet.length
    entropiesOptions[currentOccurrence] = entropyOption
  }

  return { entropy, entropiesOptions, probabilities }
}


export {getEntropy, calculateInformationGain}
