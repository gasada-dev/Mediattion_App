const main = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.video-container video');
  const sounds = document.querySelectorAll('.sound-select .button');
  const timeDisplay = document.querySelector('.time-display');
  const outLineLength = outline.getTotalLength();
  const timeSelect = document.querySelectorAll('.time-select button');
  const restart = document.querySelector('.restart');

  let fakeDuration = 600;

  outline.style.strokeDashoffset = outLineLength;
  outline.style.strokeDasharray = outLineLength;

  sounds.forEach(sound => {
    sound.addEventListener('click', function () {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    });
  });

  play.addEventListener('click', () => {
    checkPlaying(song);
  });

  restart.addEventListener('click', () => restartSong(song));

  const restartSong = song => song.currentTime = 0;

  timeSelect.forEach(option => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  const checkPlaying = song => {
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

  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    let progress = outLineLength - (currentTime / fakeDuration) * outLineLength;
    outline.style.strokeDashoffset = progress;

    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./src/svg/play.svg";
      video.pause();
    };
  };
};

main();
