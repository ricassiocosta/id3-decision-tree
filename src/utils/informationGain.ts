// calculates the total information gain of a set based on a class set
function getInformationGain(sampleSet: string[], classValuesSampleSet: string[]) {
  const totalEntropy = getTotalEntropy(classValuesSampleSet)
  const obtainedEntropy = getSampleSetEntropy(sampleSet, classValuesSampleSet)

  const informationGain = totalEntropy - obtainedEntropy

  console.log('______________________________')
  console.log('total entropy:', totalEntropy)
  console.log('sampleSet:', sampleSet)
  console.log('classValuesSampleSet:', classValuesSampleSet)
  console.log('information gain:', informationGain)
  console.log('obtainedEntropy:', obtainedEntropy)
  console.log('______________________________')

  return informationGain
}

// calculates the total entropy for a given sample set
function getTotalEntropy(sampleSet: string[]) {
  let entropy = 0
  const sampleSetValues: any = {};
  sampleSet.forEach(value => {
    if (!(value in sampleSetValues))
      sampleSetValues[value] = 0
    sampleSetValues[value] += 1
  })

  for (const value in sampleSetValues) {
    const occurrences = sampleSetValues[value]
    const probability = occurrences/sampleSet.length
    entropy += -(probability * Math.log2(probability))
  }

  return entropy
}

// calculates the obtained entropy of an sample set, based on a class set.
function getSampleSetEntropy(sampleSet: string[], classValuesSampleSet: string[]) {
  const { classValueOccurrencesBySampleSetValue, sampleSetValueOccurrences} = getOccurrences(sampleSet, classValuesSampleSet)
  const sampleSetValueEntropy: any = {};
  const sampleSetValueProbability: any = {};

  for (const sampleSetValue in classValueOccurrencesBySampleSetValue) {
    if (!(sampleSetValue in sampleSetValueEntropy)) {
      sampleSetValueEntropy[sampleSetValue] = 0
    }

    let classValueTotalOccurrence = 0
    let entropy = 0
    for (const classValue in classValueOccurrencesBySampleSetValue[sampleSetValue]) {
      const classValueOccurrence = classValueOccurrencesBySampleSetValue[sampleSetValue][classValue]
      classValueTotalOccurrence += classValueOccurrence
      const probability = classValueOccurrence/sampleSetValueOccurrences[sampleSetValue]
      entropy += - (probability * Math.log2(probability))
    }

    sampleSetValueProbability[sampleSetValue] = classValueTotalOccurrence/sampleSet.length
    sampleSetValueEntropy[sampleSetValue] = entropy
  }

  let obtainedEntropy = 0
  for (const value in sampleSetValueEntropy) {
    obtainedEntropy +=  sampleSetValueProbability[value] * sampleSetValueEntropy[value]
  }

  return obtainedEntropy
}

// counts the number of occurrences each sample set value and the occurrence of class values for each sample set value 
function getOccurrences(sampleSet: string[], classValuesSampleSet: string[]) {
  const classValueOccurrencesBySampleSetValue: any = {};
  const sampleSetValueOccurrences: any = {};

  sampleSet.forEach((value, index) => {
    const classValue = classValuesSampleSet[index]

    if (!(value in classValueOccurrencesBySampleSetValue)) {
      classValueOccurrencesBySampleSetValue[value] = {}
    }

    if (!(classValue in classValueOccurrencesBySampleSetValue[value])) {
      classValueOccurrencesBySampleSetValue[value][classValue] = 0;
    }

    classValueOccurrencesBySampleSetValue[value][classValue] += 1

    if (!(value in sampleSetValueOccurrences)) {
      sampleSetValueOccurrences[value] = 0;
    }

    sampleSetValueOccurrences[value] += 1
  })

  return { classValueOccurrencesBySampleSetValue, sampleSetValueOccurrences}
}

export { getInformationGain }
