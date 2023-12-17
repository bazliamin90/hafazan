const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
let songIndex = 0;

// Songs info
const songs = [
{
    title: 'Al-Mulk (full)',
    artist: 'Syeikh Mishary',
    coverPath: 'assets/images/mulk.png',
    discPath: 'assets/music/mulk.mp3',
    duration: '7:35',
 },
{
    title: "Al-Mulk: 1-5",
    artist: 'Syeikh Mishary',
    coverPath: 'assets/images/mulk1-5.png',
    discPath: 'assets/music/mulk1-5.mp3',
    duration: '1:29',
 },
{
    title: "Al-Mulk: 6-8",
    artist: 'Syeikh Mishary',
    coverPath: 'assets/images/mulk6-8.png',
    discPath: 'assets/music/mulk6-8.mp3',
    duration: '0:39',
 },
{
    title: "Al-Mulk: 8-10",
    artist: 'Syeikh Mishary',
    coverPath: 'assets/images/mulk8-10.png',
    discPath: 'assets/music/mulk8-10.mp3',
    duration: '0:52',
 },
{
    title: "Al-Mulk: 9-11",
    artist: 'Syeikh Mishary',
    coverPath: 'assets/images/mulk9-11.png',
    discPath: 'assets/music/mulk9-11.mp3',
    duration: '0:42',
 },
{
    title: "Al-Mulk: 10-12",
    artist: 'Syeikh Mishary',
    coverPath: 'assets/images/mulk10-12.png',
    discPath: 'assets/music/mulk10-12.mp3',
    duration: '0:36',
 },
{
    title: "Al-Mulk: 11-14",
    artist: 'Syeikh Mishary',
    coverPath: 'assets/images/mulk11-14.png',
    discPath: 'assets/music/mulk11-14.mp3',
    duration: '0:43',
 },
{
    title: "Al-Mulk: 12-14",
    artist: 'Syeikh Mishary',
    coverPath: 'assets/images/mulk12-14.png',
    discPath: 'assets/music/mulk12-14.mp3',
    duration: '0:34',
 },
{
    title: "Al-Mulk: 13-15",
    artist: 'Syeikh Mishary',
    coverPath: 'assets/images/mulk13-15.png',
    discPath: 'assets/music/mulk13-15.mp3',
    duration: '0:35',
 },
];

// Load song initially
loadSong(songs[songIndex]);

// Load the given song
function loadSong(song) {
  cover.src = song.coverPath;
  disc.src = song.discPath;
  title.textContent = song.title;
  artist.textContent = song.artist;
  duration.textContent = song.duration;
}

// Toggle play and pause
function playPauseMedia() {
  if (disc.paused) {
    disc.play();
  } else {
    disc.pause();
  }
}

// Update icon
function updatePlayPauseIcon() {
  if (disc.paused) {
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
  } else {
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
  }
}

// Update progress bar
function updateProgress() {
  progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

  let minutes = Math.floor(disc.currentTime / 60);
  let seconds = Math.floor(disc.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  timer.textContent = `${minutes}:${seconds}`;
}

// Reset the progress
function resetProgress() {
  progress.style.width = 0 + '%';
  timer.textContent = '0:00';
}

// Go to previous song
function gotoPreviousSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex = songIndex - 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow) {
    playPauseMedia();
  }
}

// Go to next song
function gotoNextSong(playImmediately) {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow || playImmediately) {
    playPauseMedia();
  }
}

// Change song progress when clicked on progress bar
function setProgress(ev) {
  const totalWidth = this.clientWidth;
  const clickWidth = ev.offsetX;
  const clickWidthRatio = clickWidth / totalWidth;
  disc.currentTime = clickWidthRatio * disc.duration;
}

// Play/Pause when play button clicked
play.addEventListener('click', playPauseMedia);

// Various events on disc
disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', gotoNextSong.bind(null, true));

// Go to next song when next button clicked
prev.addEventListener('click', gotoPreviousSong);

// Go to previous song when previous button clicked
next.addEventListener('click', gotoNextSong.bind(null, false));

// Move to different place in the song
progressContainer.addEventListener('click', setProgress);
