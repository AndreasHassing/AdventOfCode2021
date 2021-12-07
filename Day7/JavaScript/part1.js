const { readFileSync } = require("fs");

const crabPositions = readFileSync("input.txt")
  .toString("utf-8")
  .split(",")
  .map((n) => parseInt(n));

crabPositions.sort((a, b) => a - b);

const middleCrabIdx = Math.floor(crabPositions.length / 2);
const middleCrabPosition = crabPositions[middleCrabIdx];

let fuelSum = 0;

for (const crabPosition of crabPositions) {
  fuelSum += Math.abs(crabPosition - middleCrabPosition);
}

console.log(fuelSum);
