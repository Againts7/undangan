/* global document window sessionStorage */

const root = document.querySelector(':root');
const audioIconWrapper = document.querySelector('.audio-icon-wrapper');
const audioIcon = document.querySelector('.audio-icon-wrapper i');
const song = document.querySelector('#song');

function disableScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollTop, scrollLeft);
  };
  root.style.scrollBehavior = 'auto';
}

function playAudio() {
  song.volume = 0.1;
  song.play();
  audioIconWrapper.style.display = 'flex';
}

function enableScroll() {
  window.onscroll = function () {};
  root.style.scrollBehavior = 'smooth';

  playAudio();
}

const submitKomen = sessionStorage.getItem('submitKomen');
if (submitKomen === 'null') disableScroll();

audioIconWrapper.onclick = function () {
  if (song.paused) {
    song.play();
    audioIcon.classList.remove('bi-pause-circle');
    audioIcon.classList.add('bi-disc');
  } else {
    song.pause();
    audioIcon.classList.remove('bi-disc');
    audioIcon.classList.add('bi-pause-circle');
  }
};

module.exports = { enableScroll };
