from Tkinter import *
import random


class Vector:
  def __init__(self, x, y):
    self.x = x
    self.y = y

  def add(self, vector):
    self.x += vector.x
    self.y += vector.y

class Walker:
  def __init__(self, x,y):
    self.location = Vector(x,y)

  def wander(self):
    direction = Vector(random.randint(-3,3),random.randint(-3,3))
    self.location.add(direction)
    canvas.create_rectangle(self.location.x, self.location.y, self.location.x +1, self.location.y + 1)
    main.after(10, self.wander)


main = Tk()
canvas = Canvas(main, width=400, height=400)
w = Walker(200,200)
canvas.pack()
main.after(10,w.wander)
mainloop()

# direction = Vector(random.randint(-3,3),random.randint(-3,3))
# print direction.x
# print direction.y
