from itertools import repeat
from typing import List

with open("../diagnosticreport.txt", "r", encoding="UTF-8") as report:
    lines = [line.rstrip() for line in report.readlines()]

lineCount = len(lines)

# Part 1
sumPerBit = list(repeat(0, len(lines[0])))

for line in lines:
    for idx, bit in enumerate(line):
        sumPerBit[idx] += int(bit)

gammaRate = 0
epsilonRate = 0

for bit in sumPerBit:
    gamma = 1 if (bit / lineCount) >= 0.5 else 0
    epsilon = abs(gamma - 1)

    gammaRate = (gammaRate << 1) + gamma
    epsilonRate = (epsilonRate << 1) + epsilon

print(f"Gamma rate: {gammaRate}")
print(f"Epsilon rate: {epsilonRate}")

print(f"Part 1 solution: {gammaRate * epsilonRate}")


# Part 2
def descent(ratingType: str, bitLines: List[List[int]], columnIdx: int):
    if len(bitLines) == 1:
        return sum(j << i for i, j in enumerate(reversed(bitLines[0])))

    selected = { 0: [], 1: [] }

    for bitLine in bitLines:
        selected[bitLine[columnIdx]].append(bitLine)

    if len(selected[0]) == len(selected[1]):
        remainingBitLines = selected[1 if ratingType == "oxygen" else 0]
    elif ratingType == "oxygen":
        remainingBitLines = selected[1] if len(selected[1]) >= len(selected[0]) else selected[0]
    else:
        remainingBitLines = selected[0] if len(selected[1]) >= len(selected[0]) else selected[1]

    return descent(ratingType, remainingBitLines, columnIdx + 1)

bitLines = list(map(lambda bits: [int(bit) for bit in bits], lines))

oxygenGeneratorRating = descent("oxygen", bitLines, 0)
co2ScrubberRating = descent("co2", bitLines, 0)

lifeSupportRating = oxygenGeneratorRating * co2ScrubberRating

print(f"Oxygen generator rating: {oxygenGeneratorRating}, CO2 scrubber rating: {co2ScrubberRating}. Life support rating: {lifeSupportRating}")
