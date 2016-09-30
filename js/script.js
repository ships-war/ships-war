function getElem(id){
 var elem;
	function getNode() {
	elem = document.getElementById(id);
		if(elem === null){
			elem = document.getElementsByClassName(id);
			for (var i = 0; i<elem.length; i++){
				elem[i].allStyle = getCss(elem[i]);
			}
		}else{
			elem.allStyle = getCss(elem);
		}
	return elem;
	}
	function getCss(obj){
		return getComputedStyle(obj);
	}
		return getNode();
}
function startGame(){
	restart();
	displayIni(display);
	timeOut = setTimeout(displayClose, 5000);
	sonar.addEventListener("click", getFireCoord);
	sonar.addEventListener("click", radarGo);
	fireButton.addEventListener("click", rocketFire);
}
function showInstruction(){
	var history = 'ТРИВОГА! \nГрупа ворожих кораблів, порушила наш кордон.\nУсі кораблі зберігають режим радіомовчання. ';
	var about = 'Правила гри \"THE SHIPS WAR\" прості.\nПлісля натискання на кнопку \"НОВА ГРА\" на сонарі Вашого корабля зявиться розсташування кораблів противника.\nУ Вас буде 5 сек. щоб запам\'ятати координати їх розміщення, після чого вибираючи координати на екрані або вводячи вручну на панелі приборів знищіть ворога.\nДля запуску ракети натискайте червону кнопку ВОГОНЬ!';
	alert(history+'\n\n'+about);
}
function counter(){
	var count = 0;
	return function(){
		return count++;
	}
}
function random(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function displayIni(obj){
	var number = counter();
	// var rand;
	for(var i = 0; i<obj.length; i++){
		if (obj[i].innerText){
			obj[i].classList.add("coord");
		} else if(!obj[i].innerText){
			obj[i].classList.add("ini");
			setShips(obj[i]);
		}
	}
}

function setShips(obj){
	var rand = random(0, 10);
			if(!rand){
				obj.classList.add("ship");
				rockets++;
				enemyShips++;
				enemy.innerText = enemyShips+"";
				shipRockets.innerText = rockets+"";
			}
}

function displayClose(){
	for(var i = 0; i<display.length; i++){
		display[i].style.backgroundSize = "0";
	}
}
function getFireCoord(){
	var element = event.target;
	var coord = getCoord();
	function getCoord(){
		var leftSibling=element;
		var leftPosition;
		var topPosition;
		for(var i = 1; i<=10; i++){
			leftSibling = leftSibling.previousElementSibling;
			if (leftSibling.innerText !== ""){
				leftPosition = leftSibling.innerText;
				topPosition = i+"";
				break;
			}
		}
		return [leftPosition, topPosition];
	}
	function panelSetCoord(){
		for(var i = 0; i<coord.length; i++){
			sonarPanelCoord[i].value = coord[i];
		}
	}
	return panelSetCoord();
}

function rocketFire(){
	if(!rockets){
		alert("Ви програли, ракет більше немає :(");
		return;
	}
	var point = [];
	for(var i = 0; i<sonarPanelCoord.length; i++){
		point[i]=sonarPanelCoord[i].value.toUpperCase();
	}
	function shipCoord(){
		var leftPosition;
		var topPosition;
		for(var i = 0; i<display.length; i++){
			if(display[i].innerText.toUpperCase() === point[0]){
				leftPosition = display[i];
				topPosition = leftPosition.parentElement;
				rockets --;
				shipRockets.innerText = rockets+"";
				return topPosition.children[+point[1]];
			}
		}
	}
	function isShip(){
		var x = shipCoord();
		if(x.classList.contains("ship")){
			x.classList.remove("ship");
			x.classList.add("ship_dead");
			enemyShips--;
			enemy.innerText = enemyShips+"";
			if(!enemyShips){
				alert("Противника Знищенно.\nПЕРЕМОГА!");
			}
		} else if(!x.classList.contains("ship_dead")){
			x.classList.add("miss");

		}
		x.style.backgroundSize = "";
	}
	return isShip();
}
function radarGo(){
		radar.style.transition ="all "+(rockets*10)+"s";
		radar.style.transitionTimingFunction = "linear";
		radar.style.transform = "rotate("+(rockets+"")+"turn)";
}
function restart(){
	enemyShips = 0;
	rockets=5;
	enemy.innerText ="00";
	shipRockets.innerText = "00";
	radar.style.transition ="";
	radar.style.transitionTimingFunction = "";
	radar.style.transform = "";
	clearTimeout(timeOut);
	for(var i = 0; i<display.length; i++){
		display[i].style.backgroundSize="";
		if(display[i].classList.contains("ship")){
		 display[i].classList.remove("ship");
		}
		if(display[i].classList.contains("miss")) {
			display[i].classList.remove("miss");
		}
		if(display[i].classList.contains("ship_dead")) {
			display[i].classList.remove("ship_dead");
		}
	}
}

var start = getElem("start");
var instruction = getElem("instruction");
instruction.addEventListener("click", showInstruction);
start.addEventListener("click", startGame);

var enemyShips = 0;
var rockets=5;
var timeOut;
var display = getElem("gird_coord");
var sonar = getElem("sonar");
var radar = getElem("game__radar");
var enemy = getElem("enemy");
var shipRockets = getElem("rockets");
var sonarPanelCoord = getElem("panel_getcoord");
var fireButton = getElem("fire");
