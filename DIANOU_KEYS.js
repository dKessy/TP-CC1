"use strict";


const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;




$maxUsr.setAttribute("value", 0);
$numUsr.setAttribute("value", 0); 

function launchGame(_evt) {
  const nb_max = parseInt($maxUsr.value); 
  secretNumber = Math.floor(Math.random() * nb_max) + 1; 
  maxGuesses = Math.floor(Math.random() * nb_max) + 1; 
  $guessBtn.removeAttribute("disabled"); 
  $output.innerHTML = `<p class="game-start">Vous disposer de ${maxGuesses} essais.</p>`;
  if (nbGuesses === maxGuesses) { 
    $output.innerHTML += `<p>Vous avez perdu. Le nombre mystère était ${secretNumber}</p>`;
    $guessBtn.disabled = true;
  }

  function check(_evt) {
    
    
    if ($numUsr.value > maxGuesses && $numUsr.value < 0) { 
      $output.innerHTML += `Erreur L'entrée doit être dans l'intervalle donnée</p>`;
    } else if ($numUsr.value === secretNumber) { 
      $output.innerHTML += `<p >!!! Vous avez réussi avec ${nbGuesses} essais !!!</p>`;
      $guessBtn.disabled = true; 
      $guessBtn.removeEventListener("click");
    } else if ($numUsr.value > secretNumber) { 
      nbGuesses++ ;
      $output.innerHTML += `Trop grand.</p>`;
    } else if ($numUsr.value < secretNumber) { 
      nbGuesses++ ;
      $output.innerHTML += ` trop petit.</p>`;
    }
  }
  $guessBtn.addEventListener("click", check);
}

$startBtn.addEventListener("click", launchGame);



function addCow(evt) {
  console.debug(evt.x, evt.y);
  const imgCow = document.createElement("img");
  let posYScrollBar = window.scrollY;
  imgCow.src = "https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg";
  imgCow.alt = "Vache";
  imgCow.classList.add('cow');
  const angleAleatoire = Math.random() * 360;
  imgCow.style.position = 'absolute';
  imgCow.style.transform = `rotate(${angleAleatoire}deg)`; 
  imgCow.style.left = (evt.clientX - imgCow.width / 2) + 'px';
  imgCow.style.top = ((evt.clientY + posYScrollBar) - imgCow.height / 2) + 'px';
  document.body.appendChild(imgCow);
}

function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
  } else {
    document.onmousedown = addCow;
  }
}
$cowBtn.addEventListener("click", toggleCow);

