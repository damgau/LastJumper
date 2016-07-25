/*
				_startValue = [x:0, y:0, rot:30]
				_changeValue = [x:100, y:100, rot:80]

*/

function TweenAnim(_startValue, _changeValue, _duration, _type, _underType){
	var _self = this;
	this.startValue = _startValue;
	this.changeValue = _changeValue;
	this.duration = _duration;
	this.type = _type || "Linear";
	this.underType = _underType || null;
	this.isFinished = false;

	this.callback = function(){
		_self.isFinished = true;
	}
	this.timer = new Timer(this.duration, false, null, this.callback, false);


	this.tweenValue = [];

	// function Start, Stop, Reset, return value
	this.Start = function(){
		this.timer.isStarted = true;
		var value;
		this.tweenValue = [];

		if (this.underType) {
			for (var i = 0; i < this.startValue.length; i++) {
				tween = Tween[this.type]
				value = tween[this.underType](this.timer.currentTime,
										this.startValue[i],
										this.changeValue[i],
										this.timer.duration);
				this.tweenValue.push(value);
			}
		} else {
			for (var i = 0; i < this.startValue.length; i++) {
				value = Tween[this.type](this.timer.currentTime,
										this.startValue[i],
										this.changeValue[i],
										this.timer.duration);
				this.tweenValue.push(value);
			}
		}
		
	}
	this.recoverValue = function(){
		this.Start();
		return this.tweenValue;
	}
	this.Reset = function(){
		this.isFinished = false;
		this.timer.Reset();
	}
}