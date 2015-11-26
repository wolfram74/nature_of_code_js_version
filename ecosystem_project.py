from vector import *
from Tkinter import *
import numpy as np
import random

class Wave:
  def __init__(self, arg={}):
    self.theta = arg.get('theta', 0)
    self.amplitude = arg.get('amplitude', 0)
    self.wave_length = arg.get('wave_length', 0)


class Fish:
  def __init__(self):
    canvas.create_oval(100,100,120,120)
    canvas.create_oval(115,100,135,120)
    canvas.create_oval(130,100,150,120)
    self.head = PVector(100, 100)
    self.body = PVector(115, 100)
    self.tail = PVector(130, 100)
    self.velocity = PVector(0,0)
    self.acceleration = PVector(0,0)
    self.wave = Wave()

  def move(self):
    canvas.delete('all')
    self.accelerate()
    self.velocity.add(self.acceleration)
    self.head.add(self.velocity)
    self.body.add(self.velocity)
    self.tail.add(self.velocity)
    self.find_borders()
    canvas.create_oval(self.head.x, self.head.y, self.head.x + 20, self.head.y + 20)
    canvas.create_oval(self.body.x, self.body.y, self.body.x + 20, self.body.y + 20)
    canvas.create_oval(self.tail.x, self.tail.y, self.tail.x + 20, self.tail.y + 20)
    main.after(100, self.move)

  def find_borders(self):
    if self.head.x >= 800 or self.head.x < 0:
      self.head.x = 0
      self.body.x = 15
      self.tail.x = 30
    if self.head.y >= 200:
      self.head.y = 0
      self.body.y = 0
      self.tail.y = 0
    if self.head.y <= 0:
      self.head.y = 200
      self.body.y = 200
      self.tail.y = 200

  def accelerate(self):
    wave = self.wave
    if np.sin(wave.theta) <= .1 and np.sin(wave.theta) >= 0:
      wave.amplitude = random.randrange(30)
      wave.wave_length = random.randrange(200,400)
      print wave.amplitude
      print wave.wave_length
      self.velocity.x = wave.wave_length / 75

    self.acceleration.y = wave.amplitude * np.cos(wave.theta)/100
    # self.acceleration.x = wave.wave_length * np.sin(wave.theta)/1000


    wave.theta += np.pi / 30



main = Tk()
canvas = Canvas(main, width=800, height=200)
f = Fish()
canvas.pack()
main.after(100, f.move)
mainloop()
