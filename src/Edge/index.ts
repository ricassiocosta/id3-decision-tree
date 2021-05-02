import { Node, StructuredNode } from "../Node";
import { getRandomKey } from '../utils/general';

interface StructuredEdge {
  name: string;
  key: string;
  children: StructuredNode[];
  gProps: {
    className: string,
  }
}

class Edge {
  private label: string;
  private destination?: Node;

  constructor(label: string) {
    this.label = label
  }

  setDestination(destiny: Node): void {
    this.destination = destiny
  }

  get(): StructuredEdge {
    const edge: StructuredEdge = {
      name: this.label,
      key: getRandomKey(),
      children: [],
      gProps: {
        className: 'edge'
      },
    }

    if (this.destination) {
      const node = this.destination.get()
      edge.children.push(node);
    }

    return edge
  }
}

export { Edge };export type { StructuredEdge };

