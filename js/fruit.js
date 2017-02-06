var fruitObj = function(){
	this.alive = []; //bool

	this.x = [];
	this.y = [];
	this.aneNum = [];
	this.l = [];   //control image size
	this.spd =  [];   //control  fruit speed
	this.fruitType = []; //difference fruit
	this.orange = new Image();  //fruit image
	this.blue = new Image();
}

fruitObj.prototype.num = 30;  //fruit number

fruitObj.prototype.init = function()
{
	for (var i = 0; i < this.num; i++) 
	{
		this.alive[i] = false;
		this.x[i] = 0;    //初始化果实的位置
		this.y[i] = 0;
		this.aneNum[i] = 0;
		this.l[i] = 0;   //control image 
		this.spd[i] =  Math.random() * 0.02 + 0.005;  //[0.005,0.015)
		this.fruitType[i] = "";
	}
	this.orange.src = "./src/fruit.png";
	this.blue.src = "./src/blue.png";
}

fruitObj.prototype.draw = function (){
	for (var i = 0; i < this.num; i++) {
		//draw
		//find an ane ,grow,fly up
		if( this.alive[i] )
		{
			if( this.fruitType[i] == "blue")
			{
				var pic = this.blue;
			}
			else
			{
				var pic = this.orange;
			}
			if ( this.l[i] < 12 ) //grow
			{
				var Num = this.aneNum[i]
				this.x[i] = ane.headx[Num];
				this.y[i] = ane.heady[Num];
				this.l[i] += this.spd[i] * deltaTime;   //grow 
			}else
			{
				this.y[i] -=  this.spd[i] * 2 * deltaTime;   //fly up
				ctx2.drawImage(pic,this.x[i] - this.l[i] * 0.5,this.y[i] - this.l[i] * 0.5,this.l[i],this.l[i]);  //draw
			
			}
				
			if(this.y[i] < 10)
			{
				this.alive[i] = false; 
			}
		}
	}
}

fruitObj.prototype.born = function(i)
{
	this.aneNum[i] =  Math.floor(Math.random() * ane.num);
	this.l[i] = 0;
	this.alive[i] = true;
	var ran = Math.random();
	if( ran < 0.2 ) //蓝色果实产生的数量
	{
		this.fruitType[i] = "blue" ;
	}else
	{
		this.fruitType[i] = "organe";
	}
}

fruitObj.prototype.dead = function(i)
{
	this.alive[i] = false;
}

function fruitMonitor()    //judge fruit number
{
	var num = 0;
	for (var i = 0; i < fruit.num; i++) 
	{
		if (fruit.alive[i]) num++;
	}
	if (num < 30 ) 
	{
		//send fruit
		sendFruit();
		return;
	}
}
function sendFruit()   //born fruit
{
	for (var i = 0; i < fruit.num; i++) 
	{
		if ( !fruit.alive[i] )  
		{
			fruit.born(i);
			return;
		}
	}
}