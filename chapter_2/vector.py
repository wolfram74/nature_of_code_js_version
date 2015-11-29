from __future__ import division

class PVector:
  def __init__(self, x, y):
    self.x = x
    self.y = y


  def add(self, vector):
    self.x += vector.x
    self.y += vector.y
    return self

  def subt(self, vector):
    self.x -= vector.x
    self.y -= vector.y
    return self

  def mult(self, num):
    self.x *= num
    self.y *= num
    return self

  def div(self, num):
    self.x *= 1/num
    self.y *= 1/num
    return self

  def new_mult(self, factor):
    return PVector(self.x * factor, self.y * factor)

  def new_subt(self, vector):
    return PVector(self.x - vector.x, self.y - vector.y)
