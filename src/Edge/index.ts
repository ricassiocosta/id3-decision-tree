import { Node, StructuredNode } from "../Node";

interface StructuredEdge {
  name: string;
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

  print(): StructuredEdge {
    const edge: StructuredEdge = {
      name: this.label,
      children: [],
      gProps: {
        className: 'edge'
      },
    }

    if (this.destination) {
      const node = this.destination.print()
      edge.children.push(node);
    }

    return edge
  }
}

export { Edge };export type { StructuredEdge };

