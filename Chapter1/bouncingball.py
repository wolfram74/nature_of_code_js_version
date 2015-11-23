from Tkinter import *

x = 100
y = 100
xspeed = 1
yspeed = 3.3
canvas_height = 500
canvas_width = 500

main = Tk()
canvas = Canvas(main, width=canvas_width, height = canvas_height, bg = "white")
canvas.pack()

class Ball:
  def __init__ (self, width, height, xspeed, yspeed):
    self.width = width
    self.height = height
    self.xspeed = xspeed
    self.yspeed = yspeed
    self.x = 100
    self.y = 100


  def bounce(self):
    canvas.delete('all')
    self.representation = canvas.create_oval(self.x,self.y,self.x + self.width,self.y+self.height)

    self.x += self.xspeed
    self.y += self.yspeed
    self.find_borders()
    main.after(1, self.bounce)

  def find_borders(self):
    if self.x + self.width >= canvas_width or self.x <= 0:
      self.xspeed = self.xspeed * (-1)
    if self.y + self.height >= canvas_height or self.y <= 0:
      self.yspeed = self.yspeed * (-1)


b = Ball(50,50,1,3.3)


main.after(1, b.bounce)
mainloop()
