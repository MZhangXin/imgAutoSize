/**
 * @Plugin name : img auto size
 * @Version : 1.0.0
 * @Author : Aile
 * @github : https://github.com/ailewl/imgAutoSize/
 * @Explain site : https://ailewl.github.io/imgAutoSize/#/
 */
function imgAutoSize(value) {
	var _this = this;
	this.obj = value.imgBox;
	this.Left = -value.Left;
	this.Top = -value.Top;
	this.Img = value.imgBox.getElementsByTagName('img')[0];
	this.imgwidth = null;
	this.imgheight = null;
	this.BoxFather = value.imgBox.parentNode,
	this.win = value.window||false;
	console.log(this.BoxFather)
	this.Img.onload = function () {
		_this.init()
		_this.ImgNew()
	}()
}
imgAutoSize.prototype.WinCwidth = function () {
	if (this.win) {
		return document.documentElement.clientWidth;
	} else {
		return this.obj.offsetWidth;
	}
}
imgAutoSize.prototype.WinCheight = function () {
	if (this.win) {
		return document.documentElement.clientHeight;
	} else {
		return this.obj.offsetHeight;
	}
}
imgAutoSize.prototype.ImgNew = function () {
	if (this.imgwidth / this.WinCwidth() < this.imgheight / this.WinCheight()) {
		this.Img.style.width = '100%';
		this.Img.style.height = 'auto';
		var y = this.Top / this.imgheight * this.Img.offsetHeight - (this.WinCheight() - this.Img.offsetHeight) / 2
		if (y > 0) {
			this.Img.style.top = 0;
		} else if (y < this.WinCheight() - this.Img.offsetHeight) {
			this.Img.style.top = (this.WinCheight() - this.Img.offsetHeight) + 'px'
		} else {
			this.Img.style.top = y + 'px'
		}
		this.Img.style.left = 0;
	} else {
		this.Img.style.height = '100%';
		this.Img.style.width = 'auto';
		this.Img.style.top = 0;
		var x = this.Left / this.imgwidth * this.Img.offsetWidth - (this.WinCwidth() - this.Img.offsetWidth) / 2
		if (x > 0) {
			this.Img.style.left = 0;
		} else if (x < this.WinCwidth() - this.Img.offsetWidth) {
			this.Img.style.left = (this.WinCwidth() - this.Img.offsetWidth) + 'px'
		} else {
			this.Img.style.left = x + 'px'
		}
	}
}
imgAutoSize.prototype.init = function () {
	this.imgwidth = this.Img.naturalWidth;
	this.imgheight = this.Img.naturalHeight;
	this.Img.style.position = 'absolute';
	this.Img.style.left = this.Img.style.top = '0';
	if (this.win) {
		this.obj.style.position = 'fixed';
		this.obj.style.width = document.documentElement.clientWidth;
		this.obj.style.height = document.documentElement.clientHeight;
		
	}else{
		this.obj.style.position = 'relative';
		this.obj.style.overflow = 'hidden'
	}
	this.obj.style.width = this.obj.style.height = '100%';
	if (!this.Top) {
		this.Top = -this.Img.naturalHeight/2
	}
	if (!this.Left) {
		this.Left = -this.Img.naturalWidth/2
	}
	console.log(this.Left,this.Top)
}