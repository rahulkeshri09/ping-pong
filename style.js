var mouse=document.getElementsByTagName('body');
var rod=document.getElementsByClassName('rod');
var ball=document.getElementById('ball');
var ballPos=ball.getBoundingClientRect();
var ballTop=ballPos.top;
var ballLeft=ballPos.left;
var movePer=30;
var changeMovement;
var ballDir=Math.round(Math.random());
var ballAngle=Math.floor(Math.random()*20);
var ballSpeed=10;
var score=0;
var scoreDisplay=document.getElementById('score');
document.addEventListener('keydown',function(e){
	var move=e.keyCode;
	if(move == 65 ){
		if(movePer<=0){
			return
		}
		movePer--;
		rod[0].style.marginLeft=movePer+"0px";
	//	console.log("left",rod[0].style.marginLeft);
		rod[1].style.marginLeft=movePer+"0px";
	}
	if(move == 68){
		if((movePer*10)+192>=800){
			return
		}
		rod[0].style.marginLeft=movePer+"0px";
		console.log("margin right",rod[0].style.marginLeft)
		rod[1].style.marginLeft=movePer+"0px";
		movePer++;
	}
	if(move == 13){
		changeMovement=setInterval(moveBall,50);
	}

})
var moveBall=function(){
	if(ballTop>400){
		var rodPos=rod[0].getBoundingClientRect().left;
	//	console.log("rod",rodPos);
		if(ballLeft>=rodPos && ballLeft<=rodPos+200){
			score+=100;
			scoreDisplay.innerHTML=score;
			ballDir=Math.round(Math.random());
			clearInterval(changeMovement);
			changeMovement=setInterval(reverseBall,50);
			return
		}
	}
	if(ballDir==0){
		if(ballLeft<=25){
			ballDir=1;
		}
		ballLeft-=ballAngle;
		ball.style.left=ballLeft+"px";
	}else{
		ballLeft+=ballAngle;
		if(ballLeft>=770){
			ballDir=0;
		}
		ball.style.left=ballLeft+"px";
	}
	if(ballTop>418){
		alert("Your Score = "+score);
		bestScore();
		clearInterval(changeMovement);
		location.reload();
	}
	ballTop=ballTop+10;
	ball.style.top=ballTop+"px";
}
var reverseBall=function(){
	if(ballTop<25){
		var rodPos=rod[0].getBoundingClientRect().left;
		if(ballLeft>=rodPos && ballLeft<=rodPos+200){
			score+=100;
			scoreDisplay.innerHTML=score;
			ballDir=Math.round(Math.random());
			clearInterval(changeMovement);
			changeMovement=setInterval(moveBall,50);
			return;
		}
	}
	if(ballDir==0){
		if(ballLeft<=40){
			ballDir=1;
		}
		ballLeft-=ballAngle;
		ball.style.left=ballLeft+"px";
	}else{
		ballLeft+=ballAngle;
		if(ballLeft>=770){
			ballDir=0;
		}
		ball.style.left=ballLeft+"px";
	}
	if(ballTop<15){
		alert("Your Score = "+score);
		bestScore();
		clearInterval(changeMovement);
		location.reload();
	}
	ballTop-=10;
	ball.style.top=ballTop+"px";
//	console.log("reverseBall",ball.style.top);
}
function bestScore(){
	var bestScore=localStorage.getItem("score")
	if(!bestScore){
		localStorage.setItem("score",score);
		alert("New Best score "+score);
	}else{
	//	console.log("type of",typeof bestScore);
		if(parseInt(bestScore)<score){
			localStorage.setItem("score",score);
			alert("New Best Score "+score);
		}else{
			alert("Best Score is "+bestScore+" Try Again");
		}
	}

}