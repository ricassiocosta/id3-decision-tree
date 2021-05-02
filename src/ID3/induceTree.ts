import { calculateInformationGain } from '../utils/informationGain';
import { Node } from '../Node';

function getInformationGainByProperty(dataSet: any) {
  const classValues = dataSet.column('risk').values as string[];
  const IGByProperty: any = {};

  for (const property of dataSet.columns as string) {
    if (property !== 'risk') {
      const newDataSet = dataSet.column(property).values as string[];

      if(newDataSet) {
        IGByProperty[property] = calculateInformationGain(newDataSet, classValues);
      }
    }
  }

  return IGByProperty;
}

interface InformationGain {
  propertyName?: string;
  gain: number;
}

function getBestProperty(dataSet: any) {
  const ig: InformationGain = {
    gain: 0
  }

  const IGByProperty = getInformationGainByProperty(dataSet)
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

function induceTree(dataSet: any, className: string, properties: string[]): Node {
  const currentProperties = [...properties]

  if(dataSet.column(className).unique().values.length == 1) {
    const data = dataSet.column(className).unique().values;

    if(data) {
      const node = new Node(`Risk is: ${data[0]}`);

      return node;
    }
  }

  if(currentProperties.length == 0) {
    const node = new Node('Risk is: High or Moderate or Low');

    return node;
  } else {
    const bestProperty = getBestProperty(dataSet)

    const node = new Node(bestProperty)
    const bestPropertyIndex = currentProperties.indexOf(bestProperty)
    currentProperties.splice(bestPropertyIndex, 1)

    const bestPropertyUniqueValues = dataSet.column(bestProperty).unique().values
    for (const label of bestPropertyUniqueValues) {
      const edge = node.addEdge(label)

      const dataSetPartition = dataSet.query({ "column": bestProperty, "is": "==", "to": label })
      const subNode = induceTree(dataSetPartition, className, currentProperties)

      if(subNode) {
        edge.setDestination(subNode)
      }
    }

    return node
  }
}

export { induceTree }
