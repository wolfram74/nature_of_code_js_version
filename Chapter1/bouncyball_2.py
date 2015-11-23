from Tkinter import *

x = 100
y = 100
xspeed = 1
yspeed = 3.3
canvas_height = 500
canvas_width = 500


class PVector:
  def __init__ (self,x,y):
    self.x = x
    self.y = y

  def add(self, vector):
    self.x += vector.x
    self.y += vector.y


class Ball:
  def __init__ (self, width, height, xspeed, yspeed):
    self.width = width
    self.height = height
    self.velocity = PVector(xspeed, yspeed)
    self.location = PVector(100,100)


  def draw(self):
    canvas.delete('all')
    self.representation = canvas.create_oval(self.location.x,self.location.y,self.location.x + self.width,self.location.y+self.height)

    self.location.add(self.velocity)
    self.find_borders()
    main.after(1, self.draw)

  def find_borders(self):
    if self.location.x + self.width >= canvas_width or self.location.x <= 0:
      self.velocity.x *= -1
    if self.location.y + self.height >= canvas_height or self.location.y <= 0:
      self.velocity.y *= -1


b = Ball(50,50,1,3.3)


main = Tk()
canvas = Canvas(main, width=canvas_width, height = canvas_height, bg = "white")
canvas.pack()
main.after(1, b.draw)
mainloop()
