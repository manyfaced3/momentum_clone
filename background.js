const body = document.querySelector("body");

const IMG_NUM = 5;

function paintImg(number){
  const image = new Image();
  image.src = `images/${number}.jpg`;
  image.classList.add('bgImg');
  body.appendChild(image);
}

function getRandomNum(){
  const number = Math.floor(Math.random()*IMG_NUM)+1; 
  return number;
}

function init(){
  const randomNumber = getRandomNum();
  paintImg(randomNumber);
}

init();
