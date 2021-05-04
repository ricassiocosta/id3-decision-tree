// mensura a quantidade de informação possível de extrair de uma propriedade. É obtido por meio de 
// comparação
function calculateInformationGain(samplesSet: string[], targetSamplesSet: string[]) {
  // entropia mede o caos de um conjunto
  // base: entropia de toda uma coluna específica menos a entropia de cada
  // subárvore (partições que correpondem às linhas que tem um determinado valor de uma det. propriedade) 
  const { entropy, entropiesOptions, probabilities } = getEntropy(samplesSet, targetSamplesSet)

  // entropia de toda uma coluna específica (exemplo, pra HC, pra GA...)
  let informationGain = entropy
  console.log('informationGain', informationGain)
  // entropiesOptions é a entropia de cada coluna, para cada um de seus possíveis valores
  console.log('entropiesOptions', entropiesOptions)
  for (const currentEntropy in entropiesOptions) {
    // propabilidade de ocorrer cada um multiplicada pela entropia do subset
    informationGain += - (probabilities[currentEntropy] * entropiesOptions[currentEntropy])
  }

  return informationGain
}

function getEntropy(samplesSet: string[], targetSamplesSet: string[]) {
  let entropy = 0; // entropia correspondente a um conjunto homogêneo
  const entropiesOptions: any = {};
  const occurrencesQuantityByPossibleValue: any = {};
  const currentOccurrencesQuantity: any = {};
  const possibleClassValues: any = {}; // ocorrências possíveis da classe
  const probabilities: any = {}; // probalidades de toda uma coluna, desconsiderando dos possíveis valores

  // faz a contagem de cada possibilidade
  samplesSet.forEach((value, index) => {
    const targetValue = targetSamplesSet[index]

    if (!(value in occurrencesQuantityByPossibleValue)){
      occurrencesQuantityByPossibleValue[value] = {}
    }

    if (!(targetValue in occurrencesQuantityByPossibleValue[value]))
      occurrencesQuantityByPossibleValue[value][targetValue] = 0;

    occurrencesQuantityByPossibleValue[value][targetValue] += 1

    if (!(value in currentOccurrencesQuantity))
      currentOccurrencesQuantity[value] = 0;

    currentOccurrencesQuantity[value] += 1
  })

  targetSamplesSet.forEach(value => {
    if (!(value in possibleClassValues))
      possibleClassValues[value] = 0
    possibleClassValues[value] += 1
  })

  const occurrencesQuantity = targetSamplesSet.length

  // calcula a entropia geral da coluna, desconsiderando a entropia de cada possibilidade
  // todas as colunas, não divindo o HC, por exemplo, nas possibilidade, considerando como um só
  for (const occurrences in possibleClassValues) {
    const occurrenceValue = possibleClassValues[occurrences]
    const probability = occurrenceValue/occurrencesQuantity
    entropy += -(probability * Math.log2(probability))
  }

  // calcula a entropia de cada partição, considerando cada possibilidade
  for (const currentOccurrence in occurrencesQuantityByPossibleValue) {
    let entropyOption = 0
    let totalNoOption = 0

    if (!(currentOccurrence in entropiesOptions))
      entropiesOptions[currentOccurrence] = 0

    for (const currentOption in occurrencesQuantityByPossibleValue[currentOccurrence]) {
      const noOption = occurrencesQuantityByPossibleValue[currentOccurrence][currentOption]
      totalNoOption += noOption
      const probability = noOption/currentOccurrencesQuantity[currentOccurrence]
      entropyOption += - (probability * Math.log2(probability))
    }

    probabilities[currentOccurrence] = totalNoOption/samplesSet.length
    entropiesOptions[currentOccurrence] = entropyOption
  }

  console.log('entropiesOptions', entropiesOptions)
  console.log('currentOccurrences', occurrencesQuantityByPossibleValue) 
  console.log('currentOccurrencesQuantity', currentOccurrencesQuantity)
  console.log('possibleClassValues', possibleClassValues) 
  console.log('probabilities', probabilities)

  return { entropy, entropiesOptions, probabilities }
}


export {getEntropy, calculateInformationGain}
