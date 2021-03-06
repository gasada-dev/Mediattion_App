const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.video');
  const sound = document.querySelectorAll('.sound-select .btn')
  const timeDisplay = document.querySelector('.time-display')
  const outLineLength = outline.getTotalLength();

  let fakeDuration = 600;

  outline.style.strokeDasharray = outLineLength;
  outline.style.strokeDashoffset = outLineLength;

  play.addEventListener('click', () => {
    checkPlay(song);
  });

  const checkPlay = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './src/svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src = './src/svg/play.svg';
    }
  };
}

  app();