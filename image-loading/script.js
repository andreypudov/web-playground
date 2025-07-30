const DUPLICATION_COUNT = 10;

function duplicateBodyContent(numberOfCopies) {
  const body = document.body;
  const originalHTML = body.innerHTML;

  for (let index = 0; index < numberOfCopies; index++) {
    body.innerHTML += originalHTML;
  }
}

duplicateBodyContent(DUPLICATION_COUNT);
alert("Content duplicated " + DUPLICATION_COUNT + " times.");