import { parseTextToLines } from "../utils/index.mjs";

const lines = parseTextToLines("./input.txt");

// SETUP

const tuples = lines.map((line) => line.split(" "));

function checkIfAllIncreasingOrDecreasing(tuple = []) {
  let total = 0;
  let absoluteTotal = 0;

  tuple.map(Number).forEach((curr, idx, arr) => {
    if (idx <= tuple.length - 2) {
      total += curr - arr[idx + 1];
      absoluteTotal += Math.abs(curr - arr[idx + 1]);
    }
  });

  return Math.abs(total) === absoluteTotal;
}

function hasSafeDistance(tuple = [], i = 0) {
  if (!Array.isArray(tuple) || tuple.length <= 1) {
    console.warn("not an array", tuple);
    return true;
  }

  if (i <= tuple.length - 2) {
    const difference = Math.abs(tuple[i] - tuple[i + 1]);

    return 1 <= difference && difference <= 3 && hasSafeDistance(tuple, i + 1);
  }

  return true;
}

// =====
// PART 1: How many reports are safe?

function countSafeLevelPartOne() {
  let safeLevelCount = 0;

  tuples.forEach((tuple) => {
    // 1. The levels are either all increasing or all decreasing.
    // 2. Any two adjacent levels differ by at least one and at most three.
    if (checkIfAllIncreasingOrDecreasing(tuple) && hasSafeDistance(tuple)) {
      safeLevelCount += 1;
    }
  });

  return safeLevelCount;
}

const safeLevelCountPartOne = countSafeLevelPartOne();

console.info(
  "PART 1: Safe level count",
  safeLevelCountPartOne,
  ", Unsafe level count",
  lines.length - safeLevelCountPartOne,
);

// =====
// PART 2

function countSafeLevelPartTwo() {
  return tuples.reduce((safeLevelTotal, currentTupple) => {
    // 1. The levels are either all increasing or all decreasing.
    // 2. Any two adjacent levels differ by at least one and at most three.
    if (
      checkIfAllIncreasingOrDecreasing(currentTupple) &&
      hasSafeDistance(currentTupple)
    ) {
      safeLevelTotal += 1;

      return safeLevelTotal;
    }

    // Try removing each level one at a time
    for (let i = 0; i < currentTupple.length; i++) {
      const modifiedTupple = [
        ...currentTupple.slice(0, i),
        ...currentTupple.slice(i + 1),
      ];

      if (
        checkIfAllIncreasingOrDecreasing(modifiedTupple) &&
        hasSafeDistance(modifiedTupple)
      ) {
        safeLevelTotal += 1;

        return safeLevelTotal;
      }
    }

    return safeLevelTotal;
  }, 0);
}

const safeLevelCountPartTwo = countSafeLevelPartTwo();

console.info(
  "PART 2: Tolerant safe level count",
  safeLevelCountPartTwo,
  ", Unsafe level count",
  lines.length - safeLevelCountPartTwo,
);
