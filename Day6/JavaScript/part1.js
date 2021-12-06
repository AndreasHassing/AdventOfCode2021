const { readFileSync } = require("fs");

const input = readFileSync("input.txt").toString("utf-8");

const fishes = input.split(",").map((n) => parseInt(n));

let days = 80;
while (days-- > 0) {
  const newBornFishes = [];

  for (let i = 0; i < fishes.length; i++) {
    let fishAge = fishes[i];

    if (fishAge === 0) {
      newBornFishes.push(8);
    }

    fishAge -= 1;

    fishes[i] = fishAge >= 0 ? fishAge : 6;
  }

  for (const newBornFish of newBornFishes) {
    fishes.push(newBornFish);
  }
}

console.log(fishes.length);
