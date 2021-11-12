//https://teachablemachine.withgoogle.com/models/phRonRFc4/

prediction1="";
prediction2="";
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
    
});
camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'">';
});
}
console.log("ml5version:"+ ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/phRonRFc4/model.json",modelLoaded);

function modelLoaded(){
    console.log("modelLoaded");
}

    function speak(){
        var synth=window.speechSynthesis;
        speak_data1="The first Prediction is "+prediction1;
        speak_data2="And the second Prediction is "+prediction2;
        var utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
        synth.speak(utterThis);
    }
function check(){
img=document.getElementById("capture_image");
classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if(results[0].label=="Peace"){
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }
        if(results[0].label=="Super"){
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
        if(results[0].label=="Thumbs Up "){
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
        
        if(results[1].label=="Peace"){
            document.getElementById("update_emoji2").innerHTML="&#9996;";
        }
        if(results[1].label=="Super"){
            document.getElementById("update_emoji2").innerHTML="&#128077;";
        }
        if(results[1].label=="Thumbs Up"){
            document.getElementById("update_emoji2").innerHTML="&#128076;";}
    }
    
}