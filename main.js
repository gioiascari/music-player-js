console.log("Ok Js:)");
// Utilities
// Playing section
let nowPlaying = document.querySelector(".now-playing");
let trackArt = document.querySelector(".track-art");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");
// Buttons section
let playPauseBtn = document.querySelector(".playPause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");
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
    artist: "Alan Walker",
    song: "Faded",
    audio: "audio/music_Faded.mp3",
    image: "img/faded.png",
  },
  {
    artist: "Frank Sinatra",
    song: "That's Life",
    audio: "audio/thats-life.mp3",
    image: "img/franksinatra.jpg",
  },
  {
    artist: "Mattafix",
    song: "Big City Life",
    audio: "audio/big-city-life.mp3",
    image: "img/mattafix.jpg",
  },
  {
    artist: "Eminem",
    song: "Just Lose It",
    audio: "audio/just-lose-it.mp3",
    image: "img/eminem.jpg",
  },
  {
    artist: "Moby",
    song: "Porcelain",
    audio: "audio/porcelain.mp3",
    image: "img/moby.jpg",
  },
];

loadTrack(trackI);

function loadTrack(trackI) {
  randomColor();

  clearInterval(timer_loader);
  reset();
  //   Inizializzo i componenti per inserirci i dati
  currentTrack.src = musicList[trackI].audio;
  currentTrack.load();
  //   Inserisco ad ogni canzone i dati adatti
  trackArt.style.backgroundImage = "url(" + musicList[trackI].image + ")";
  trackName.textContent = musicList[trackI].song;
  trackArtist.textContent = musicList[trackI].artist;
  // Indice che mi riferisce quale canzone sto ascoltando sulla parte superiore del player
  nowPlaying.textContent =
    "Playing music" + (trackI + 1) + "Of" + musicList.length;
  timer_loader = setInterval(setUpdate, 1000);
  currentTrack.addEventListener("ended" + nextTrack);

  //Funzione sfondo randomico
}

// Creo una funzione che mi crea uno sfondo randomico ogni volta che la pagina viene ricaricata
function randomColor() {
  let hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
  ];
  let a;

  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 14);
      let y = hex[x];
      a += y;
    }
    return a;
  }
  let Color1 = populate("#");
  let Color2 = populate("#");
  let angle = "to right";

  let gradient =
    "linear-gradient(" + angle + "," + Color1 + ", " + Color2 + ")";
  document.body.style.background = gradient;
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
  playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  currentTrack.pause();
  isPlaying = false;
  trackArt.classList.remove("rotate");
  waves.classList.remove("loader");
  playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
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
