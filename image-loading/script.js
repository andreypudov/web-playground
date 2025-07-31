const DUPLICATION_COUNT = 10;

function duplicateBodyContent(numberOfCopies) {
  const body = document.body;
  const originalHTML = body.innerHTML;

  for (let index = 0; index < numberOfCopies; index++) {
    body.innerHTML += originalHTML
      .replaceAll(".webp", ".webp?v=" + index)
      .replaceAll(".bmp", ".bmp?v=" + index);
  }
}

window.onload = function () {
  duplicateBodyContent(DUPLICATION_COUNT);
};