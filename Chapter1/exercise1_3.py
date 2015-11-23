from visual import *
import numpy as np

x = 4
y = 4
z = 4

xspeed = .01
yspeed = .033
zspeed = .01

class TVector:
  def __init__(self, x, y, z):
    self.x = x
    self.y = y
    self.z = z

  def add(self, vector):
    self.x += vector.x
    self.y += vector.y
    self.z += vector.z

class Ball:
  def __init__(self, x,y,z):
    self.location = TVector(x,y,z)
    self.velocity = TVector(xspeed, yspeed, zspeed)
    self.space = sphere(pos = self.location, radius = 1, color = color.red)

  def bounce(self):
    self.location.add(self.velocity)
    self.find_border()

  def find_border(self):
    if self.location.x >= 10 or self.location.x <= -10:
      self.velocity.x *= -1
    if self.location.y >= 10 or self.location.y <= -10:
      self.velocity.y *= -1
    if self.location.z >= 10 or self.location.z <= -10:
      self.velocity.z *= -1

b = Ball(x,y,z)

while 1:
  rate(100)
  b.bounce()
















