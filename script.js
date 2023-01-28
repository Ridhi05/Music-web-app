song="";
function preload(){
    song=loadSound("Music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(600,500);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
    
}
rightWristScore=0;
function modelLoaded(){
    console.log("PoseNet is Initialised");
}
rightWristX=0;
rigthWristY=0;
leftWristX=0;
leftWristY=0;
function gotPoses(results){
if(results.length>0){
    console.log(results);
leftWristX=results[0].pose.leftWrist.x;
leftWristY=results[0].pose.leftWrist.y;
rightWristX=results[0].pose.rightWrist.x;
rightWristY=results[0].pose.rightWrist.y;
console.log("Left Wrist X="+leftWristX+"Left Wrist Y="+leftWristY);
console.log("Right Wrist X="+rightWristX+"Right Wrist Y="+rightWristY);
leftWristScore=results[0].pose.keypoints[9].score;
rightWristScore=results[0].pose.keypoints[10].score;

}
}
leftWristScore=0;

function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("black");
   
if(leftWristScore>0.2){
    circle(leftWristX,leftWristY,20);
    number=Number(leftWristY);
    remove_decimal=floor(number);
    volume=remove_decimal/500;
    document.getElementById("volume1").innerHTML="Volume= "+volume;
    song.setVolume(volume);
}
if(rightWristScore>0.2){
    fill("blue");
    stroke("black");
    circle(rightWristX,rightWristY,20);
    if(rightWristY>0 && rightWristY<100){
        document.getElementById("speed1").innerHTML="Speed=0.5x";
        song.rate(0.5);
    }
        else if (rightWristY>100 && rightWristY<200){
            document.getElementById("speed1").innerHTML="Speed=1.0x";
            song.rate(1);
    }
    else if(rightWristY>200 && rightWristY<300){
        document.getElementById("speed1").innerHTML="Speed=1.5x";
        song.rate(1.5);
    }
        else if(rightWristY>300 && rightWristY<400){
            document.getElementById("speed1").innerHTML="Speed=2.0x";
            song.rate(2);
        }
        else if(rightWristY>400){
            document.getElementById("speed1").innerHTML="Speed=2.5x";
            song.rate(2.5);
        }
}

}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);

}