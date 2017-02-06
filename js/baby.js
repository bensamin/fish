var babyObj = function()
{
	this.x;
	this.y;
	var angle;
	this.babyEye = new Image();
	this.babyBody = new Image();
	this.babyTail = new Image();

	this.babyTailTimer = 0;  //小鱼尾巴摆动
	this.babyTailCount = 0;

	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;  //小鱼眯起眼睛的间隔时间

	this.babyBodyTimer = 0;
	this.babyBodyCount = 0; //小鱼身体颜色变化
}
babyObj.prototype.init = function()
{
	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	this.angle = 0;
	this.babyBody.src = "./src/babyFade0.png";
}
babyObj.prototype.draw = function()
{
	//lerp x,y;
	this.x = lerpDistance(mom.x, this.x, 0.97);
	this.y = lerpDistance(mom.y, this.y, 0.97);
	//lerp angle
	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;
	var beta = Math.atan2(deltaY,deltaX)+Math.PI;//-PI PI
	//lerp  angle
	this.angle = lerpAngle(beta, this.angle, 0.9);
	//ctx1

	//baby tail count  匀速的序列帧 播放图片 产生尾巴摆动的效果
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer > 50)
	{
		this.babyTailCount = (this.babyTailCount + 1) % 8;
		this.babyTailTimer %= 50;
	}
	//babyEye的计时器
	this.babyEyeTimer += deltaTime;
	if( this.babyEyeTimer > this.babyEyeInterval)
	{
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInterval; //计时器归0

		if( this.babyEyeCount == 0)
		{
			//睁着眼镜的时间是随机的
			this.babyEyeInterval = Math.random() * 1500 + 2000;
		}else
		{
			this.babyEyeInterval = 200;
		}

	}

	//fish timer
	this.babyBodyTimer += deltaTime;
	if( this.babyBodyTimer > 300)
	{
		this.babyBodyCount = this.babyBodyCount + 1;
		this.babyBodyTimer %= 300; 
		if(this.babyBodyCount > 19)
		{
			this.babyBodyCount = 19;
			//Game over
			data.gameOver = true;
		}
	}

	ctx1.save();
	//translate()  相对坐标的函数
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);

	var babyTailCount = this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width * 0.5 + 23, -babyTail[babyTailCount].height * 0.5);

	var babyBodyCount = this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);

	var babyEyeCount = this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5);
	
	ctx1.restore();
}
