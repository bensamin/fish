var momObj = function()
{
	this.x;
	this.y;
	this.angle;
	this.bigEye = new Image();
	this.bigBody = new Image();
	this.bigTail = new Image();

	this.momTailTimer = 0;
	this.momTailCount = 0;

	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;  //小鱼眯起眼睛的间隔时间

	this.momBodyCount = 0;
}
momObj.prototype.init = function()
{
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
}
momObj.prototype.draw = function()
{   
	//lerp x,y   使得一个值趋向一个目标值 跟随
	//this.x = lerpDistance(aim, cur, ratio) 
	this.x = lerpDistance(mx, this.x, 0.9);
	this.y = lerpDistance(my, this.y, 0.9);

	//delta angle
	//Math.atan2(y,x)
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY,deltaX)+Math.PI;//-PI PI
	//lerp  angle
	this.angle = lerpAngle(beta, this.angle, 0.6);

	//mom tail count  匀速的序列帧 播放图片 产生尾巴摆动的效果
	this.momTailTimer += deltaTime;
	if(this.momTailTimer > 50)
	{
		this.momTailCount = (this.momTailCount + 1) % 8;
		this.momTailTimer %= 50;
	}

	this.momEyeTimer += deltaTime;
	if( this.momEyeTimer > this.momEyeInterval)
	{
		this.momEyeCount = (this.momEyeCount + 1) % 2;
		this.momEyeTimer %= this.momEyeInterval; //计时器归0

		if( this.momEyeCount == 0)
		{
			//睁着眼镜的时间是随机的
			this.momEyeInterval = Math.random() * 1500 + 2000;
		}else
		{
			this.momEyeInterval = 200;
		}

	}

	ctx1.save();  
	ctx1.translate(this.x,this.y);  //鱼的眼睛，身体和尾巴的位置
	ctx1.rotate(this.angle);  //旋转画布

	var momTailCount = this.momTailCount;
	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width * 0.5 + 30, -momTail[momTailCount].height * 0.5);

	var momBodyCount = this.momBodyCount;
	if(data.double == 1)//ora
	{
		ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width * 0.5, -momBodyOra[momBodyCount].height * 0.5);
	}else  //blue
	{
		ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width * 0.5, -momBodyBlue[momBodyCount].height * 0.5);		
	}
	
	var momEyeCount = this.momEyeCount;
	ctx1.drawImage( momEye[momEyeCount],-momEye[momEyeCount].width * 0.5, -momEye[momEyeCount].height * 0.5);
	


	ctx1.restore();
}