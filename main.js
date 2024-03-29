function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    classifier = ml5.imageClassifier('MobilNet', modelLoaded);
}

function modelLoaded() {
    console.log("Modelo cargado!");
}

function draw() {
    image(video, 0, 0, 300, 300);
    classifier.imageClassifier(video, gotResult);
}

previus_results = "";

function gotResult() {
    if (error) {
        console.log(error);
    } else if ((results[0].confidence > 0.5) && (previus_results != results[0].lebel)) {
        console.log(results);
        previus_results = results[0].label;
        var synth = window.speechSynthesis;
        speak_data = "El objeto detectado es - " + result[0].label;
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
        
        document.getElementById('result_object_name').innerHTML = results[0].label;
        document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}