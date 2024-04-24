// Challenge: Create and solve a Sliding Puzzle (https://en.wikipedia.org/wiki/Sliding_puzzle).

class PriorityQueue {
    constructor(comparator = (a, b) => a > b) {
        this._heap = [];
        this._comparator = comparator;
    }

    size() {
        return this._heap.length;
    }

    isEmpty() {
        return this.size() == 0;
    }

    peek() {
        return this._heap[0];
    }

    push(...values) {
        values.forEach(value => {
            this._heap.push(value);
            this._siftUp();
        });
        return this.size();
    }

    pop() {
        const poppedValue = this.peek();
        const bottom = this.size() - 1;
        if (bottom > 0) {
            this._swap(0, bottom);
        }
        this._heap.pop();
        this._siftDown();
        return poppedValue;
    }

    _greater(i, j) {
        return this._comparator(this._heap[i], this._heap[j]);
    }

    _swap(i, j) {
        [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
    }

    _siftUp() {
        let node = this.size() - 1;
        while (node > 0 && this._greater(Math.floor((node - 1) / 2), node)) {
            this._swap(node, Math.floor((node - 1) / 2));
            node = Math.floor((node - 1) / 2);
        }
    }

    _siftDown() {
        let node = 0;
        while (
            (node * 2 + 1 < this.size() && this._greater(node, node * 2 + 1)) ||
            (node * 2 + 2 < this.size() && this._greater(node, node * 2 + 2))
        ) {
            let lower = node * 2 + 1;
            if (node * 2 + 2 < this.size() && this._greater(lower, node * 2 + 2)) {
                lower = node * 2 + 2;
            }
            this._swap(node, lower);
            node = lower;
        }
    }
}

function createPuzzle(n) {
    let arr = Array.from({ length: n * n }, (_, index) => index);
    do {
        arr.sort(() => Math.random() - 0.5);
    } while (!isSolvable(arr, n) || isSolved(arr, n));
    return chunkArray(arr, n);
}

function chunkArray(array, size) {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
        chunked.push(array.slice(i, i + size));
    }
    return chunked;
}

function isSolvable(puzzle, n) {
    let inversions = 0;
    const flattened = puzzle.flat();
    const zeroIndex = flattened.indexOf(0);
    const zeroRow = Math.floor(zeroIndex / n);
    for (let i = 0; i < flattened.length; i++) {
        for (let j = i + 1; j < flattened.length; j++) {
            if (flattened[i] > flattened[j] && flattened[j] !== 0) {
                inversions++;
            }
        }
    }
    if (n % 2 === 1) return inversions % 2 === 0;
    else return (inversions + zeroRow) % 2 === 1;
}

function isSolved(puzzle, n) {
    const target = [...Array(n * n).keys()].map(i => i + 1).slice(1).concat([0]);
    return arraysEqual(puzzle.flat(), target);
}

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function solvePuzzle(puzzle) {
    const n = puzzle.length;
    const target = [...Array(n * n).keys()].map(i => i + 1).slice(1).concat([0]);
    const openSet = new PriorityQueue((a, b) => a.f < b.f);
    const startNode = {
        puzzle: puzzle.flat(),
        g: 0,
        f: manhattanDistance(puzzle.flat(), target, n),
        moves: [],
        zeroIndex: puzzle.flat().indexOf(0)
    };
    openSet.push(startNode);

    while (!openSet.isEmpty()) {
        const current = openSet.pop();

        if (arraysEqual(current.puzzle, target)) {
            return current.moves;
        }

        getNeighbors(current, n).forEach(neighbor => {
            const newG = current.g + 1;
            const newMoves = current.moves.concat(neighbor.move);
            const newNode = {
                puzzle: neighbor.puzzle,
                g: newG,
                f: newG + manhattanDistance(neighbor.puzzle, target, n),
                moves: newMoves,
                zeroIndex: neighbor.zeroIndex
            };
            openSet.push(newNode);
        });
    }
    return [];
}

function getNeighbors(node, n) {
    const neighbors = [];
    const { puzzle, zeroIndex } = node;
    const x = zeroIndex % n; // Current column of the zero tile
    const y = Math.floor(zeroIndex / n); // Current row of the zero tile

    // Calculate index positions for possible moves
    const moves = {
        up: zeroIndex - n,
        down: zeroIndex + n,
        left: zeroIndex - 1,
        right: zeroIndex + 1
    };

    // Define conditions for each move
    if (y > 0) { // Can move up
        neighbors.push(createNewState(puzzle, zeroIndex, moves.up, 'up'));
    }
    if (y < n - 1) { // Can move down
        neighbors.push(createNewState(puzzle, zeroIndex, moves.down, 'down'));
    }
    if (x > 0) { // Can move left
        neighbors.push(createNewState(puzzle, zeroIndex, moves.left, 'left'));
    }
    if (x < n - 1) { // Can move right
        neighbors.push(createNewState(puzzle, zeroIndex, moves.right, 'right'));
    }

    return neighbors;
}

function createNewState(puzzle, zeroIndex, targetIndex, move) {
    const newPuzzle = [...puzzle]; // Make a copy of the current puzzle state
    // Swap the zero tile with the target tile
    [newPuzzle[zeroIndex], newPuzzle[targetIndex]] = [newPuzzle[targetIndex], newPuzzle[zeroIndex]];
    return {
        puzzle: newPuzzle,
        zeroIndex: targetIndex,
        move: move // Include the move (up, down, left, right) to trace the path later
    };
}


function manhattanDistance(puzzle, target, n) {
    let distance = 0;
    for (let i = 0; i < puzzle.length; i++) {
        const val = puzzle[i] - 1;
        if (val !== -1) {
            const targetIndex = target.indexOf(puzzle[i]);
            const x1 = i % n, y1 = Math.floor(i / n);
            const x2 = targetIndex % n, y2 = Math.floor(targetIndex / n);
            distance += Math.abs(x1 - x2) + Math.abs(y1 - y2);
        }
    }
    return distance;
}



const puzzle = createPuzzle(3);
console.log('Generated Puzzle:', puzzle);
console.log('Is Solvable:', isSolvable(puzzle, 3));
const solution = solvePuzzle(puzzle);
console.log('Solution Steps:', solution);