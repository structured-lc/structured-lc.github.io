### Leetcode 733 (Easy): Flood Fill [Practice](https://leetcode.com/problems/flood-fill)

### Description

Given an image represented by a 2D integer grid `image`, you are given a starting pixel coordinate `(sr, sc)` and a new color. Perform a “flood fill” operation: change the color of the starting pixel and all connected pixels that have the same original color (up, down, left, right) to the new color. Return the modified image after performing the fill.

### Examples

**Example 1:**  
Input: `image=[[1,1,1],[1,1,0],[1,0,1]]`, `sr=1`, `sc=1`, `color=2`  
Output: `[[2,2,2],[2,2,0],[2,0,1]]`  
*Explanation: Starting at pixel (1,1) with color 1, all 1s connected 4-directionally are repainted to 2. The 0s and the bottom-right 1 (not connected by 1s) remain unchanged.*

**Example 2:**  
Input: `image=[[0,0,0],[0,0,0]]`, `sr=0`, `sc=0`, `color=0`  
Output: `[[0,0,0],[0,0,0]]`  
*Explanation: The starting pixel is already colored 0, so nothing changes.*

**Example 3:**  
Input: `image=[[0,0,0],[0,0,0]]`, `sr=1`, `sc=1`, `color=1`  
Output: `[[1,1,1],[1,1,1]]`  
*Explanation: Starting at (1,1), all connected 0s are flooded with 1, resulting in the whole image becoming 1s.*

### Thought Process

**Brute-force approach:**  
From the starting pixel, look in all 4 directions (up, down, left, right) and change any pixel with the same starting color to the new color. Repeat recursively.

**Optimized approach:**  
Instead of checking every pixel from scratch, use DFS or BFS starting from `(sr, sc)`, recursing only to pixels matching the original color. The color change itself prevents revisiting pixels, no need for a separate visited set.

**Choice:**  
DFS is simple and effective for most scenarios, with automatic stack handling in Python recursion. BFS (with a queue) is also possible but uses more auxiliary memory for wide regions.

### Corner cases to consider

- **Same color:** If the new color matches the original, no change is needed—return the original image immediately.
- **Single pixel:** If the image is a single pixel, just check and change if necessary.
- **Edge/corner pixels:** Should not try to look outside the grid.
- **No neighbors:** If the starting pixel has no connecting matching neighbors, only it changes.

### Solution

```

def floodFill(image, sr, sc, color):
original_color = image[sr][sc]
if original_color == color:
return image

    rows, cols = len(image), len(image)
    
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or image[r][c] != original_color:
            return
        image[r][c] = color
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    
    dfs(sr, sc)
    return image
```

### Time and Space complexity Analysis

- **Time Complexity:** O(m × n), where m is the number of rows and n is the number of columns. In the worst case, every pixel is filled.
- **Space Complexity:** O(m + n), for the recursion stack in the worst case.

### Potential follow-up questions

- **How would you handle a 3D image grid instead of 2D?**  
  Hint: Extend your DFS/BFS to visit in 6 directions (add front/back in z-axis).
- **What if the image is very large and recursion might cause a stack overflow?**  
  Hint: Use iterative DFS/BFS with a stack or queue.
- **How would you handle an 8-directional flood fill (like in paint tools)?**  
  Hint: Also recurse/queue into diagonal neighbors, not just up/down/left/right.

### Summary

Flood Fill is a classic graph traversal problem on a 2D grid. The key is to start at the given pixel, explore all connected pixels (matching the original color) in the four directions, and change their color. DFS is concise and commonly used for interviews and is applicable to many 2D grid exploration tasks (such as “Number of Islands” or “Maze Solver”).