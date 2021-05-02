from .Edge import Edge

class Vertex:
  def __init__(self, label):
    self.__label = label
    self.__edges = []

  def add_edge(self, label):
    edge = Edge(label)
    self.__edges.append(edge)

    return edge

  def print(self, level):
    indent = ' ' * level
    print(indent +self.__label)
    for edge in self.__edges:
      newLevel = level + 1
      edge.print(newLevel)

  def __str__(self):
    return self.__label
