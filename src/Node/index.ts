import { Edge, StructuredEdge } from "../Edge";
import { getRandomKey } from '../utils/general';

interface StructuredNode {
  name: string;
  key: string;
  children: StructuredEdge[];
  gProps: {
    className: string,
  }
}

class Node {
  private label: string;
  private edges: Edge[] = [];

  constructor(label: string) {
    this.label = label;
  }

  addEdge(label: string): Edge {
    const edge = new Edge(label)
    this.edges.push(edge)

    return edge
  }

  get(): StructuredNode {
    const node: StructuredNode = {
      name: this.label,
      key: getRandomKey(),
      children: [],
      gProps: {
        className: 'node'
      }
    }

    this.edges.forEach(edge => {
      node.children.push(edge.get())
    })

    return node
  }
}

export { Node };export type { StructuredNode };

