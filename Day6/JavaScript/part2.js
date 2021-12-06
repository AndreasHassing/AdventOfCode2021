const { readFileSync } = require("fs");

const input = readFileSync("input.txt").toString("utf-8");

const fishAges = input
  .split(",")
  .map((n) => parseInt(n))
  .reduce((ages, fishAge) => {
    ages[fishAge]++;
    return ages;
  }, new Array(9).fill(0));

console.log(fishAges);

let days = 256;
while (days-- > 0) {
  let previous = 0;
  for (let i = 8; i >= 0; i--) {
    const fishesOfAge = fishAges[i];

    if (i === 8) {
      previous = fishesOfAge;
    }
    if (i !== 8) {
      fishAges[i] = previous;
      previous = fishesOfAge;
    }
    if (i === 0) {
      fishAges[6] += fishesOfAge;
      fishAges[8] = fishesOfAge;
    }
  }
}

console.log(fishAges);
console.log(fishAges.reduce((sum, fishesOfAge) => sum + fishesOfAge));
