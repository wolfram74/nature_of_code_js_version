"""
Recreation of Conway's Game of Life -- Stephanie Hutson
Any live cell with fewer than two neighbors dies
Any live cell with more than three neighbors dies
Any live cell with two or three neighbors lives
Any dead cell with exactly three neighbors becomes a live cell
"""

from Tkinter import *
# Vector
# stop .location.y
#stop .location.x

class Vector:
  def __init__(self, x, y):
    self.x = x
    self.y = y

# WINDOW DIMENSIONS
CELL_SIZE = 10
YEAR_LENGTH = 100
population_year = 0

main = Tk()

class World:
  def __init__(self, cells_across, cells_down, seeds):
    self.cells_across = cells_across
    self.cells_down = cells_down
    self.cells = []
    window_width = cells_across * CELL_SIZE
    window_height = cells_down * CELL_SIZE
    self.canvas = Canvas(main, width = window_width, height = window_height, bg="white")
    self.canvas.pack()
    self.draw_grid(window_width, window_height)
    self.seed_world(seeds, cells_across, cells_down)
    self.display()

  def year_cycle(self):
    global population_year
    global main
    for row in self.cells:
      for cell in row:
        cell.check_neighbors()
    for row in self.cells:
      for cell in row:
        cell.update()
    population_year +=1
    self.display()
    main.after(YEAR_LENGTH, self.year_cycle)

  def seed_world(self, seeds, cells_across, cells_down):
    # big O is rather large on this one
    global cells
    for x in range(0, cells_across):
      self.cells.append([])
      for y in range(0,cells_down):
        new_cell = Cell(x,y)
        new_cell.world = self
        self.cells[x].append(new_cell)
        new_cell.world = self
        for cell in seeds:
          if new_cell.location.x == cell[0] and new_cell.location.y == cell[1]:
            new_cell.change_status()

  def display(self):
    for row in self.cells:
      for cell in row:
        if hasattr(cell, 'representation'):
          self.canvas.delete(cell.representation)
        if cell.living:
          top_left_x = cell.location.x * CELL_SIZE
          top_left_y = cell.location.y * CELL_SIZE
          cell.representation = self.canvas.create_rectangle(top_left_x, top_left_y, top_left_x + CELL_SIZE, top_left_y + CELL_SIZE, fill = "dark blue")

  def draw_grid(self, width, height):
    for x in range(1, height):
      self.canvas.create_line(x * CELL_SIZE, 0, x * CELL_SIZE
      , height, fill = "black")
    for y in range(1, width):
      self.canvas.create_line(0, y * CELL_SIZE, width, y * CELL_SIZE, fill = "black")

# A CELL
class Cell:
  def __init__(self, x, y):
    self.location = Vector(x,y)
    self.living = False

  def change_status(self):
    self.living = not self.living

  def check_neighbors(self):
    self.living_neighbors = 0
    x_to_check = [self.location.x]
    y_to_check = [self.location.y]
    if self.location.y > 0:
      y_to_check.append(self.location.y - 1)
    if self.location.y < self.world.cells_down -1:
      y_to_check.append(self.location.y + 1)
    if self.location.x > 0:
      x_to_check.append(self.location.x - 1)
    if self.location.x < self.world.cells_across -1:
      x_to_check.append(self.location.x + 1)
    for x in x_to_check:
      for y in y_to_check:
        if x != self.location.x or y != self.location.y:
          if self.world.cells[x][y].living:
            self.living_neighbors += 1

  def update(self):
    if self.living:
      if self.living_neighbors > 3 or self.living_neighbors < 2:
        self.change_status()
    else:
      if self.living_neighbors == 3:
        self.change_status()

toad = [[3,3], [3,4],[3,5],[4,2],[4,3],[4,4]]
line = [[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7]]
design = [[10,11],[10,12],[10,13],[12,12],[16,16],[16,17],[16,18],[18,17],[16,11],[16,12],[16,13],[18,12],[10,16],[10,17],[10,18],[12,17],[14,12],[18,19],[18,18],[18,17],[17,19]]

gol = World(30, 30, toad + design)
main.after(YEAR_LENGTH, gol.year_cycle)

mainloop()
