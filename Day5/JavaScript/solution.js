const { readFileSync } = require("fs");

const input = readFileSync("lines.txt").toString("utf-8");

const lines = input
  .split("\n")
  .filter((l) => !!l)
  .map((l) => l.split("->").map((c) => c.split(",").map((n) => parseInt(n))));
// .filter(([[x1, y1], [x2, y2]]) => x1 === x2 || y1 === y2); // part 1

const drawLine = (matrix, [x1, y1], [x2, y2]) => {
  const pingCoord = (x, y) => {
    if (!matrix[x]) {
      matrix[x] = [];
    }
    if (!matrix[x][y]) {
      matrix[x][y] = 0;
    }

    matrix[x][y] += 1;
  };

  for (let x = x1, y = y1; x !== x2 || y !== y2; ) {
    pingCoord(x, y);

    const xIncrement = x === x2 ? 0 : x < x2 ? 1 : -1;
    const yIncrement = y === y2 ? 0 : y < y2 ? 1 : -1;

    x += xIncrement;
    y += yIncrement;
  }

  pingCoord(x2, y2);
};

const matrix = [];

for (const [p1, p2] of lines) {
  drawLine(matrix, p1, p2);
}

console.log(
  matrix
    .map((r) => r.filter((n) => n >= 2).length)
    .reduce((acc, n) => acc + n, 0)
);
