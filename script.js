let video = document.getElementById('video');
let model;
let canvas =document.getElementById("canvas");
let ctx=canvas.getContext("2d");
const setupCam = () =>{
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio:false,
    }).then(stream => {
        video.srcObject=stream;
    });
};
const detectFaces = async () => {
    const prediction =await model.estimateFaces(video, false);
   // console.log(prediction);

    //ctx.drawImage(video,0,0,video.clientWidth,video.clientHeight);
    ctx.clearRect(0,0,canvas.width,canvas.height)

  prediction.forEach((pred)=> {
        ctx.beginPath();
        ctx.lineWidth="4";
        ctx.strokeStyle= "red";
        ctx.rect(
            pred.topLeft[0],
            pred.topLeft[1],
            pred.bottomRight[0]-pred.topLeft[0],
            pred.bottomRight[1]-pred.topLeft[1] 
        );
        ctx.stroke();
       // console.log(ctx);
        ctx.fillStyle="green";
        pred.landmarks.forEach(landmark =>{
            ctx.fillRect(landmark[0],landmark[1],5,5)
        })
    
    }); 


};
setupCam();
video.addEventListener("loadeddata",async () => {
    model =await  blazeface.load();
    setInterval(detectFaces,100);
})
