import { DataFrame as DF } from "danfojs/src/index";
import { DataFrame } from 'danfojs-node'
import { induceTree } from "./induceTree";
import data from './bank.json'

const sampleSet = new DF(data) as DataFrame;
const columns = [...sampleSet.columns] as string[];
const className = columns.pop()
const properties = columns

if(!className) {
  throw new Error('Class name is undefined')
}

const ID3Tree = induceTree(sampleSet, className, properties)

export { ID3Tree }
