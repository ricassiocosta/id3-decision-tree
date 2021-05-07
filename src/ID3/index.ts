import { DataFrame } from "danfojs/src/index";
import { induceTree } from "./induceTree";
import data from './tennis.json'

const goalSampleSet = new DataFrame(data);
const properties = goalSampleSet.columns
const className = goalSampleSet.columns[0]

const ID3Tree = induceTree(goalSampleSet, className, properties)

export { ID3Tree }
