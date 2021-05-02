class Edge:
  def __init__(self, label):
    self.__label = label

  def set_destiny(self, destiny):
    self.__destiny = destiny

  def print(self, level):
    indent = ' ' * level
    newIndent = indent + '|- '
    print(newIndent + self.__label)
    if not self.__destiny == None:
      newLevel = level + 2
      self.__destiny.print(newLevel)

  def __str__(self):
    return self.__label
