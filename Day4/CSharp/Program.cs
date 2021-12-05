using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace AndreasHassing.AdventOfCode.Day4
{
    internal static class Program
    {
        private class Board
        {
            private readonly Dictionary<int, bool>[] lanes;

            private bool didWin = false;

            private Board(int rows, int columns)
            {
                lanes = Enumerable
                    .Range(0, rows + columns)
                    .Select(_ => new Dictionary<int, bool>())
                    .ToArray();
            }

            public bool Bingoed { get => didWin; }

            /// <summary>
            /// Marks the number, if found, on the board.
            /// If a lane containing the announced number is fully marked, the method returns true: "Bingo!".
            /// </summary>
            public bool Mark(int announced)
            {
                bool DidWin(Dictionary<int, bool> lane) => lane.All(kvp => kvp.Value);

                foreach (Dictionary<int, bool> lane in lanes)
                {
                    if (lane.ContainsKey(announced))
                    {
                        lane[announced] = true;

                        // can't return early in winning condition, need to mark all lanes
                        didWin = didWin || DidWin(lane);
                    }
                }

                return didWin;
            }

            public IEnumerable<int> Unmarked() =>
                lanes.SelectMany(
                        lane => lane.Where(kvp => !kvp.Value)
                    .Select(kvp => kvp.Key))
                    .Distinct();

            public static Board Parse(string boardString)
            {
                var boardInput = boardString
                    .Split("\r\n")
                    .Select(row => row
                        .Split(' ', StringSplitOptions.RemoveEmptyEntries)
                        .Select(int.Parse));

                int rows = boardInput.Count();
                int columns = boardInput.First().Count();

                Board board = new(rows, columns);

                int rowIdx = 0;
                foreach (IEnumerable<int> row in boardInput)
                {
                    int columnIdx = 0;
                    foreach (int n in row)
                    {
                        board.lanes[rowIdx].Add(n, false);
                        board.lanes[(rows + columns) - columnIdx - 1].Add(n, false);

                        columnIdx += 1;
                    }

                    rowIdx += 1;
                }

                return board;
            }
        }

        private static void Main(string[] args)
        {
            string[] bingoInput = File.ReadAllText(@"..\bingo.txt").Split("\r\n\r\n");

            string[] draws = bingoInput[0].Split(',');

            string[] bingoBoardsInput = bingoInput[1..^0];

            Board[] boards = bingoBoardsInput.Select(Board.Parse).ToArray();

            foreach (int draw in draws.Select(int.Parse))
            {
                foreach (Board board in boards.Where(b => !b.Bingoed))
                {
                    bool didWin = board.Mark(draw);

                    if (didWin)
                    {
                        int sumOfUnmarked = board.Unmarked().Sum();

                        int result = sumOfUnmarked * draw;

                        Console.WriteLine($"Winning result for draw {draw}: {result}");
                    }
                }
            }
        }
    }
}
