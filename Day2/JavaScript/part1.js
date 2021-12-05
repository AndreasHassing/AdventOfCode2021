const { readFileSync } = require("fs");

const actions = {
  forward: (horizontal, depth, units) => [horizontal + units, depth],
  down: (horizontal, depth, units) => [horizontal, depth + units],
  up: (horizontal, depth, units) => [horizontal, depth - units],
};

const [finalHorizontal, finalDepth] = readFileSync(
  `${__dirname}/../actions.txt`
)
  .toString("UTF8")
  .split(/\r?\n/)
  .map((actionAndUnits) => actionAndUnits.split(" "))
  .map(([action, units]) => [action, parseInt(units)])
  .reduce(
    ([horizontal, depth], [nextAction, units]) =>
      actions[nextAction](horizontal, depth, units),
    [0, 0]
  );

const solution = finalHorizontal * finalDepth;

console.log(solution);
