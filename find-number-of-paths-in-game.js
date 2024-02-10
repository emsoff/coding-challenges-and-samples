// Challenge: suppose you are given a grid of h by w size, and you need to calculate how many distinct routes there are from the top-left to the bottom-right of the grid. Assume that your token can only move down or to the right. Write a function that takes two arguments, h for height and w for width, representing a grid's size and which returns the number of distinct paths from start to finish.

function countUniquePaths(h, w) {
    // Create a grid
    let dp = Array.from({ length: h }, () => Array(w).fill(0));

    // Fill the first row and first column with 1s since there's only one way to reach those cells
    for (let i = 0; i < h; i++) {
        dp[i][0] = 1;
    }
    for (let j = 0; j < w; j++) {
        dp[0][j] = 1;
    }

    // Calculate the number of unique paths for each cell
    for (let i = 1; i < h; i++) {
        for (let j = 1; j < w; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    // The bottom-right cell contains the total number of unique paths
    return dp[h - 1][w - 1];
}

countUniquePaths(4,4)