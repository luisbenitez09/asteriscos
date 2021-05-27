

function setup() {
 createCanvas(windowWidth,windowHeight)
 p1 = {x:200, y:200}
 p2 = {x:0, y:0}
 p3 = {x:200, y:0}
 p4 = {x:0, y:200}
 p5 = {x:200, y:100}
 p6 = {x:0, y:100}
 p7 = {x:100, y:0}
 p8 = {x:100, y:200}

}

function draw() {
  stroke("green")
  ecuPP(p1, p2)
  ecuPP(p3, p4)
  ecuPP(p5, p6)
  ecuPP(p7, p8)
  textSize(25)
  text("ecuPP",60,250)

  stroke("blue")
  dda(250,0,450, 200)
  dda(250,200,450, 0)
  dda(250,100,450, 100)
  dda(350,0,350, 200)
  textSize(25)
  text("dda",330,250)

  stroke("red")
  bresenham(500,0,700,200)
  bresenham(500,200,700,0)
  bresenham(500,100,700,100)
  bresenham(600,0,600,200)
  textSize(25)
  text("Bresenham",550,250)

  circ(400,400,50)
  textSize(25)
  text("Circulo",360,500)

  elip(120,400,75,35)
  textSize(25)
  text("Elipse",80,500)

  textSize(25)
  text("Luis Angel Benitez",250,650)

}

function ecuPP(p1,p2) {

	const dx = p2.x - p1.x
	const dy = p2.y - p1.y
	let stepX = 1
	let stepY = 1

	if(dx == 0) {
		if(dy < 0) { stepY = -stepY }

  	let x = p1.x
  	let y = p1.y

  	while(y != p2.y){
  		point(x,y)
  		y += stepY
  	}
  } else {
  	const m = dy / dx
  	const b = p1.y - m * p1.x

  	if(dx < 0) stepX = -stepX
  	let x = p1.x
  	let y = p1.y

  	while (x != p2.x) {
  		point(x,y)
  		x += stepX
  		y = m * x + b
  	}
  }
  noLoop()
}

function dda(x1, y1, x2, y2){
	let x = x1
	let y = y1
	let dx = x2 - x1
	let dy = y2 - y1
	let m = dy / dx
  let stepX = 1
  let stepY = 1

  if(dx == 0) {
		if(dy < 0) { stepY = -stepY }

  	while(y != y2){
  		point(x,y)
  		y += stepY
  	}
  } else if(dy == 0) {
		if(dx < 0) { stepX = -stepX }

  	while(x != x2){
  		point(x,y)
  		x += stepX
  	}
  } else {
    while(x <= x2) {
      point(x,y)
      x++
      y = y+m
    }
  }
}


function bresenham(x1,y1,x2,y2) {
  let x = x1
	let y = y1
	let dx = x2 - x1
	let dy = y2 - y1
  let m = dy / dx

  let ddx = 2*dx
  let ddy = 2*dy
  let dy2dx2 = ddy-ddx
  let dx2dy2 = ddx-ddy


  if( m < 1) {
    let p = ddy - dx

    for (k=0; k < dx; k++) {
      if(p < 0) {
        x++
        if(m != 0) {
          y--
        }
        p+=ddy
        point(x,y)
      } else {
        x++
        y++
        p+=dy2dx2
        point(x,y)
      }
    }
  } else if( m >= 1) {
    let p = ddx -dy
    for (k=0; k < dy; k++) {
      if(p < 0) {
        y++
        p+=ddx
        point(x,y)
      } else {
        x++
        y++
        p+=dx2dy2
        point(x,y)
      }
    }
  }

}

function circ(xc,yc,r) {
  let p = Math.round(5 / 4 - r)
  let x = 0
  let y = r

  point(xc + x, yc + y)

  while(x < y) {
    x++
    if(p < 0) {
      p = p + 2 + x + 1
    } else {
      y--
      p = p + 2 + (x - y) + 1
    }
    point(xc + x, yc + y)
    point(xc + x, yc - y)
    point(xc - x, yc + y)
    point(xc - x, yc - y)
    point(yc + y, xc + x)
    point(yc + y, xc - x)
    point(yc- y, xc + x)
    point(yc - y, xc - x)
  }
}

function elip(xc, yc, rx, ry){
  let x,y,p1,px,py
  let rx2, ry2, rx22, ry22

  rx2 = rx*rx
  ry2 = ry*ry
  rx22 = 2*rx2
  ry22 = 2*ry2

  x=0
  y=ry

  point(xc + x, yc + y);
  point(xc + x, yc - y);
  point(xc - x, yc + y);
  point(xc - x, yc - y);

  p1 = Math.round(ry2 - rx2*ry + 0.25*rx2)
  px = 0

  py = rx22*y

  while(px < py){
    x++
    px = px + ry22
    if (p1 < 0){
      p1 = p1 + ry2 + px
    }else {
      y--
      py = py-rx22
      p1 = p1+ry2+px-py
    }
    point(xc + x, yc + y);
    point(xc + x, yc - y);
    point(xc - x, yc + y);
    point(xc - x, yc - y);
  }

  p1 = Math.round(ry2*(x+0.5)*(x+0.5)+rx2*(y-1)*(y-1)-rx2*ry2)
  px=0
  py=rx22*y

  while(y > 0){
    y--
    py = py-rx22
    if(p1>0){
      p1 = p1 + rx2 - py
    }else{
      x++
      px = px + ry22
      p1 = p1 + rx2 + py + px
    }
    point(xc + x, yc + y);
    point(xc + x, yc - y);
    point(xc - x, yc + y);
    point(xc - x, yc - y);
  }

}
