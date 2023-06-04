/**
 * 将有序数组打乱成无序数组
 */

function shuffleInPlace(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // swap

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];

    console.log("currentIndex", currentIndex, "randomIndex", randomIndex);
  }
  console.log("array", array);

  return array;
}

shuffleInPlace([1, 2, 3, 4, 5]);
