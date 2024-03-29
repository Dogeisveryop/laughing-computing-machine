monkey="";
meandmaamonkey="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
monkey_play = "";
meandmaamonkey_play = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    monkey = loadSound("monkey.mp3");
    meandmaamonkey = loadSound("meandmymonkey.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("white");
    stroke("black");

    monkey_play = monkey.isPlaying();
    console.log(monkey_play);

    meandmaamonkey_play = meandmaamonkey.isPlaying();
    console.log(meandmaamonkey_play);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        meandmaamonkey.stop();
        if(monkey_play == false){
            monkey.play();
        }
        else{
            console.log("Now playing Sneaky Snitch ");
            document.getElementById("songh").innerHTML = "Now playing Sneaky Snitch ";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        monkey.stop();
        if(meandmaamonkey_play == false){
            meandmaamonkey.play();
        }
        else{
            console.log("Now playing Spining monkey");
            document.getElementById("songh").innerHTML = "Now playing Spining monkey";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}