/**生成一个随机数**/
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
/**生成一个随机色**/
function randomColor(min, max) {
    let r = randomNum(min, max);
    let g = randomNum(min, max);
    let b = randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
}
let nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
], str = '';
// 绘制验证码
function drawCode(str){
    let canvas = document.getElementById("verifyCanvas"); //获取HTML端画布
    let context = canvas.getContext("2d"); //获取画布2D上下文
    //context.fillStyle = randomColor(180, 240); //画布填充色
    context.fillStyle = '#c4e9fa'
    context.fillRect(0, 0, canvas.width, canvas.height); //清空画布
    context.fillStyle =  '#3eb7ef';//设置字体颜色
    context.font = randomNum(25, 30) + 'px Verdana'; //设置字体
    let rand = new Array();
    let x = new Array();
    let y = new Array();
    for (let i = 0; i < 4; i++) {
        rand.push(rand[i]);
        rand[i] = nums[Math.floor(Math.random() * nums.length)]
        x[i] = i * 20 + 10;
        y[i] = Math.random(10, 10) * 10 + 30;
        context.fillText(rand[i], x[i], y[i]);
    }
    str = rand.join('').toUpperCase();
	//画3条随机线
//    for (let i = 0; i < 4; i++) {
//        drawline(canvas, context);
//    }
    // 画30个随机点
//    for (let i = 0; i < 90; i++) { 
//        drawDot(canvas, context);
//    }
    convertCanvasToImage(canvas);
    return str;
}

// 随机线
function drawline (canvas, context) {
    context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)); //随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
    context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)); //随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
    context.lineWidth = 0.5; //随机线宽
    context.strokeStyle = 'rgba(50,50,50,0.3)'; //随机线描边属性
    context.stroke(); //描边，即起点描到终点
}
// 随机点
function drawDot (canvas, context) {
    let px = Math.floor(Math.random() * canvas.width);
    let py = Math.floor(Math.random() * canvas.height);
    context.moveTo(px, py);
    context.lineTo(px + 1, py + 1);
    context.lineWidth = 0.2;
    context.stroke();
}
// 绘制图片
function convertCanvasToImage (canvas) {
    document.getElementById("verifyCanvas").style.display = "none";
    let image = document.getElementById("code_img");
    image.src = canvas.toDataURL("image/png");
    return image;
}
function resetCode () {
    $('#verifyCanvas').remove();
    $('#code_img').before('<canvas width="100%" height="44" id="verifyCanvas"></canvas>')
    verVal = drawCode();
    console.log(verVal)
    sessionStorage.setItem("graphCode", hex_md5(verVal.toLowerCase()))
}