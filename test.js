//定义全局变量
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 567;

window.onload=function(){
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");
	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;

	

	
}

function addBalls(x,y,num){
	for(var i=0; i<digit[num].length; i++){
		for(var j=0; j<digit[num][i].length; j++){
			if(digit[num][i][j]==1){
				var ball={
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),//重力加速度,
					move_x:Math.pow(-1,Math.ceil(Math.random()*1000))*4,//随机取4或-4
					move_y:-5,
					color:colors[Math.floor(Math.random()*colors.length)]//随机取色

				}
				balls.push(ball);
			}
		}
	}
}