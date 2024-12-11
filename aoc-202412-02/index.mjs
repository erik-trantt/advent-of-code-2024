import { parseTextToLines } from "../utils/index.mjs";

const lines = parseTextToLines("./input.txt");

// SETUP

const tuples = lines.map((line) => line.split(" "));

// PART 1: How many reports are safe?

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

function countSafeLevelPartOne() {
  let safeLevelCount = 0;

  tuples.forEach((tuple, idx) => {
    let total = 0;
    let absoluteTotal = 0;

    tuple.map(Number).forEach((curr, idx, arr) => {
      if (idx <= tuple.length - 2) {
        total += curr - arr[idx + 1];
        absoluteTotal += Math.abs(curr - arr[idx + 1]);
      }
    });

    // 1. The levels are either all increasing or all decreasing.
    const isAllIncrementalOrDecremental = Math.abs(total) === absoluteTotal;

    // 2. Any two adjacent levels differ by at least one and at most three.
    const isHavingSafeDistance = hasSafeDistance(tuple);

    console.warn(
      `${idx.toString().padStart(3, "-")} ||`,
      tuple.toString().padEnd(23, " "),
      " | ",
      isAllIncrementalOrDecremental.toString().padEnd(5, " "),
      isHavingSafeDistance.toString().padEnd(5, " "),
      " | ",
      total,
      absoluteTotal,
    );
    if (isAllIncrementalOrDecremental && isHavingSafeDistance) {
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
