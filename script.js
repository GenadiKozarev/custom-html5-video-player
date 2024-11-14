const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreenBtn = player.querySelector('.full__screen__btn');

const togglePlay = () => {
    video.paused ? video.play() : video.pause();
};

const updateButton = () => {
    toggle.textContent = video.paused ? '►' : '❚ ❚';
};

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

const handleProgressBar = () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
};

const jumpToVideoTime = e => {
    const newTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = newTime;
};

const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        video.requestFullscreen().catch(err => {
            alert(
                `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
            );
        });
    } else {
        document.exitFullscreen();
    }
};

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgressBar);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(skipButton => {
    skipButton.addEventListener('click', skip);
});
ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpdate);
});
progress.addEventListener('click', jumpToVideoTime);
let mousedown = false;
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
progress.addEventListener('mousemove', e => mousedown && jumpToVideoTime(e));
fullScreenBtn.addEventListener('click', toggleFullscreen);
document.addEventListener('keydown', e => e.key === 'f' && toggleFullscreen());
