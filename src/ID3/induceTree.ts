import { DataFrame } from 'danfojs-node'
import { getInformationGain } from '../utils/informationGain';
import { Node } from '../Node';

function getInformationGainByProperty(sampleSet: DataFrame, className: string) {
  const classValues = sampleSet.column(className).values as string[];
  const IGByProperty: any = {};

  for (const property of sampleSet.columns as string) {
    if (property !== className) {
      const newSamplesSet = sampleSet.column(property).values as string[];

      if(newSamplesSet) {
        IGByProperty[property] = getInformationGain(newSamplesSet, classValues);
      }
    }
  }

  return IGByProperty;
}

interface InformationGain {
  propertyName?: string;
  gain: number;
}

function getBestProperty(sampleSet: DataFrame, className: string) {
  const ig: InformationGain = {
    gain: 0
  }
  const IGByProperty = getInformationGainByProperty(sampleSet, className)
  for (const property in IGByProperty) {
    const propertyInfoGain = IGByProperty[property];

    if (propertyInfoGain > ig.gain){
      ig.propertyName = property;
      ig.gain = propertyInfoGain;
    }
  }

  if(ig.propertyName) {
    return ig.propertyName;
  } else {
    throw new Error('failed to get best property')
  }
}

function induceTree(sampleSet: DataFrame, className: string, properties: string[]): Node {
  const actualProperties = [...properties]

  // if all elements in the samples set belongs to the same class
  // a leaf node is returned
  if(sampleSet.column(className).unique().values.length === 1) {
    const data = sampleSet.column(className).unique().values;

    if(data) {
      const node = new Node(`${className} is: ${data[0]}`);

      return node;
    }
  }

  // if the properties are empty, a leaf node is returned 
  // with the disjunction of all classes
  if(actualProperties.length === 0) {
    let disjunction = ''

    for(const label of sampleSet.column(className).unique().values) {
      disjunction ? disjunction = `${disjunction} OR ${label}` : disjunction = label
    }

    const node = new Node(`${className} is: ${disjunction}`);

    return node;
  } else {
    const bestProperty = getBestProperty(sampleSet, className)

    const node = new Node(bestProperty)
    const bestPropertyIndex = actualProperties.indexOf(bestProperty)

    // remove bestProperty from currentProperties
    actualProperties.splice(bestPropertyIndex, 1)

    const bestPropertyUniqueValues = sampleSet.column(bestProperty).unique().values
    for (const label of bestPropertyUniqueValues) {
      const edge = node.addEdge(label)

      const samplesSetPartition = sampleSet.query({ "column": bestProperty, "is": "==", "to": label })
      const subNode = induceTree(samplesSetPartition, className, actualProperties)

      if(subNode) {
        edge.setDestination(subNode)
      }
    }

    return node
  }
}

export { induceTree }
