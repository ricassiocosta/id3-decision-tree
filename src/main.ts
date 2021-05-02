import { DataFrame } from "danfojs-node";
import { induceTree } from "./induceTree";
import data from './data.json'
import fs from 'fs'

const dataSet = new DataFrame(data);
const properties = ['ch', 'de', 'wa', 'in']
const className = 'ri'

const ID3Tree = induceTree(dataSet, className, properties)

const tree = ID3Tree.print()

fs.writeFile('teste.json', JSON.stringify(tree), function (err) {
  if (err) throw err;
  console.log('Saved!');
});
