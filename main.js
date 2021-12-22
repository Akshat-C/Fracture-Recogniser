Webcam.set({
    height: 220,
    width: 220,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

i = 0;

function capture_img()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_img' src="+data_uri+">";
    });

    if (i >= 1)
    {
        document.getElementById("fracture_info").innerHTML = "";
        document.getElementById("member_name").innerHTML = "";
        document.getElementById("accuracy").innerHTML = "";
    }
    
}

console.log("ml5 version is:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Gkk3cF6_q/model.json", modelLoaded);
function modelLoaded()
{
    console.log("Model is loaded");
}

function recognise_img() 
{
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResults);
}

function gotResults(error, results)
{
    if (error)
    {
        console.error(error);
    } else
    {
        console.log(results);
        document.getElementById("member_name").innerHTML = results[0].label;
        accur = results[0].confidence*100;
        document.getElementById("accuracy").innerHTML = accur.toFixed(2) + "% ";
    }

    if (results[0].label == "Fracture")
    {
        document.getElementById("fracture_info").innerHTML = "A fracture occurs when a bone is broken due to an accident or fall. Fractures can happen anywhere there are bones but mostly happen in the bones of the arms or legs. They can take a few weeks or months to heal depending on their severity.";
        i++;
    }
}