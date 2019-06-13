m=(x,y)=>{return {x:x,y:y,u:0,d:0};}

var c = I.getContext('2d'),
    b,
    p = [m(4,112),m(500,112)],
    t,i,M=Math,P,C;
c.r=c.fillRect,W=window,g=0,h=0;
c.font="60px monospace";

W.onkeydown = W.onkeyup = (e)=>{
  t=e.type=='keydown';
  e.c=e.key;
  if(e.c=='ArrowDown')p[1].d=t;
  if(e.c=='ArrowUp')p[1].u=t;
  if(e.c=='ArrowLeft')p[0].u =t;
  if(e.c=='ArrowRight')p[0].d =t;
}

B=()=>{
  b={x:252,y:124,X:r(2),Y:r(5)-2};
  if(b.X==0) b.X=-1;
}

L=(v)=>{
  return M.min(M.max(v, 0), 224);
}

r=(m)=>{
  return M.floor(M.random() * m);
}

setInterval(()=>{
  if(b.x==0) {h++;B()}
  if(b.x==504) {g++;B();}
  if(g>9||h>9) g=h=0;
  if(b.y<=0||b.y>=248) b.Y*=-1;
  b.x+=b.X;
  b.y+=b.Y;
  c.fillStyle = "#000";
  c.r(0,0,512,256);
  c.fillStyle = "#FFF";
  c.r(254,0,4,256);
  c.r(b.x,b.y,8,8);
  for(i=0;i<2;i++){
    P=p[i];
    P.y+=(P.u)?-1:(P.d)?1:0;
    P.y=L(P.y);
    C=P.y-b.y;
    if(C<4&&(b.x==12&&!i||b.x==492&&i)) {
      if(C>-35)b.X*=-1;
      b.Y = (C>-4) ? -1.5 : (C>-11) ? -1 : (C>-21) ? 0 : (C>-28) ? 1 : (C>-35) ? 1.5 : b.Y;
    }
    c.r(P.x,P.y,8,32);
  }
  c.fillText(g+" "+h,200,60);
}, 5);
B();
