from forces import *
from Tkinter import *
from vector import *
import numpy as np

movers = [Mover()]

main = Tk()

def update_canvas():
  canvas.delete("all")
  for x in movers:
    x.update()
    canvas.create_oval(x.location.x- x.radius, x.location.y - x.radius, x.location.x + x.radius, x.location.y + x.radius)

  main.after(5, update_canvas)

canvas = Canvas(main, width = 500, height = 500)
canvas.create_
update_canvas()
canvas.pack()
main.after(10, update_canvas)
mainloop()
