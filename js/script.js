/* Author: Adam Savitzky

*/

var Box = function (inElement) {
    var self = this;
    
    this.element = inElement;
    this.position = '0,0';
    this.scale = 1.0;
    this.rotation = 0;
    
    this.element.addEventListener("touchstart", function (e) { return self.onTouchStart(e); }, false);
    this.element.addEventListener('gesturestart', function(e) { return self.onGestureStart(e) }, false);
}

Box.prototype = {
    get position () {
        return this._position;
    },
    
    set position (pos) {
        this._position = pos;
        
        var components = pos.split(",");
        var x = components[0];
        var y = components[1];
        
        const kUseTransform = true;
        
        if(kUseTransform) {
            this.element.style.webkitTransform = 
            this.element.style.MozTransform =
            this.element.style.OTransform =
            this.element.style.Transform =
                'translate(' + x +'px, ' + y + 'px)';   
        } else {
            this.element.style.left = x + 'px';
            this.element.style.top = y + 'px';
        }
    },
    
    get x () {
        return parseInt(this._position.split(",")[0]);
    },
    
    set x (inX) {
        var comps = this._position.split(",");
        comps[0] = inX;
        this.position = comps.join(",");
    },
    
    get y () {
        return parseInt(this._position.split(",")[1]);
    },
    
    set y (inY) {
        var comps = this._position.split(",");
        comps[1] = inY;
        this.position = comps.join(",");
    },
    
    onTouchStart: function (e) {
        if (e.targetTouches.length != 1)
            return false;
            
        this.startX = e.targetTouches[0].clientX;
        this.startY = e.targetTouches[0].clientY;
        
        var self = this;
        this.element.addEventListener("touchmove", function (e) { return self.onTouchMove(e); }, false);
        this.element.addEventListener("touchend", function (e) { return self.onTouchEnd(e); }, false);
        
        return false;
    },
    
    onTouchMove: function (e) {
        e.preventDefault();
        
        if (e.targetTouches.length != 1)
            return false;
            
        var leftDelta = e.targetTouches[0].clientX - this.startX;
        var topDelta = e.targetTouches[0].clientY - this.startY;
        
        var newLeft = (this.x) + leftDelta;
        var newTop = (this.y) + topDelta;
        
        this.position = newLeft + "," + newTop;
        
        this.startX = e.targetTouches[0].clientX;
        this.startY = e.targetTouches[0].clientY;
        
        return false;
    },
    
    onTouchEnd: function (e) {
        e.preventDefault();
        alert("hello")
        if(e.targetTouches.length > 0)
            return false;
            
        this.element.removeEventListener("touchmove", function (e) { return self.onTouchMove(e); }, false);
        this.element.removeEventListener("touchend", function (e) { return self.onTouchEnd(e); }, false);
        
        return false;
    },
    
    onGestureStart: function (e) {
        e.preventDefault();
        
        var self = this;
        this.element.addEventListener("gesturechange", function (e) { return self.onGestureChange(e); }, true);
        this.element.addEventListener("gestureend", function (e) { return self.onGestureEnd(e); }, true);
        
        return false;
    },
    
    onGestureChange: function (e) {
        e.preventDefault();
        
        // The e.scale and e.rotation properties are computed automagically by the browser api
        this.scale = e.scale;
        this.rotation = e.rotation;
        this.position = this.position;
        
        return false;
    },
    
    onGestureEnd: function (e) {
        e.preventDefault();
        
        this.element.removeEventListener("gesturechange", this.gestureChangeHandler, true);
        this.element.removeEventListener("gestureend", this.gestureEndHandler, true);
        
        return false;
    }
}

var loaded = function () {
    new Box(document.getElementById("main-box"));
}

window.addEventListener("load", loaded, true);



















