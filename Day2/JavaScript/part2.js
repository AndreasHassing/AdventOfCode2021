const { readFileSync } = require("fs");

const actions = {
  forward: (aim, horizontal, depth, units) => [
    aim,
    horizontal + units,
    depth + aim * units,
  ],
  down: (aim, horizontal, depth, units) => [aim + units, horizontal, depth],
  up: (aim, horizontal, depth, units) => [aim - units, horizontal, depth],
};

const [finalAim, finalHorizontal, finalDepth] = readFileSync(
  `${__dirname}/../actions.txt`
)
  .toString("UTF8")
  .split(/\r?\n/)
  .map((actionAndUnits) => actionAndUnits.split(" "))
  .map(([action, units]) => [action, parseInt(units)])
  .reduce(
    ([aim, horizontal, depth], [nextAction, units]) =>
      actions[nextAction](aim, horizontal, depth, units),
    [0, 0, 0]
  );

const solution = finalHorizontal * finalDepth;

console.log(solution);
