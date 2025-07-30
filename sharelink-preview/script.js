const getDate = async (pageUrl, imageUrl) => {
  var files = [];

  if (imageUrl !== undefined) {
    const blob = await fetch(imageUrl).then(r => r.blob());
    files = [ new File([blob], 'bear.png', { type: 'image/png' }), ];
  }

  const data = {
    files: files,
    url: pageUrl,
  };

  return data;
}

const share = async (pageUrl, imageUrl) => {
  const data = await getDate(pageUrl, imageUrl);

  if (navigator.share) {
    navigator.share(data)
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  }
}
