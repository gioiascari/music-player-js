console.log("Ok Js:)");
// Utilities
// Playing section
let nowPlaying = document.querySelector(".nowPlaying");
let trackArt = document.querySelector(".track-art");
let trackName = document.querySelector(".track-name");
let trackAuthor = document.querySelector(".track-author");
// Buttons section
let playBtn = document.querySelector(".playPause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");
let repeatBtn = document.querySelector(".repeat-track");
let randomBtn = document.querySelector(".random-track");
// Volume up/down, current time section
let seekSlider = document.querySelector(".seek-slider");
let volumeSlider = document.querySelector(".volume-slider");
let currentTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");
let waves = document.getElementById("waves");
let currentTrack = document.createElement("audio");

// /Utilities

let trackI = 0;
let isPlaying = false;
let isRandom = false;
let timer;

//Music List
const musicList = [
  {
    author: "Alan Walker",
    song: "Faded",
    audio: "audio/music_Faded.mp3",
    image: "img/faded.png",
  },
];

loadTrack(trackI);

function loadTrack(trackI) {
  clearInterval(timer);
  reset();
  //   Inizializzo i componenti per inserirci i dati
  currentTrack.src = musicList[trackI].audio;
  currentTrack.load();
  //   Inserisco ad ogni canzone i dati adatti
  trackArt.style.backgroundImage = "url(" + musicList[trackI].image + ")";
  trackName.textContent = musicList[trackI].song;
  trackAuthor.textContent = musicList[trackI].author;
  // Indice che mi riferisce quale canzone sto ascoltando sulla parte superiore del player
  nowPlaying.textContent =
    "Playing music" + (trackI + 1) + "Of" + musicList.length;
  timer = setInterval(setUpdate, 1000);
  currentTrack.addEventListener("ended" + nextBtn);

  randomColor(); //Funzione sfondo randomico
}

// Creo una funzione che mi crea uno sfondo randomico ogni volta che la pagina viene ricaricata
function randomColor() {
  //Hex color per generare uno sfondo randomico
  let hexValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
  let hex;
  function rColor(hex) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * hexValue.length);
      let y = hex[x];
      hex += y;
    }
    return hex;
  }
  let color1 = rColor("#");
  let color2 = rColor("#");
  let angle = "to right";
  let gradientColor =
    "linear-gradient(" + angle + "," + color1 + "," + color2 + ")";
  //Inserisco il colore generato come background color del body
  document.body.style.background = gradientColor;
}
function reset() {
  currentTime.textContent = "00:00";
  totalDuration.textContent = "00:00";
  seekSlider.value = 0;
}
// Function random track
function randomTrack() {
  isPlaying ? pauseRandom() : playRandom();
}
function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}

function repeatTrack() {
  let currentI = trackI;
  loadTrack(currentI);
  playTrack(); // all'interno ci inserisco anche la funzione per far partire il brano
}

function playPauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  currentTrack.play();
  isPlaying = true;
  trackArt.classList.add("rotate");
  waves.classList.add("loader");
  playBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
