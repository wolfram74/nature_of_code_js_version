import numpy as np
import random
from vector import *

def cross_section(obj):
  #assume object is a sphere
  radius = (3 * obj.volume/ 4 * np.pi) ** (1/3)
  return 2 * np.pi * radius ** 2

def bouyant_force(obj):
 return PVector(0, air_density * obj.volume * (-gravity_acceleration))

def gravity(obj):
  return PVector(0, obj.density * obj.volume * gravity_acceleration)

# drag = 1/2 * density * vel ^ 2 * drag coeff * cross sectional area
def drag(obj):
  x_vel = obj.velocity.x
  y_vel = obj.velocity.y
  x = .5 * obj.density * (x_vel * x_vel) * SPHERE_DRAG * cross_section(obj)
  y = -.5 * obj.density * (y_vel * y_vel) * SPHERE_DRAG * cross_section(obj)
  return PVector(x, y)#.div(obj.density * obj.volume)

def applyForce(obj, force):
  return obj.acceleration.add(force)

class Mover:
  def __init__(self):
    self.location = PVector(random.randint(0, 500), random.randint(0, 500))
    self.radius = random.randint(5,50)
    self.velocity = PVector(0.0,0.0)
    self.density = 1
    self.acceleration = PVector(0.0,0.0)
    self.volume = 3.0/4.0 * (self.radius ** 3) * np.pi

  def update(self):
    self.velocity.add(self.acceleration)
    self.location.add(self.velocity)
    if self.location.y >= 500 - self.radius:
      self.location.y = 500 - self.radius
      self.velocity.y = self.velocity.y * -1
  def apply_gravity(self):
    self.acceleration.subt(gravity(self)).div(200.00)
