import { DataFrame } from "danfojs/src/index";
import { induceTree } from "./induceTree";
import data from './data.json'

const goalSampleSet = new DataFrame(data);
const properties = ['credit_history', 'debit', 'warranty', 'income']
const className = 'risk'

const ID3Tree = induceTree(goalSampleSet, className, properties)

export { ID3Tree }
