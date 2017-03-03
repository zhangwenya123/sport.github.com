//        封装获取非行间样式
function getStyle(obj,name,value){
    if(obj.currentStyle){
        return obj.currentStyle[name];
    }
    else{
        return getComputedStyle(obj,false)[name];
    }
    if(obj.filters){
        obj.style.filters=alpha(opacity='+value+');
    }
    else{
        obj.style.opacity=value/100;
    }
}

function startMove(obj,json,endFn){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
//                var cur=parseFloat(getStyle(obj,attr));
        var sTop=true;
        for(var attr in json) {

            var cur = 0;
            if (attr == 'opacity') {
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            }
            else {
                cur = parseInt(getStyle(obj, attr));
            }
            var speed = (json[attr] - cur) / 6;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (cur!= json[attr]) {
                sTop=false;

            }

                if (attr == 'opacity') {
                    obj.style.filters = 'alpha(opacity:' + (cur + speed) + ')';
                    obj.style.opacity = (cur + speed) / 100;
                }
                else {
                    obj.style[attr] = cur + speed + "px";
                }


        }
        if(sTop){
            clearInterval(obj.timer);
            if(endFn)endFn();
        }
    },30)
}