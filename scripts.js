let checkCoins = false; //variable de control de las monedas insertadas
let insertCoin; //variable que localiza el botón de insertar monedas (para activarlo o no)
let coinsInserted; //variable que cuenta las monedas del usuario

//Función para leer las monedas que inserta el ususario
function readCoins() {
  exitExplain();
  coinsInserted = parseInt(prompt("Inserta monedas"));
  if (coinsInserted < 1 || isNaN(coinsInserted)) {
    do {
      coinsInserted = prompt("Cantidad incorrecta, vuelve a insertar monedas");
    } while (coinsInserted < 1 || isNaN(coinsInserted));
  }
  checkCoins = true;
  //localizamos el elemento y lo ocultamos para que no se puedan introducir más monedas
  insertCoin = document.getElementById("insertcoin");
  insertCoin.style.display = "none";
}

//Función que muestra las monedas que quedan
function showList() {
  exitExplain();
  if (coinsInserted < 1 || isNaN(coinsInserted)) {
    alert("No tienes monedas");
  } else {
    alert("Te quedan " + coinsInserted + " monedas");
  }
}

//Creación del array de frutas
var imgArray = new Array();
imgArray[0] = new Image();
imgArray[0].src = "img/aguacate.png";
imgArray[1] = new Image();
imgArray[1].src = "img/ajo.png";
imgArray[2] = new Image();
imgArray[2].src = "img/cebolla.png";
imgArray[3] = new Image();
imgArray[3].src = "img/pepino.png";
imgArray[4] = new Image();
imgArray[4].src = "img/puerro.png";
imgArray[5] = new Image();
imgArray[5].src = "img/tomate.png";
imgArray[6] = new Image();
imgArray[6].src = "img/zanahoria.png";

//Función para crear imagen
function createImage(index, rndNumber) {
  var imageFruit = document.createElement("IMG");
  imageFruit.setAttribute("src", imgArray[rndNumber].src);
  imageFruit.setAttribute("width", "300");
  imageFruit.setAttribute("height", "300");
  imageFruit.setAttribute("id", index); //van del 1 al 3
  imageFruit.style.padding = "40px 10px 15px 25px";
  imagescontainer.appendChild(imageFruit);
}

//Función que crea las 3 primeras imágenes iniciales con el botón TIRAR
function startImage() {
  exitExplain();
  imagescontainer.style.display = "block";
  let totalCoins = document.getElementById("totalcoins");
  if (checkCoins === true) {
    imagescontainer = document.getElementById("imagescontainer");
    while (imagescontainer.hasChildNodes()) {
      imagescontainer.removeChild(imagescontainer.lastChild);
    }

    for (var index = 0; index < 3; index++) {
      var initialRandom = Math.floor(Math.random() * 7);
      createImage(index + 1, initialRandom);
    }

    //Restamos la moneda por cada tirada
    coinsInserted = coinsInserted - 1;

    //Llamamos a la función que almacena los resultados de monedas ganas en cada tirada
    getCoins();

    //Vamos mostrando el total de monedas para cada tirada
    totalCoins.innerText = "TOTAL MONEDAS: " + coinsInserted;

    if (coinsInserted < 1) {
      checkCoins = false;
      totalCoins.innerText = "";
    }
  } else {
    alert("Debes introducir monedas para poder jugar");
    insertCoin = document.getElementById("insertcoin");
    insertCoin.style.display = "block";
    totalCoins.innerText = "";
  }
}

//Función con la que el usuario gana dinero
function getCoins() {
  let image1 = document.getElementById("1");
  let image2 = document.getElementById("2");
  let image3 = document.getElementById("3");

  var coinsArray = new Array();
  coinsArray[0] = image1;
  coinsArray[1] = image2;
  coinsArray[2] = image3;

  var carrotCounter = 0;
  var othersCounter = 0;

  //Control de zanahorias
  for (var index = 0; index < coinsArray.length; index++) {
    if (coinsArray[index].src === imgArray[6].src) {
      carrotCounter++;
    }
  }

  //Control de otros
  for (var index2 = 0; index2 < coinsArray.length - 2; index2++) {
    if (carrotCounter <= 1) {
      if (
        coinsArray[index2].src === coinsArray[index2 + 1].src ||
        coinsArray[index2 + 1].src === coinsArray[index2 + 2].src ||
        coinsArray[index2].src === coinsArray[index2 + 2].src
      ) {
        if (
          carrotCounter === 0 &&
          coinsArray[index2].src === coinsArray[index2 + 1].src &&
          coinsArray[index2 + 1].src === coinsArray[index2 + 2].src &&
          coinsArray[index2].src === coinsArray[index2 + 2].src
        ) {
          othersCounter++;
        }
        othersCounter++;
      }
    }
  }

  //Suma de las monedas
  if (carrotCounter === 1 && othersCounter === 1) {
    coinsInserted += 3;
    showResults(3, coinsInserted);
  } else if (carrotCounter === 2) {
    coinsInserted += 4;
    showResults(4, coinsInserted);
  } else if (carrotCounter === 3) {
    coinsInserted += 10;
    showResults(10, coinsInserted);
  } else if (carrotCounter === 0 && othersCounter === 1) {
    coinsInserted += 2;
    showResults(2, coinsInserted);
  } else if (othersCounter === 2) {
    coinsInserted += 5;
    showResults(5, coinsInserted);
  } else if (carrotCounter === 1) {
    coinsInserted += 1;
    showResults(1, coinsInserted);
  }
}

//Función para mostrar la lista de las tiradas
function showResults(counter, coinsInserted) {
  exitExplain();
  var resultsList = document.getElementById("resultslist");
  var li = document.createElement("LI");
  if (counter === 1) {
    li.innerHTML = "Gana " + counter + " moneda";
  } else {
    li.innerHTML = "Gana " + counter + " monedas";
  }

  resultsList.appendChild(li);

  var counterChild = document.getElementById("resultslist").childElementCount;

  if (counterChild === 5) {
    resultsList.removeChild(resultsList.firstChild);
  }
}

//Función para mostrar las instrucciones
function explain() {
  textButton = document.getElementById("textButton");
  textButton.style.display = "block";
}

//Función para ocultar las instrucciones
function exitExplain() {
  textButton = document.getElementById("textButton");
  textButton.style.display = "none";
}
