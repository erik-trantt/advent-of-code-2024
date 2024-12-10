import { parseTextToLines } from "../utils/index.mjs";

const lines = parseTextToLines("./input.txt");

// SETUP

const leftLocationIds = [];
const rightLocationIds = [];

lines.forEach((line) => {
  const locations = line.split(/\s{3}/g);

  if (isNaN(Number(locations[0])) || isNaN(Number(locations[1]))) {
    return;
  }

  leftLocationIds.push(Number(locations[0]));
  rightLocationIds.push(Number(locations[1]));
});

// PART 1

const sortedLeftLocationIds = leftLocationIds.sort((a, b) => a - b);

const sortedRightLocationIds = rightLocationIds.sort((a, b) => a - b);

const distances = [];

for (let i = 0; i < lines.length - 1; i++) {
  distances.push(
    Math.abs(sortedLeftLocationIds[i] - sortedRightLocationIds[i]),
  );
}

const totalDistance = distances.reduce((total, curr) => (total += curr), 0);

console.log(`Part 1, total distance between the 2 lists are: `, totalDistance);

// PART 2

/** @types {Object.<string, number>} */
const leftLocationOccurrences = countOccurrence(sortedLeftLocationIds);
const rightLocationOccurrences = countOccurrence(sortedRightLocationIds);

let similarityScore = 0;

leftLocationOccurrences.forEach((count, key) => {
  const rightLocationCount = rightLocationOccurrences.get(key) || 0;

  if (rightLocationCount) {
    similarityScore += key * rightLocationCount * count;
  }
});

console.log(
  `Part 2, similarity of the left compared to the right list are:`,
  similarityScore,
);

// UTILS

function countOccurrence(array = []) {
  const countMap = new Map();

  array.forEach((arrayItem) => {
    if (countMap.has(arrayItem)) {
      const count = countMap.get(arrayItem);

      countMap.set(arrayItem, count + 1);
    } else {
      countMap.set(arrayItem, 1);
    }
  });

  return countMap;
}
