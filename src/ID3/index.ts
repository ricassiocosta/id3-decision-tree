import { DataFrame as DF } from "danfojs/src/index";
import { DataFrame } from 'danfojs-node'
import { induceTree } from "./induceTree";
import data from './bank.json'

const goalSampleSet = new DF(data) as DataFrame;
const columns = [...goalSampleSet.columns] as string[];
const className = columns[0]
const classNameIndex = columns.indexOf(className)
columns.splice(classNameIndex, 1)
const properties = columns

const ID3Tree = induceTree(goalSampleSet, className, properties)

export { ID3Tree }
