// calculates the total information gain of a set based on a class set
function getInformationGain(goalSampleSet: string[], classValuesSampleSet: string[]) {
  const sampleSetEntropy = getTotalEntropy(classValuesSampleSet)
  const obtainedEntropy = getGoalSampleSetEntropy(goalSampleSet, classValuesSampleSet)

  const informationGain = sampleSetEntropy - obtainedEntropy

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
function getGoalSampleSetEntropy(goalSampleSet: string[], classValuesSampleSet: string[]) {
  const { classOccurrencesByGoalValue, goalOccurrences} = getSampleSetOccurrences(goalSampleSet, classValuesSampleSet)
  const sampleSetGoalValueEntropy: any = {};
  const sampleSetValueProbability: any = {};

  for (const goalValue in classOccurrencesByGoalValue) {
    if (!(goalValue in sampleSetGoalValueEntropy)) {
      sampleSetGoalValueEntropy[goalValue] = 0
    }

    let classValueTotalOccurrence = 0
    let goalValueEntropy = 0
    for (const classValue in classOccurrencesByGoalValue[goalValue]) {
      const classValueOccurrence = classOccurrencesByGoalValue[goalValue][classValue]
      classValueTotalOccurrence += classValueOccurrence
      const probability = classValueOccurrence/goalOccurrences[goalValue]
      goalValueEntropy += - (probability * Math.log2(probability))
    }

    sampleSetValueProbability[goalValue] = classValueTotalOccurrence/goalSampleSet.length
    sampleSetGoalValueEntropy[goalValue] = goalValueEntropy
  }

  let obtainedEntropy = 0
  for (const value in sampleSetGoalValueEntropy) {
    obtainedEntropy +=  sampleSetValueProbability[value] * sampleSetGoalValueEntropy[value]
  }

  return obtainedEntropy
}

// counts the number of occurrences of goal values and the occurrence of class values for each goal value 
function getSampleSetOccurrences(goalSampleSet: string[], classValuesSampleSet: string[]) {
  const classOccurrencesByGoalValue: any = {};
  const goalOccurrences: any = {};

  goalSampleSet.forEach((value, index) => {
    const classValue = classValuesSampleSet[index]

    if (!(value in classOccurrencesByGoalValue)) {
      classOccurrencesByGoalValue[value] = {}
    }

    if (!(classValue in classOccurrencesByGoalValue[value])) {
      classOccurrencesByGoalValue[value][classValue] = 0;
    }

    classOccurrencesByGoalValue[value][classValue] += 1

    if (!(value in goalOccurrences)) {
      goalOccurrences[value] = 0;
    }

    goalOccurrences[value] += 1
  })

  return { classOccurrencesByGoalValue, goalOccurrences}
}

export { getInformationGain }
