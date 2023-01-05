


const fileInput = document.querySelector("#imageFileInput");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");


const brightnessInput = document.querySelector("#brightness");
const saturationInput = document.querySelector("#saturation");
const blurInput = document.querySelector("#blur");
const contrastInput = document.querySelector("#contrast");
const sepiaInput = document.querySelector("#sepia");
const inversionInput = document.querySelector("#inversion");
const grayscaleInput = document.querySelector("#grayscale");
const opacityInput = document.querySelector("#opacity");


/* let arnyek = document.getElementById("arnyek");
let arnyek1 = document.getElementById("arnyek1");
let arnyek2 = document.getElementById("arnyek2"); */

const settings = {};
let image = null;

function resetSettings() {
  settings.brightness = "100";
  settings.saturation = "100";
  settings.blur = "0";
  settings.inversion = "0";
  /* arnyek.value = "0";
  arnyek1.value = "0";
  arnyek2.value = "13"; */
  settings.opacity = "100";
  settings.grayscale = "0";
  settings.contrast = "100";
  settings.sepia = "0";

  brightnessInput.value = settings.brightness;
  saturationInput.value = settings.saturation;
  blurInput.value = settings.blur;
  grayscaleInput.value = settings.grayscale;
  inversionInput.value = settings.inversion;
  opacityInput.value = settings.opacity;
  contrastInput.value = settings.contrast;
  sepiaInput.value = settings.sepia;
}

function updateSetting(key, value) {
  if (!image) return;

  settings[key] = value;
  renderImage();
}

function generateFilter() {
  const { brightness, saturation, blur, inversion, sepia, grayscale, contrast, opacity } = settings;

  return `brightness(${brightness}%)
          saturate(${saturation}%)
          blur(${blur}px)
          invert(${inversion}%)
          sepia(${sepia}%)
          grayscale(${grayscale}%)
          contrast(${contrast}%)
          opacity(${opacity}%)`;
}

function renderImage() {
  canvas.width = image.width;
  canvas.height = image.height;

  ctx.filter = generateFilter();
  ctx.drawImage(image, 0, 0);
  
}

brightnessInput.addEventListener("change", () =>
  updateSetting("brightness", brightnessInput.value)
);
saturationInput.addEventListener("change", () =>
  updateSetting("saturation", saturationInput.value)
);
blurInput.addEventListener("change", () =>
  updateSetting("blur", blurInput.value)
);
inversionInput.addEventListener("change", () =>
  updateSetting("inversion", inversionInput.value)
);
opacityInput.addEventListener("change", () =>
  updateSetting("opacity", opacityInput.value)
);
grayscaleInput.addEventListener("change", () =>
  updateSetting("grayscale", grayscaleInput.value)
);
contrastInput.addEventListener("change", () =>
  updateSetting("contrast", contrastInput.value)
);
sepiaInput.addEventListener("change", () =>
  updateSetting("sepia", sepiaInput.value)
);


// FELTÖLTÉS

fileInput.addEventListener("change", () => {
  image = new Image();

  image.addEventListener("load", () => {
    resetSettings();
    renderImage();
  });

  image.src = URL.createObjectURL(fileInput.files[0]);
});

resetSettings();

// VÁGÁS

document.getElementById("cropBtn").addEventListener("click", cropFunction);


function cropFunction(){
  const cropper = new Cropper(image,{
    aspectRatio: 1,
    viewMode: 0,
  });
  var croppedImage = cropper.getCroppedCanvas().toDataURL("image/png")

  image.src = croppedImage;
}


// LETÖLTÉS
let download = document.getElementById("download");

download.addEventListener("click", downloadCanvas);
var anchor = document.createElement("a");

function downloadCanvas(){
    anchor.href = canvas.toDataURL("image/png");
    anchor.download = "IMAGE.PNG";
    anchor.click()
} 


// FORGATÁS
const noFlipBtn = document.querySelector("#no-flip");
const flipXBtn = document.querySelector("#flip-x");
const flipYBtn = document.querySelector("#flip-y");

let radioBtns = document.querySelectorAll(".flip-option input[type='radio']");
radioBtns.forEach( radioBtn => {
    radioBtn.addEventListener("click", flipImage);
});

function flipImage(){
    if(flipXBtn.checked){
      ctx.clearRect(0, 0, canvas.width, canvas.height)
  
      ctx.save();
      ctx.scale(1, -1);
      ctx.drawImage(image, 0, image.height*-1, image.width, image.height);
      ctx.restore();
      
    }
    else if(flipYBtn.checked){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
  
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(image, image.width * -1, 0, image.width, image.height);
        ctx.restore();
    }
    else{
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    
        ctx.save();
        ctx.scale(1, 1);
        ctx.drawImage(image, 0, 0);
        ctx.restore();
    }
}


