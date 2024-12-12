import { parseTextToLines } from "../utils/index.mjs";

const lines = parseTextToLines("./input.txt");

function cleanMemory(corruptedText = "") {
  const regex = /mul\((\d+),(\d+)\)/g;

  const maybeCleanedTextList = corruptedText.match(regex);

  if (maybeCleanedTextList) {
    // console.log(maybeCleanedTextList);
    return maybeCleanedTextList;
  }
}

function evalMultiplication(mulCommand = "") {
  const regex = /\d+/g;

  const numberLikeGroup = mulCommand.match(regex);

  if (!numberLikeGroup || numberLikeGroup.length !== 2) {
    return null;
  }

  const numOne = Number(numberLikeGroup[0]);
  const numTwo = Number(numberLikeGroup[1]);

  return numOne * numTwo;
}

let total = 0;

lines.forEach((corruptedTextLine, idx) => {
  console.log("\n" + "=== " + idx + " ===");
  const mulCommandGroup = cleanMemory(corruptedTextLine);

  if (mulCommandGroup) {
    const lineTotal = mulCommandGroup
      .map(evalMultiplication)
      .filter((evalResult) => evalResult !== null)
      .reduce((mul, curr) => (mul += curr), 0);

    console.log(lineTotal);

    total += lineTotal;
  }
});

console.info(`PART 1: Multiplication result = ${total}`);
