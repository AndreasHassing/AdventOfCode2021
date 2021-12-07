const { readFileSync } = require("fs");

const crabPositions = readFileSync("input.txt")
  .toString("utf-8")
  .split(",")
  .map((n) => parseInt(n));

const sum = crabPositions.reduce((acc, n) => acc + n);
const avg = Math.floor(sum / crabPositions.length);

const calculateFuel = (targetPosition) => {
  let fuelSum = 0;

  for (const crabPosition of crabPositions) {
    if (crabPosition === targetPosition) {
      continue;
    }

    const diff = Math.abs(crabPosition - targetPosition);

    const fuel = (diff * (diff + 1)) / 2;

    fuelSum += fuel;
  }

  return fuelSum;
};

console.log(`best fuel: ${calculateFuel(avg)}, targeting crab: ${avg}`);