// ÁNYÉKOK
let arnyekok = document.querySelectorAll(".arnyekok input[type='range']");
arnyekok.forEach( slider => {
slider.addEventListener("click", shadowSlider);

function shadowSlider(){
    
    image.style.filter= `drop-shadow(${arnyek.value}px ${arnyek1.value}px ${arnyek2.value}px ${coloris.value})`;
    
}
});









$(document).ready(function(){
  $('#save').on('click', function(e){
    e.preventDefault()
    const dataURL = canvas.toDataURL();
    
      $.ajax({
        type:'POST',
        url: '/images/save/',
        data: {img:dataURL},
        
        success: function(data){
          alert('Nem vagy bejelentkezve!')
        },
        error: function(err){
          console.log(err);
        }
      })
   

      
    
   
   
   /*  
   

    console.log(base64)
    console.log(base64)
    */
    /* var request = new XMLHttpRequest();
    request.open("POST", "/images/save/", true);
    request.setRequestHeader('Content-Type', 'multipart/form-data');
    var data = new FormData();
    
    data.append("image", blobUtil, "imagename");
    request.send(data); */
  });
});

const img = document.querySelector("#someImage");


    var link = document.getElementById("link");
    link.addEventListener('click', function(){
      img.src = canvas.toDataURL("image/png");
    });



















 /*
var img = new Image();
img.crossOrigin = ""; 
img.onload = draw; 
img.src = "//i.imgur.com/WblO1jx.jpg";



function  draw(homaly,
              kontraszt,
              fenyerosseg, 
              szurkearnyalat,
              atlatszosag,
              inverz,
              telitettseg,
              szinarnyalat,
              sepia) {
  
      
      

  canvas.width = this.width;
  canvas.height = this.height;
  
  // filter
  if (typeof ctx.filter !== "undefined") {
    ctx.filter = `blur(${homaly}px)
                  contrast(${kontraszt}%)
                  brightness(${fenyerosseg}%)
                  grayscale(${szurkearnyalat}%)
                  opacity(${atlatszosag}%)
                  invert(${inverz}%)
                  saturate(${telitettseg}%)
                  hue-rotate(${szinarnyalat}deg)
                  sepia(${sepia}%) `;
    console.log(ctx.filter)
    ctx.drawImage(this, 0, 0);
  }
  else {
    ctx.drawImage(this, 0, 0);
    // TODO: manually apply filter here.
  }

  document.querySelector("img").src = canvas.toDataURL();
}

*/

// SLIDEREK
/* let sliders = document.querySelectorAll(".filter input[type='range']");
sliders.forEach( slider => {
    slider.addEventListener("input", addFilter);
}); */

/* function addFilter(){
    ctx.filter = 
    `blur(${homaly.value}px)
     contrast(${kontraszt.value}%) 
     brightness(${fenyerosseg.value}%) 
     grayscale(${szurkearnyalat.value}%) 
     opacity(${atlatszosag.value}%) 
     invert(${inverz.value}%) 
     saturate(${telitettseg.value}%) 
     hue-rotate(${szinarnyalat.value}deg) 
     sepia(${sepia.value}%)`;
     console.log(ctx.filter)
     img.onload = draw(homaly.value,
                      kontraszt.value,
                      fenyerosseg.value, 
                      szurkearnyalat.value,
                      atlatszosag.value,
                      inverz.value,
                      telitettseg.value,
                      szinarnyalat.value,
                      sepia.value)
} */




// RESET
/* function resetFilter(){
    arnyek.value = "0";
    arnyek1.value = "0";
    arnyek2.value = "13";
    fenyerosseg.value = "100";
    atlatszosag.value = "100";
    szurkearnyalat.value = "0";
    inverz.value = "0";
    telitettseg.value = "100";
    homaly.value = "0";
    kontraszt.value = "100";
    szinarnyalat.value = "0";
    sepia.value = "0";
    noFlipBtn.checked = true;
    addFilter();
    flipImage();
} */

// FELTÖLTÉS
/* let imageDownloadSrc
let imageName
uploadButton.onchange = () => {
    
    resetFilter();
    document.querySelector(".image-container").style.display = "block";
    let reader = new FileReader();
    reader.readAsDataURL(uploadButton.files[0]);
    imageName = uploadButton.files[0].name;
    reader.onload = () => {
        image.setAttribute("src", reader.result);
        imageDownloadSrc = reader.result
    }
} */


/* async function downloadImage() {
    const imageSRC = await fetch(imageDownloadSrc)
    const imageBlog = await imageSRC.blob()
    const imageURL = URL.createObjectURL(imageBlog)
  
    const link = document.createElement('a')
    link.href = imageURL
    link.download = imageName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } */