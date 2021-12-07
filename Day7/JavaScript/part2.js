const { readFileSync } = require("fs");

const crabPositions = readFileSync("input.txt")
  .toString("utf-8")
  .split(",")
  .map((n) => parseInt(n));

crabPositions.sort((a, b) => a - b);

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

let currentBestTargetPosition = Number.MAX_SAFE_INTEGER;
let currentBestFuelSum = Number.MAX_SAFE_INTEGER;
for (
  let i = crabPositions[0];
  i <= crabPositions[crabPositions.length - 1];
  i++
) {
  const fuel = calculateFuel(i);

  if (fuel < currentBestFuelSum) {
    currentBestTargetPosition = i;
    currentBestFuelSum = fuel;
  }
}

console.log(
  `best fuel: ${currentBestFuelSum}, targeting crab: ${currentBestTargetPosition}`
);
