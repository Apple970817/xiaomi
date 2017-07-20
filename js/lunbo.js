window.onload=function(){
    var ban=$(".banner")[0];
    var al=$("a",ban);
    var lis=$("li",ban);
    var hd=$(".hd",ban)[0];
    var hdl=$(".hdl",ban)[0];
    var hdr=$(".hdr",ban)[0];
    var index=0;
    var next=0;
    var iw=parseInt(getStyle(al[0],"width"));
    var flag=true;


    //初始化   当前第0张显示，其他隐藏
    for(var i=0;i<al.length;i++){
        if(i==0){
            continue;
        }
        al[i].style.left=iw+"px";
    }

    //自动轮播
    var t=setInterval(mover,1000);

    function mover(){
        next++;
        if(next==al.length){
            next=0;
        }
        for(var i=0;i<al.length;i++){
            animate(lis[i],{backgroundColor:"#262626"});
        }
        animate(lis[next],{backgroundColor:"#ff0000"});
        //下一张就位
        al[next].style.left=iw+"px";
        //当前这张离开
        animate(al[index],{left:-iw},Tween.Quad.easeIn);
        //下一张显示
        animate(al[next],{left:0},Tween.Quad.easeIn,function(){
            flag=true;
        });
        index=next;
    }

     function movel(){
        next--;
        if(next<0){
            next=al.length-1;
        }
        for(var i=0;i<al.length;i++){
            animate(lis[i],{backgroundColor:"#262626"});
        }
        animate(lis[next],{backgroundColor:"#ff0000"});
        //下一张就位
        al[next].style.left=-iw+"px";
        //当前这张离开
        animate(al[index],{left:iw},Tween.Quad.easeIn);
        //下一张显示
        animate(al[next],{left:0},Tween.Quad.easeIn,function(){
            flag=true;
        });
        index=next;
    }



    ban.onmouseover=function(){
        clearInterval(t);
        animate(hd,{opacity:1});
    }

    ban.onmouseout=function(){
        t=setInterval(mover,1000);
        animate(hd,{opacity:0});
    }

    hdl.onclick=function(){
        if(flag){
             movel();
             flag=false;
        }
       
    }

    hdr.onclick=function(){
        if(flag){
             mover();
             flag=false;
        }
       
    }

    for(var i=0;i<al.length;i++){
        lis[i].index=i;
        lis[i].onclick=function(){
            if(index==this.index){
                return;
            }
            else if(index<this.index){
                //下一张就位
                al[this.index].style.left=iw+"px";
                //当前这张离开
                animate(al[index],{left:-iw},Tween.Quad.easeIn);
                //下一张显示
                animate(al[this.index],{left:0},Tween.Quad.easeIn);
                for(var j=0;j<al.length;j++){
                    animate(lis[j],{backgroundColor:"#262626"});
                }
                animate(lis[this.index],{backgroundColor:"#ff0000"});
                index=this.index;
            }
            else if(index>this.index){
                //下一张就位
                al[this.index].style.left=-iw+"px";
                //当前这张离开
                animate(al[index],{left:iw},Tween.Quad.easeIn);
                //下一张显示
                animate(al[this.index],{left:0},Tween.Quad.easeIn);
                for(var j=0;j<al.length;j++){
                    animate(lis[j],{backgroundColor:"#262626"});
                }
                animate(lis[this.index],{backgroundColor:"#ff0000"});
                index=this.index;
            }

        }
    }
}
