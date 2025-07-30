const numberOfVideosPerRequest = 3;
let videoFileIndex = -1;

const muteVideos = () => {
  const videos = document.querySelectorAll('video');

  videos.forEach(video => {
    video.muted = true;
  });
}

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

const createObserver = (video) => {
  const options = {
    root: null,
    threshold: 1.0
  }

  const callback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        muteVideos();
        entry.target.muted = false;
        return;
      }
    });
  }

  const observer = new IntersectionObserver(callback, options);
  observer.observe(video);

  return observer;
}

const addVideo = () => {
  const video = createVideo();
  createObserver(video);
  document.body.appendChild(video);
}

const addVideos = () => {
  for (let index = 0; index < numberOfVideosPerRequest; ++index) {
    addVideo();
  }

  /* make the first video play initially */
  const videos = document.querySelectorAll('video');
  if (videos.length === numberOfVideosPerRequest) {
    setTimeout(() => {
      muteVideos();
      videos[0].muted = false;
    }, 100);
  }
}

const addVideosWithMore = (event) => {
  addVideos();

  const button = document.createElement('button');
  button.innerText = 'More';
  button.classList.add('button');
  button.classList.add('primary');
  button.addEventListener('click', addVideosWithMore);

  document.body.appendChild(button);
  if (event) {
    event.target.remove();
  }
}