from Tkinter import *

class PVector:
  def __init__(self, x, y):
    self.x = x
    self.y = y

  def add(self, vector):
    self.x += vector.x
    self.y += vector.y

  def set_zero(self):
    self.x = 0
    self.y = 0

class Runner:
  def __init__ (self):
    self.width = 5
    self.height = 5
    self.velocity = PVector(0, 0)
    self.location = PVector(50,100)
    self.acceleration = PVector(0, 0)


  def update(self):
    canvas.delete('all')
    self.velocity.add(self.acceleration)
    if self.velocity.x < 0:
      self.velocity.set_zero()
    if self.velocity.y < 0:
      self.velocity.set_zero()
    self.location.add(self.velocity)
    self.find_borders()
    canvas.create_oval(self.location.x, self.location.y, self.location.x + self.width, self.location.y+self.height)
    main.after(10, r.update)

  def accelerate(self):
    self.acceleration.add(PVector(.01, 0))

  def brake(self):
    self.acceleration.add(PVector(-.01, 0))

  def find_borders(self):
    if self.location.x + self.width >= 800 or self.location.x < 0:
      self.location.x = 0
    if self.location.y + self.width >= 200 or self.location.y < 0:
      self.location.y = 0


main = Tk()

canvas = Canvas(main, width=800, height=200)
r = Runner()

def leftKey(event):
  r.brake()

def rightKey(event):
  r.accelerate()

main.bind('<Left>', leftKey)
main.bind('<Right>', rightKey)
canvas.focus_set()
canvas.pack()
main.after(10, r.update)
mainloop()
