//定义全局变量
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 567;
var RADIUS = 8;//小球半径
var MARGIN_LEFT=0;
var MARGIN_TOP=0; 

const ENDTIME=new Date(2017,4,28,0,0,0);//截止日期
var CURTIME=0;//现在时间,用秒表示
var balls=[];//彩色小球数组
const colors=["#bebebe","#0099CC", "#E0E0E0", "#AA66CC",
 "#99CC00","#FFBB33","#FF4444","#FF8800","#669900","#33B5E5"];

window.onload=function(){
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");
	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;

	CURTIME=getCurtime();

	setInterval(
		function(){
			draw(context);
			update();
		}
	,50);

	
}
//更新时间
function update(){
	var nextTime=getCurtime();
	var nextHours=parseInt(nextTime/3600);
	var nextMinutes=parseInt((nextTime-nextHours*3600)/60);
	var nextseconds=nextTime%60;

	var curHours=parseInt(CURTIME/3600);
	var curMinutes=parseInt((CURTIME-curHours*3600)/60);
	var curseconds=CURTIME%60;

	 //CURTIME = curseconds!=nextseconds? nextTime:CURTIME;
	if(curseconds!=nextseconds){
		//时钟
		if(parseInt(curHours/10)!=parseInt(nextHours/10)){//十位数
			addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curHours/10));
		}
		if(parseInt(curHours%10)!=parseInt(nextHours%10)){//个位数
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours/10));
		}
		//分钟
		if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){//十位数
			addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(nextMinutes/10));
		}
		if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){//个位数
			addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10));
		}
		//秒钟
		if(parseInt(curseconds/10)!=parseInt(nextseconds/10)){//十位数
			addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(nextseconds/10));
		}
		if(parseInt(curseconds%10)!=parseInt(nextseconds%10)){//个位数
			addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curseconds%10));
		}

		CURTIME=nextTime;
	}
	updateBalls();//更新小球状态
}

//给小球运动的状态
function updateBalls(){
	for(var i=0; i<balls.length; i++){
		balls[i].x+=balls[i].move_x;
		balls[i].y+=balls[i].move_y;
		balls[i].move_y+=balls[i].g;	

		//碰撞检测
		if(balls[i].y>=WINDOW_HEIGHT - RADIUS){
			balls[i].y=WINDOW_HEIGHT - RADIUS;
			balls[i].move_y=-balls[i].move_y*0.75;//0.75是反弹摩擦系数
		}
	}
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

//获取现在时间
function getCurtime(){
	var curTime=new Date();
	var difTime=ENDTIME.getTime()-curTime.getTime();
	difTime=Math.round(difTime/1000);//转成秒
	return difTime>=0? difTime : 0;
}

//绘制函数
function draw(context){

	context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

	var hours=parseInt(CURTIME/3600);
	var minutes=parseInt((CURTIME-hours*3600)/60);
	var seconds=CURTIME%60;

	//
	drawball(MARGIN_LEFT,MARGIN_TOP, parseInt(hours/10),context);
	drawball(MARGIN_LEFT+15*(RADIUS+1), MARGIN_TOP, parseInt(hours%10),context);
	drawball(MARGIN_LEFT+30*(RADIUS+1), MARGIN_TOP, 10,context);
	//
	drawball(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP, parseInt(minutes/10),context);
	drawball(MARGIN_LEFT+54*(RADIUS+1), MARGIN_TOP, parseInt(minutes%10),context);
	drawball(MARGIN_LEFT+69*(RADIUS+1), MARGIN_TOP, 10,context);
	//
	drawball(MARGIN_LEFT+78*(RADIUS+1), MARGIN_TOP, parseInt(seconds/10),context);
	drawball(MARGIN_LEFT+93*(RADIUS+1), MARGIN_TOP, parseInt(seconds%10),context);

	//绘制彩色小球
	for(var i=0; i<balls.length; i++){
		context.fillStyle=balls[i].color;
		context.beginPath();
		context.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
		context.closePath();
		context.fill();
	}
}

//绘制小球函数
function drawball(x,y,num,context){
	context.fillStyle='rgb(0,102,153)';
	for(var i=0; i<digit[num].length; i++){
		for(var j=0; j<digit[num][i].length; j++){
			if (digit[num][i][j]==1) {
				context.beginPath();
				//传入圆心和半径
				context.arc(x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1), RADIUS,0, 2*Math.PI);
				context.closePath();
				context.fill();//填充
			}
		}
	}
}

//

