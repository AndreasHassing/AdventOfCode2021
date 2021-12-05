IEnumerable<int> measurements =
    File.ReadAllLines(@"..\measurements.txt")
    .Select(int.Parse);

#region Part 1
int part1DeepeningMeasurements = measurements
    .Aggregate(
        seed: new Measurement(LastMeasurement: null, DeepeningMeasurements: 0),
        (acc, curr) => new Measurement(
            LastMeasurement: curr,
            DeepeningMeasurements:
                acc.LastMeasurement is not null
                    && curr > acc.LastMeasurement
                ? acc.DeepeningMeasurements + 1
                : acc.DeepeningMeasurements),
        (acc) => acc.DeepeningMeasurements);

Console.WriteLine($"Part 1 answer: {part1DeepeningMeasurements}");
#endregion

#region Part 2
int part2DeepeningMeasurements = measurements
    .Aggregate(
        seed: new SlidingMeasurement(SlidingSum: null, Window: new SlidingWindow(null, null, null), DeepeningMeasurements: 0),
        (acc, curr) =>
        {
            SlidingWindow leftShiftedWindow = ShiftLeft(acc.Window, curr);
            int? newWindowSum = Sum(leftShiftedWindow);

            return new SlidingMeasurement(
               SlidingSum: newWindowSum,
               Window: leftShiftedWindow,
               DeepeningMeasurements:
                acc.SlidingSum is not null
                    && newWindowSum > acc.SlidingSum
                ? acc.DeepeningMeasurements + 1
                : acc.DeepeningMeasurements
            );
        },
        (acc) => acc.DeepeningMeasurements);

Console.WriteLine($"Part 2 answer: {part2DeepeningMeasurements}");
#endregion

#region Utils

SlidingWindow ShiftLeft(SlidingWindow window, int newValue) => window with { M1 = window.M2, M2 = window.M3, M3 = newValue };

int? Sum(SlidingWindow window) => window switch
{
    { M1: int m1, M2: int m2, M3: int m3 } => m1 + m2 + m3,
    _ => null,
};

readonly record struct Measurement(int? LastMeasurement, int DeepeningMeasurements);

readonly record struct SlidingWindow(int? M1, int? M2, int? M3);
readonly record struct SlidingMeasurement(int? SlidingSum, SlidingWindow Window, int DeepeningMeasurements);

#endregion
