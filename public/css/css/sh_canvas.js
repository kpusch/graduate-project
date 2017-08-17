
var picture = {
canvas : null,
context : null
};
/**
 * 0 : 펜
 * 1 : 직선
 * 2 : 사각형
 */
var eventObject = {
mode: 0,
click : false,
x: 0,
y: 0,
};
 
// 초기화
window.onload = function() {
 
document.getElementById("loadImg").addEventListener("change", loadImg, false);
picture.canvas = document.getElementById("canvas");
picture.context = picture.canvas.getContext("2d");
mouseListener();
}
 
function ccan()
{	
	removeEvent();
	canvas.width = canvas.width;
}

// 클릭중인지 확인하기 위한 변수
function setClickTrue(){
eventObject.click = true;
}
function setClickFalse(){
eventObject.click = false;
}
 
// 펜일 경우 처리
function dragEvent(event) {
var g = picture.context;
 
g.moveTo(eventObject.x, eventObject.y);
eventObject.x = event.x;
eventObject.y = event.y;
if (eventObject.click) {
g.lineTo(event.x, event.y);
g.stroke();
}
}
 
// 좌표 출력시
function printXY(e){
var g = picture.context;
document.getElementById("x").innerHTML = e.x;
document.getElementById("y").innerHTML = e.y;
}
 
// 라인, 사각형 등 이전 좌표 필요시
function setBeforeXY(e){
var g = picture.context;
eventObject.x = e.x;
eventObject.y = e.y;
g.moveTo(e.x, e.y);
}
 
// setBeforeXY 에서 준 좌표부터 현재 좌표까지 직선 그림
function drawLine(e){
var g = picture.context;
g.lineTo(e.x, e.y);
g.stroke();
}
 
// setBeforeXY에서 세팅한 좌표부터 현재 좌표까지 사각형 그림
function drawRect(e){
var g = picture.context;
g.rect(eventObject.x, eventObject.y, e.x-eventObject.x, e.y-eventObject.y);
g.stroke();
// g.fill(); 을  g.stroke() 대신 사ㅛㅇㅇ하면 속이 꽉찬 사각형을 그린다.
}
 
// 각 경우에 따라서 이벤트리스너를 달아준다.
function mouseListener(){
var mode = Number(eventObject.mode);
picture.canvas.addEventListener("mousemove", printXY, false);
switch(mode){
case 0:
document.getElementById("mode").innerHTML = "pen";
picture.canvas.addEventListener("mousedown",setClickTrue, false);
picture.canvas.addEventListener("mouseup", setClickFalse, false);
picture.canvas.addEventListener("mousemove", dragEvent, false);
break;
case 1:
document.getElementById("mode").innerHTML = "line";
picture.canvas.addEventListener("mousedown",setBeforeXY, false);
picture.canvas.addEventListener("mouseup", drawLine, false);
break;
case 2:
document.getElementById("mode").innerHTML = "rect";
picture.canvas.addEventListener("mousedown",setBeforeXY, false);
picture.canvas.addEventListener("mouseup", drawRect, false);
break;
default:
break;
}
}
 
// 이벤트 리스너 제거
function removeEvent(){
picture.canvas.removeEventListener("mousedown",setClickTrue, false);
picture.canvas.removeEventListener("mouseup", setClickFalse, false);
picture.canvas.removeEventListener("mousemove", dragEvent, false);
picture.canvas.removeEventListener("mousedown",setBeforeXY, false);
picture.canvas.removeEventListener("mouseup", drawLine, false);
picture.canvas.removeEventListener("mouseup", drawRect, false);
}
 
// 모드 체인지
function changeMode(mode){
removeEvent();
eventObject.mode = mode;
mouseListener();
}
 
//////////////////////////////////////////////////////////////////////////////
// 이미지 파일 가져오기
function loadImg(e){
var file = e.target.files[0];
var fileReader = new FileReader();
fileReader.readAsDataURL(file);
fileReader.onload = function() {
var output = new Image();
output.src = fileReader.result;
picture.context.drawImage(output, 0,0,600,800);
picture.context.stroke();
};
}
 
// canvas 화면 저장
function save(){
var image = picture.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
document.getElementById("data").innerHTML = image;
window.location.href=image;
}