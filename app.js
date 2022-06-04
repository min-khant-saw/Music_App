const inputFile = document.querySelector('input[type="file"]');

const audio = new Audio();

let musicStroge = localStorage.getItem("music");

const musicFileUpload = () => {
  inputFile.click();
};

const musicLink = (event) => {
  const inputFile = event.target.files[0];
  const fileReade = new FileReader();
  fileReade.onload = () => {
    const url = fileReade.result;
    audio.src = url;
    musicStroge = url;
    localStorage.setItem("music", musicStroge);
  };
  fileReade.readAsDataURL(inputFile);
  audioPlay();
};

window.onload = () => {
  if (!musicStroge) {
    return;
  } else {
    audio.src = musicStroge;
  }
};

const play = () => {
  audio.pause();
  playing();
};

const pause = () => {
  if (audio.src === "") {
    inputFile.click();
    return;
  }
  audio.play();
  playing();
};

const playing = () => {
  if (audio.paused) {
    document.querySelector(".play-arrow").style.display = "none";
    document.querySelector(".pause-arrow").style.display = "inline";
  } else {
    document.querySelector(".pause-arrow").style.display = "none";
    document.querySelector(".play-arrow").style.display = "inline";
  }
  return;
};

const audioPlay = () => {
  if (audio.paused) {
    pause();
  } else {
    play();
  }
  return;
};

let duration;
let durationTime = "0:00";

audio.volume = 0.5;

const next_fiv = () => {
  audio.currentTime += 5;
};

const prev_fiv = () => {
  audio.currentTime -= 5;
};

audio.addEventListener("loadeddata", () => {
  duration = Math.floor(audio.duration);
  document.querySelector(".duration_time").innerHTML = timeFunction(duration);
});

audio.addEventListener("timeupdate", () => {
  const currentTime = Math.floor(audio.currentTime);
  const secondTime = timeFunction(currentTime);
  document.querySelector(".current_time").innerHTML = secondTime;
  document.querySelector(".progress-bar").style.width =
    (currentTime / duration) * 100 + "%";
});

const timeFunction = (currentTime) => {
  let minute = Math.floor(currentTime / 60);
  let second = Math.floor(currentTime % 60);
  let minuteText = minute < 10 ? "0" + minute : minute;
  let secondText = second < 10 ? "0" + second : second;
  return `${secondText}:${minuteText}`;
};

const timeLineFunction = (event) => {
  const width = event.target.clientWidth;
  const offset = event.offsetX;
  audio.currentTime = (offset / width) * duration;
};

audio.addEventListener("ended", () => {
  document.querySelector(".play-arrow").style.display = "none";
  document.querySelector(".pause-arrow").style.display = "inline";
});

const volume = (event) => {
  const volValue = event.target.value / 100;
  audio.volume = volValue;
  document.querySelector(".volumeNumber").innerHTML =
    Math.floor(volValue * 100) + "%";
};

window.addEventListener("keydown", (event) => {
  if (event.keyCode === 75 || event.keyCode === 32) {
    audioPlay();
  }
  if (event.keyCode === 85) {
    inputFile.click();
  }
  if (event.keyCode === 39) {
    if (audio.currentTime === duration) {
      return;
    }
    audio.currentTime += 5;
  }
  if (event.keyCode === 37) {
    if (audio.currentTime < 5) {
      return;
    }
    audio.currentTime -= 5;
  }
});
