import { Edge, StructuredEdge } from "../Edge";

interface StructuredNode {
  name: string;
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

  print(): StructuredNode {
    const node: StructuredNode = {
      name: this.label,
      children: [],
      gProps: {
        className: 'node'
      }
    }

    this.edges.forEach(edge => {
      node.children.push(edge.print())
    })

    return node
  }
}

export { Node };export type { StructuredNode };

