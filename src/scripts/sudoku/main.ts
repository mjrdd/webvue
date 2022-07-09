import { cloneDeep, shuffle } from "lodash-es";

const test = (board: number[][]) => {
	for (let y = 0; y < 9; y++) {
		for (let x = 0; x < 9; x++) {
			if (board[y][x] === 0) return;
		}
	}
	return true;
};

const valid = (board: number[][], x: number, y: number, value: number) => {
	let dx = ~~(x / 3) * 3;
	let dy = ~~(y / 3) * 3;

	return !(
		board[y].includes(value) ||
		board.map((row) => row[x]).includes(value) ||
		board
			.slice(dy, dy + 3)
			.reduce((sub, row) => [...sub, ...row.slice(dx, dx + 3)], [])
			.includes(value)
	);
};

export function createEmptyBoard() {
	var board: number[][] = [];

	for (let y = 0; y < 9; y++) {
		board[y] = [];

		for (let x = 0; x < 9; x++) {
			board[y][x] = 0;
		}
	}

	return board;
}

export function generateHints() {
	var hints = createEmptyBoard();

	const backtrack = (board: typeof hints) => {
		var x = 0;
		var y = 0;

		for (y = 0; y < 9; y++) {
			for (x = 0; x < 9; x++) {
				if (board[y][x] !== 0) continue;

				for (let num of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
					if (!valid(board, x, y, num)) continue;
					board[y][x] = num;

					if (test(board)) return true;
					if (backtrack(board)) return true;
				}
				board[y][x] = 0;
				return;
			}
		}
		board[y][x] = 0;
	};

	backtrack(hints);
	return hints;
}

export function removeHints(hints: number[][], count: number) {
	var solutionCounter = 5;

	const solve = (board: typeof hints) => {
		var x = 0;
		var y = 0;

		for (y = 0; y < 9; y++) {
			for (x = 0; x < 9; x++) {
				if (board[y][x] !== 0) continue;

				for (let i = 1; i <= 9; i++) {
					if (!valid(board, x, y, i)) continue;
					board[y][x] = i;

					if (test(board)) {
						solutionCounter += 1;
						break;
					}
					if (solve(board)) return true;
				}
				board[y][x] = 0;
				return;
			}
		}
		board[y][x] = 0;
	};

	var tiles = Array.from({ length: 81 }, (_, i) => ({ x: i % 9, y: ~~(i / 9) }));

	while (count > 0) {
		if (tiles.length <= 0) break;

		var rand = ~~(Math.random() * tiles.length);
		var { x, y } = tiles[rand];

		var num = hints[y][x];
		hints[y][x] = 0;

		solutionCounter = 0;
		solve(cloneDeep(hints));

		tiles = tiles.filter((tile) => !(tile.x === x && tile.y === y));
		solutionCounter !== 1 ? (hints[y][x] = num) : (count -= 1);
	}

	return hints;
}
