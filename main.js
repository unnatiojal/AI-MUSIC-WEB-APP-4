song1 = "";
song2 = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
score_of_leftWrist = 0;
status_of_song ="";

function preload() {
    song1 = loadSound("Kasoor-Prateek Kuhad.mp3");
    song2 = loadSound("Something Just Like This .mp3");
}

function setup() {
    canvas = createCanvas(550, 450);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("poseNet is Initialized");
}

function draw() {
    image(video, 0, 0, 550, 450);
    fill('#FF5733');
    stroke('#FF5733');
    status_of_song1 = song1.isPlaying();
    if (score_of_leftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if (status_of_song1 == false) {
            song1.play();
            document.getElementById("song_name").innerHTML = "Song name: Kasoor-Prateek Kuhad";
        }
    }
}

function gotPoses(results) {
    if (results.length>0) {
        score_of_leftWrist = results[0].pose.keypoints[9].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = " + rightWristY);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
    }
}
