import { calculateInformationGain } from '../utils/informationGain';
import { Node } from '../Node';

function getInformationGainByProperty(goalSampleSet: any) {
  const classValues = goalSampleSet.column('risk').values as string[];
  const IGByProperty: any = {};

  for (const property of goalSampleSet.columns as string) {
    if (property !== 'risk') {
      const newSamplesSet = goalSampleSet.column(property).values as string[];

      if(newSamplesSet) {
        IGByProperty[property] = calculateInformationGain(newSamplesSet, classValues);
      }
    }
  }

  return IGByProperty;
}

interface InformationGain {
  propertyName?: string;
  gain: number;
}

function getBestProperty(goalSampleSet: any) {
  const ig: InformationGain = {
    gain: 0
  }

  const IGByProperty = getInformationGainByProperty(goalSampleSet)
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

function induceTree(goalSampleSet: any, className: string, properties: string[]): Node {
  const actualProperties = [...properties]

  // if all elements in the samples set belongs to the same class
  // a leaf node is returned
  if(goalSampleSet.column(className).unique().values.length === 1) {
    const data = goalSampleSet.column(className).unique().values;

    if(data) {
      const node = new Node(`Risk is: ${data[0]}`);

      return node;
    }
  }

  // if the properties are empty, a leaf node is returned 
  // with the disjunction of all classes
  if(actualProperties.length === 0) {
    const node = new Node('Risk is: High or Moderate or Low');

    return node;
  } else {
    const bestProperty = getBestProperty(goalSampleSet)

    const node = new Node(bestProperty)
    const bestPropertyIndex = actualProperties.indexOf(bestProperty)

    // remove bestProperty from currentProperties
    actualProperties.splice(bestPropertyIndex, 1)

    const bestPropertyUniqueValues = goalSampleSet.column(bestProperty).unique().values
    for (const label of bestPropertyUniqueValues) {
      const edge = node.addEdge(label)

      const samplesSetPartition = goalSampleSet.query({ "column": bestProperty, "is": "==", "to": label })
      const subNode = induceTree(samplesSetPartition, className, actualProperties)

      if(subNode) {
        edge.setDestination(subNode)
      }
    }

    return node
  }
}

export { induceTree }
