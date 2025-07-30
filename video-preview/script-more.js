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