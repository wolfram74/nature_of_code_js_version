from vector import *
from Tkinter import *
import numpy as np
import random
gravity_acceleration = -9.8 #m/s**2
main = Tk()
def gravity(obj):
  return PVector(0, gravity_acceleration)

class Mover:
  def __init__(self):
    self.location = PVector(random.randint(0, 500), random.randint(0, 500))
    self.radius = random.randint(5,50)
    self.velocity = PVector(0,0)
    self.density = 1
    self.acceleration = PVector(0,0)
    self.volume = 3.0/4.0 * (self.radius ** 3) * np.pi

  def update(self):
    self.velocity.add(self.acceleration)
    self.location.add(self.velocity)
    if self.location.y >= 500 - self.radius:
      self.location.y = 500 - self.radius
      self.velocity.y = self.velocity.y * -1
  def apply_gravity(self):
    self.acceleration.subt(gravity(self)).div(200)


canvas = Canvas(main, width= 500, height=500)

movers = []
for _ in range(10):
  movers.append(Mover())
for x in movers:
  x.apply_gravity()
  print x.acceleration.y

def update_canvas():
  canvas.delete("all")
  for x in movers:
    x.update()
    canvas.create_oval(x.location.x- x.radius, x.location.y - x.radius, x.location.x + x.radius, x.location.y + x.radius)

  main.after(5, update_canvas)


canvas.pack()
main.after(5, update_canvas)
mainloop()


