import { DataFrame } from "danfojs/src/index";
import { induceTree } from "./induceTree";
import data from './data.json'

const dataSet = new DataFrame(data);
const properties = ['ch', 'de', 'wa', 'in']
const className = 'ri'

const ID3Tree = induceTree(dataSet, className, properties)

export { ID3Tree }
