var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

var bgPic = new Image();

var ane;
var fruit;

var mom;
var baby;

var mx;
var my;

var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];

var momBodyOra = [];
var momBodyBlue = [];

var data;

var wave;
var halo;

document.body.onload = game;
function game(){
	init();
	lastTime=Date.now();
	deltaTime = 0;
	gameloop();
}
function init(){
	//获取canvas Context;
	can1 = document.getElementById('canvas1'); //fishes,dust,UI,circle
	ctx1 = can1.getContext('2d');

	can2 = document.getElementById('canvas2'); //background,ane ,fruits
	ctx2 = can2.getContext('2d');

	can1.addEventListener('mousemove',onMouseMove,false);

	bgPic.src = "./src/background.jpg"

	canWidth = can1.width;
	canHeight = can1.height;

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	baby = new babyObj();
	baby.init();

	mx = canWidth * 0.5;
	my = canHeight * 0.5;

	//small fish
	for( var i = 0; i < 8; i++)
	{//尾巴摆动图片的循环数组
		babyTail[i] = new Image();
		babyTail[i].src = "./src/babyTail" + i +".png";
	}

	for( var i = 0;i < 2;i++)
	{//眼睛眨动的动画序列帧
		babyEye[i] = new Image();
		babyEye[i].src = "./src/babyEye" + i + ".png";
	}
	for( var i = 0;i < 20; i++)
	{
		babyBody[i] = new Image();
		babyBody[i].src = "./src/babyFade" + i +".png";
	}

	//big fish
	for(var i = 0;i < 8;i++ )
	{
		momTail[i] = new Image();
		momTail[i].src = "./src/bigTail" + i + ".png";
	}
	for(var i = 0;i < 2;i++)
	{
		momEye[i] = new Image();
		momEye[i].src = "./src/bigEye" + i + ".png";
	}

	data = new dataObj();

	for(var i = 0; i< 8;i++)
	{
		momBodyOra[i] = new Image();
		momBodyBlue[i] = new Image();
		momBodyOra[i].src = "./src/bigSwim" + i +".png";
		momBodyBlue[i].src = "./src/bigSwimBlue" + i +".png";
	}
	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();
}


function gameloop()
{
	window.requestAnimationFrame(gameloop);  //setInterval, 
	//requestAnimFrame 当前绘制完成之后根据当前机器的性能来确定间隔多长时间来绘制下一帧是根据机器只能计算的一个过程
	//setInterval,setTimeout是一个定死的时间
	var now = Date.now(); //1970年1月1日0：00到如今
	deltaTime = now - lastTime;
	lastTime = now;

	if(deltaTime > 40) deltaTime = 40; //约定果实不会因为标签的切换而变得特别大  
	//deltimes相邻的两帧之间的时间间隔

	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();

	ctx1.clearRect(0,0,canWidth,canHeight);
	mom.draw();
	baby.draw();
	momFruitCollision();
	momBabyCollisioin();
	
	data.draw();
	wave.draw();
	halo.draw();

}
function onMouseMove(e)
{
	if(!data.gameOver)
	{
		if(e.offSetX || e.layerX)
		{
			mx = e.offSetX == undefined ? e.layerX : e.offSetX;
			my = e.offSetY == undefined ? e.layerY : e.offSetY;	
		}
	}
}