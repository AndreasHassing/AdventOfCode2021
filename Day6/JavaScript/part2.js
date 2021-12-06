const { readFileSync } = require("fs");

const input = readFileSync("input.txt").toString("utf-8");

const fishAges = input
  .split(",")
  .map((n) => parseInt(n))
  .reduce((ages, fishAge) => {
    ages[fishAge]++;
    return ages;
  }, new Array(9).fill(0));

let days = 256;
while (days-- > 0) {
  // shift ages

  [
    fishAges[0],
    fishAges[1],
    fishAges[2],
    fishAges[3],
    fishAges[4],
    fishAges[5],
    fishAges[6],
    fishAges[7],
    fishAges[8],
  ] = [
    fishAges[1],
    fishAges[2],
    fishAges[3],
    fishAges[4],
    fishAges[5],
    fishAges[6],
    fishAges[7] + fishAges[0],
    fishAges[8],
    fishAges[0],
  ];
}

console.log(fishAges.reduce((sum, fishesOfAge) => sum + fishesOfAge));
