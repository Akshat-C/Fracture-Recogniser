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

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/FaWUtr-iv/model.json", modelLoaded);
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
        fracture_name = results[0].label;
        fracture_accuracy = results[0].confidence;
        document.getElementById("fracture_name").innerHTML = fracture_name;
        document.getElementById("accuracy").innerHTML = fracture_accuracy;
        
        if (fracture_name == "Spiral Fracture")
    {
        document.getElementById("fracture_info").innerHTML = "Spiral fractures are fractures that spiral around bone and usually occur in long bones of the body.";
        document.getElementById("cartoon_frac").src = "Spiral.jpg";
    } else if (fracture_name == "Segemental Fracture")
    {
        document.getElementById("fracture_info").innerHTML = "Segmental fractures are fractures that leave behind a floating section of bone because the bone is fractured in 2 or more areas. They mainly occur in the longs bones of the body.";
        document.getElementById("cartoon_frac").src = "Segmental.png";
    } else if (fracture_name == "Comminuted Fracture")
    {
        document.getElementById("fracture_info").innerHTML = "Comminuted fractures is a type of fracture that has resulted in 3 or more breaks on the bone and has fragments of the bone at the fracture site.";
        document.getElementById("cartoon_frac").src = "Comminuted.png";
    } else if (fracture_name == "Greenstick Fracture")
    {
        document.getElementById("fracture_info").innerHTML = "Greenstick fractures are fractures occur when the bone is broken and bent but doesn't seperate into pieces. This fracture mainly occurs in children.";
        document.getElementById("cartoon_frac").src = "Greenstick.jpg";
    } else if (fracture_name == "Transverse Fracture")
    {
        document.getElementById("fracture_info").innerHTML = "Transverse Fractures are fractures that cause breaks which are a straight line through the bone."
        document.getElementById("cartoon_frac").src = "Transverse.png";
    } 
    }
}