from Tkinter import *

class PVector:
  def __init__(self, x, y):
    self.x = x
    self.y = y

  def add(self, vector):
    self.x += vector.x
    self.y += vector.y

class Runner:
  def __init__ (self):
    self.width = 5
    self.height = 5
    self.velocity = PVector(0, 0)
    self.location = PVector(50,100)
    self.acceleration = PVector(1, 0)


  def update(self):
    canvas.delete('all')
    self.velocity = self.velocity.add(self.acceleration)
    self.location = self.location.add(self.velocity)
    canvas.create_oval(self.location.x, self.location.y, self.location.x + self.width, self.location.y+self.height)
    main.after(10, r.update)

  def accelerate(self):
    self.accelerate.add(PVector(.005, 0))

  def brake(self):
    self.accelerate.add(PVector(-.005, 0))
    if self.velocity.x < 0:
      self.velocity.x = 0
    if self.velocity.y < 0:
      self.velocity.y = 0

  def find_borders(self):
    if self.location.x + self.width >= 800 or self.location.x < 0:
      self.location.x = 0
    if self.location.y + self.width >= 200 or self.location.y < 0:
      self.location.y = 0


main = Tk()
canvas = Canvas(main, width=800, height=200)
r = Runner()
canvas.pack()
# main.after(10, r.update)
# mainloop()

# a = PVector(0,0)
# b = PVector(1,.005)
# a.add(b)
# print a
# print a.x
# print a.y
print r.acceleration
print r.acceleration.x
print r.acceleration.y
print r.velocity.add(r.acceleration)
print r.velocity
print r.velocity.x
