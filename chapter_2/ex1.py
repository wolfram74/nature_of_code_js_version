from vector import *
from Tkinter import *
import numpy as np
import random

main = Tk()
canvas = Canvas(main, width = 800, height = 500)
helium_density = .164
air_density = 1.225 # kg per meter cubed
gravity_acceleration = -9.8
SPHERE_DRAG = .47

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

class balloon:
  def __init__(self):
    self.density = helium_density
    self.volume = 1 #cubic meter, cause science
    self.location = PVector(350,350)
    self.velocity = PVector(0,0)
    self.acceleration = PVector(0,0)

  def update(self):
    canvas.delete("all")
    self.apply_drag()
    self.velocity.add(self.acceleration)
    if self.location.x < 0:
      self.location.x = 800
    elif self.location.x > 800:
      self.location.x = 0
    self.location.add(self.velocity)
    if self.location.y < 0:
      self.location.y = 1
      self.velocity.y = -self.velocity.y
    canvas.create_oval(self.location.x,self.location.y,self.location.x + 100,self.location.y +100)
    main.after(10, self.update)

  def apply_gravity(self):
    applyForce(self, (gravity(self)).subt(bouyant_force(self)).div(100))
  def apply_drag(self):
    applyForce(self, drag(self).div(1000))


  def apply_wind(self):
    # random_num = random.random()
    # if random_num >= 0.5:
    #   random_num *= -1
    # self.acceleration.add(PVector(random_num/1000, 0))
    main.after(100, self.apply_wind)

b= balloon()
b.apply_gravity()
# b.apply_drag()
canvas.pack()
main.after(10, b.update)
main.after(100, b.apply_wind)
mainloop()



