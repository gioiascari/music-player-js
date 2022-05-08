console.log("Ok Js:)");
// Utilities
// Playing section
let nowPlaying = document.querySelector(".now-playing");
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
let current_Time = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");
let randomIcon = document.querySelector(".fa-random");
let waves = document.getElementById("waves");
let currentTrack = document.createElement("audio");

// /Utilities

let trackI = 0;
let isPlaying = false;
let isRandom = false;
let timer_loader;

//Music List
const musicList = [
  {
    author: "Alan Walker",
    song: "Faded",
    audio: "audio/music_Faded.mp3",
    image: "img/faded.png",
  },
  {
    author: "Alan Walker",
    song: "Faded",
    audio: "audio/music_Faded.mp3",
    image: "img/faded.png",
  },
  {
    author: "Alan Walker",
    song: "Faded",
    audio: "audio/music_Faded.mp3",
    image: "img/faded.png",
  },
  {
    author: "Alan Walker",
    song: "Faded",
    audio: "audio/music_Faded.mp3",
    image: "img/faded.png",
  },
];

loadTrack(trackI);

function loadTrack(trackI) {
  clearInterval(timer_loader);
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
  timer_loader = setInterval(setUpdate, 1000);
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
      let x = Math.round(Math.random() * 14);
      let y = hexValue[x];
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
  current_Time.textContent = "00:00";
  totalDuration.textContent = "00:00";
  seekSlider.value = 0;
}
// Function random track
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
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
function pauseTrack() {
  currentTrack.pause();
  isPlaying = false;
  trackArt.classList.remove("rotate");
  waves.classList.remove("loader");
  playBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
  if (trackI < musicList.length - 1 && isRandom === false) {
    trackI += 1;
  } else if (trackI < musicList.length - 1 && isRandom === true) {
    let randomIndex = Number.parseInt(Math.random() * musicList.length);
    trackI = randomIndex;
  } else {
    trackI = 0;
  }
  loadTrack(trackI);
  playTrack();
}
function prevTrack() {
  if (trackI > 0) {
    trackI -= 1;
  } else {
    trackI = musicList.length - 1;
  }
  loadTrack(trackI);
  playTrack();
}
function seekTo() {
  let seekto = currentTrack.duration * (seekSlider.value / 100);
  currentTrack.currentTime = seekto;
}
function setVolume() {
  currentTrack.volume = volumeSlider.value / 100;
}
function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(currentTrack.duration)) {
    seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
    seekSlider.value = seekPosition;

    let currentMinutes = Math.floor(currentTrack.currentTime / 60);
    let currentSeconds = Math.floor(
      currentTrack.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(currentTrack.duration / 60);
    let durationSeconds = Math.floor(
      currentTrack.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    current_Time.textContent = currentMinutes + ":" + currentSeconds;
    totalDuration.textContent = durationMinutes + ":" + durationMinutes;
  }
}
