
let w=600;
let h=400;
let fp;
if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)) {
 fp=100;

 }
 else {
     fp=100;
 }


    const Video=document.getElementById("video1");
    let alpha=0.5;
    let lipcolor="rgba(78,07,07,.5)"
   let model;
    const setupCam = () =>{
        navigator.mediaDevices.getUserMedia({
            video: {width:w,height:h},
            audio:false,
        }).then(stream => {
            Video.srcObject=stream;
        });
    };
  

const lipst=[57,185,40,39,37,0,267,269,270,409,287,291,308,415,310,311,312,12,82,81,80,191,78,61];

const lipsb=[287,375,321,405,314,17,84,181,91,146,57,61,62,78,95,88,178,87,14,317,402,318,324,308,291];
//const mouth=[78,191,80,81,82,13,312,311,310,415,308,324,318,402,317,14,87,178,88,95];
    const detectFaces = async () => {
        const canvas=document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvas2=document.getElementById("canvas2");
const ctx2=canvas2.getContext("2d");
        await ctx2.drawImage(Video,0,0,w,h);
            const predictions = await model.estimateFaces({
                input: canvas2
            });
            loadvideo.style.display="none";
           // ctx.drawImage(Video,0,0,w,h)
           ctx.clearRect(0,0,w,h);
    if(predictions.length>0){
        predictions.forEach((pred)=>{
            // ctx.beginPath();
            // ctx.lineWidth="1";
            // ctx.strokeStyle= "black";
            // ctx.rect(
            //     pred.boundingBox.topLeft[0],
            //     pred.boundingBox.topLeft[1],
            //     pred.boundingBox.bottomRight[0]-pred.boundingBox.topLeft[0],
            //     pred.boundingBox.bottomRight[1]-pred.boundingBox.topLeft[1] 
            // );
            // ctx.stroke();
           // console.log(ctx);
            // ctx.fillStyle="green";
            // pred.scaledMesh.forEach(mesh =>{
            //     ctx.fillRect(mesh[0],mesh[1],1,1)
            // });
            
            ctx.fillStyle=lipcolor;
            ctx.beginPath();
            lipst.forEach(e=>{
                ctx.lineTo(pred.scaledMesh[e][0],pred.scaledMesh[e][1]);

            })

            ctx.closePath();
           ctx.fill();
           ctx.beginPath();
             lipsb.forEach(e=>{
                ctx.lineTo(pred.scaledMesh[e][0],pred.scaledMesh[e][1]);

            })

            ctx.closePath();
           ctx.fill();
        });
    }
    };
    const loadvideo=document.querySelector(".loadvideo");
    let btn=document.querySelector("#myBtn");
    btn.addEventListener("click",()=> {
        loadvideo.style.display="flex";
        setupCam();
    Video.addEventListener("loadeddata",async () => {
       btn.style.display="none";
        model = await faceLandmarksDetection.load(
            faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);
        setInterval(detectFaces,fp);
    })

})


function changecolor(r,g,b,al) {
    lipcolor="rgba("+r+","+g+","+b+","+al+")";
    let circle1=document.querySelector(".circle1");
    circle1.style.background=lipcolor;
   
}