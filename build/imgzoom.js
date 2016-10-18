function Loaded(id){
oldimg=images[id];ni=par[id].nig;ni.align=oldimg.align;
ni.width=oldimg.width;ni.height=oldimg.height
var os
if (oldimg.currentStyle) os = oldimg.currentStyle;
else os = document.defaultView.getComputedStyle(oldimg,null)
if (oldimg.offsetLeft > 540) ni.align="right" 
if (os.border != undefined) ni.style.border = os.border
ni.style.marginRight = os.marginRight
ni.style.marginLeft = os.marginLeft
oldimg.parentNode.replaceChild(par[id].nig, oldimg)
par[id].loaded=true
}
function MakeBig(id){
now=new Date().getTime();par[id].started=now
if (!par[id].loaded){
par[id].w_w=images[id].width; par[id].h_w=images[id].height
par[id].nig=new Image(par[id].w_b*2, par[id].h_b*2)
par[id].nig.onload=function (){Loaded(id);}
par[id].nig.src=par[id].bigsrc
}
var makebig=(par[id].w_targ<=par[id].w_o)
var top=findtop(images[id])
var bot=top+images[id].height
var rivw=0, rivals=[]
for (a=0;a<par.length;a++){
if (makebig&&(a!=id)&&(a>=id-2)&&(a<=id+2)){
r_top=findtop(images[a])
r_bot=r_top+images[a].height;
if (r_bot>=top&&r_top<= bot){
rivw += par[a].w_o
rivals.push(a)
}}
par[a].w_targ=par[a].w_o
par[a].h_targ=par[a].h_o
par[a].w_is=images[a].width
par[a].h_is=images[a].height
}
if (rivals.length){
var maxwsum=1100;
if (document.body && document.body.offsetWidth) maxwsum=document.body.offsetWidth
if (window.innerWidth && window.innerHeight) maxwsum=window.innerWidth
if (maxwsum>1100)maxwsum=1100
maxwsum-=50;
widthleft = maxwsum-par[id].w_b
if (widthleft > 80*rivals.length){
rivscale = widthleft/rivw;
if (rivscale < 1){
for (a=0;a<rivals.length;a++){
riv=rivals[a]
par[riv].w_targ=par[riv].w_o*rivscale
par[riv].h_targ=par[riv].h_o*rivscale
}}}}
if (makebig){
par[id].w_targ=par[id].w_b
par[id].h_targ=par[id].h_b
}
started=new Date().getTime()
ScaleTimer()
}
function ScaleTimer(){
prcdone = 0.02
prcmin=(new Date().getTime()-started)/800
if(prcdone<prcmin)prcdone=prcmin;if(prcdone>1)prcdone=1
sm=(1-Math.cos(prcdone*3.1416))*.5
for (var id=0;id<par.length;id++){
if (par[id].w_targ == par[id].w_is) continue
var img=images[id], pm=par[id]
img.width=pm.w_is+(pm.w_targ-pm.w_is)*sm+0.1
img.height=pm.h_is+(pm.h_targ-pm.h_is)*sm+0.1
}
if (prcdone<1)setTimeout("ScaleTimer()", 10)
}
function findtop(obj) {
var curtop=0;
if(obj.offsetParent) {
do{curtop+=obj.offsetTop
}while(obj=obj.offsetParent)
}return curtop;
}
images=document.getElementsByTagName('img')
par=[]
prcdon=0
for(a=0;a<images.length;a++){
var imgp=images[a].parentNode,pa={}
pa.bigsrc=imgp.getAttribute("href")
pa.w_b=imgp.getAttribute("bigw")
pa.h_b=imgp.getAttribute("bigh")
pa.w_targ=pa.w_is=pa.w_o=images[a].width
pa.h_targ=pa.h_is=pa.h_o=images[a].height
pa.loaded=false
pa.rival=-1
par[a]=pa
if (par[a].w_b > 100) imgp.setAttribute("href","javascript:MakeBig("+a+")");
}

