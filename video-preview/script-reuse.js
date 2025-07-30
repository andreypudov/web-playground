const numberOfVideosPerRequest = 3;
let videoElement;
let videoFileIndex = -1;

const getNextVideoFile = () => {
  videoFileIndex = (videoFileIndex + 1) % 4;
  return `../videos/${videoFileIndex}.mp4`
}

const createVideo = () => {
  const video = document.createElement('video');

  video.src = getNextVideoFile();
  video.controls = false;
  video.autoplay = true;
  video.loop = true;
  video.playsInline = true;
  video.muted = true;

  return video;
}

const createWrapper = () => {
  const wrapper = document.createElement('div');

  wrapper.classList.add('video-wrapper');
  wrapper.dataset.video = getNextVideoFile();

  return wrapper;
}

const createObserver = (video) => {
  const options = {
    root: null,
    threshold: 1.0
  }

  const callback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        videoElement.src = entry.target.dataset.video;
        videoElement.muted = false;

        entry.target.appendChild(videoElement);
        return;
      }
    });
  }

  const observer = new IntersectionObserver(callback, options);
  observer.observe(video);

  return observer;
}

const addVideoWithReuse = () => {
  const wrapper = createWrapper();
  createObserver(wrapper);
  document.body.appendChild(wrapper);
}

const addVideosWithReuse = () => {
  for (let index = 0; index < numberOfVideosPerRequest; ++index) {
    addVideoWithReuse();
  }

  const wrappers = document.querySelectorAll('.video-wrapper');
  if (wrappers.length === numberOfVideosPerRequest) {
    wrappers[0].appendChild(videoElement);
    videoElement.muted = false;
  }
}