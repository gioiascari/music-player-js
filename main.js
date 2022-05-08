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
