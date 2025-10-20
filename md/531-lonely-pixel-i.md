### Leetcode 531 (Medium): Lonely Pixel I [Practice](https://leetcode.com/problems/lonely-pixel-i)

### Description  
We are given a 2D grid (picture) made up of 'B's (black pixels) and 'W's (white pixels). Our task is to count the number of “lonely” black pixels—those that are the only 'B' in their entire row and the only 'B' in their entire column. In other words, a 'B' is lonely if there are no other 'B's sharing its row or column.

### Examples  

**Example 1:**  
Input=`[['W', 'W', 'B'], ['W', 'B', 'W'], ['B', 'W', 'W']]`  
Output=`3`  
Explanation: All three 'B's are lonely. For each, no other 'B' exists in its row or column.

**Example 2:**  
Input=`[['B', 'W', 'B', 'W'], ['W', 'W', 'W', 'W'], ['B', 'W', 'B', 'W']]`  
Output=`0`  
Explanation: There are four 'B's, but none are lonely because each 'B' shares its row or column with another 'B'.

**Example 3:**  
Input=`[['W', 'W'], ['W', 'W']]`  
Output=`0`  
Explanation: There are no 'B's, so there can't be any lonely pixels.

### Thought Process  
**Brute-Force:**  
Loop through every cell in the grid. For each 'B', scan its entire row and column to check if there are any other 'B's. If not, increment the count. This is O(mn × (m + n)) time.  
**Optimized Approach:**  
First, count the number of 'B's in each row and column by traversing the grid once (O(mn)). Then, iterate through the grid again. For a 'B' at (i, j), if both row[i] and col[j] counts are 1, it's lonely. This is O(mn) time and O(m + n) space, much better than brute-force.  
**Choosing the Final Approach:**  
The optimized approach trades a bit of space for significant time savings, especially on larger grids. Counting rows and cols is a common way to avoid repeated scans and is a pattern used in several array/matrix count problems.

### Corner cases to consider  
- **Empty grid or all 'W':** Correctly return 0.
- **Single row or single column:** The logic still applies, but the code should handle these bounds.
- **All 'B's:** Only possible if the grid is 1x1, otherwise, no other 'B' can be lonely.
- **Every 'B' shares at least one row or column with another 'B':** As shown in Example 2, output is 0.

### Solution

```python
def findLonelyPixel(picture):
    if not picture or not picture[0]:
        return 0
    m, n = len(picture), len(picture[0])
    rows = [0] * m
    cols = [0] * n
    # Count 'B's per row and column
    for i in range(m):
        for j in range(n):
            if picture[i][j] == 'B':
                rows[i] += 1
                cols[j] += 1
    # Find lonely pixels
    result = 0
    for i in range(m):
        for j in range(n):
            if picture[i][j] == 'B' and rows[i] == 1 and cols[j] == 1:
                result += 1
    return result
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(mn) — We make two passes over the grid, and each is O(mn).
- **Space Complexity:** O(m + n) — We use two arrays of sizes m and n to store row and column counts.

### Potential follow-up questions  
What if the matrix is extremely large (e.g., billions of rows or columns)?  
How can you parallelize this computation?  
Can you use O(1) extra space by modifying the input matrix instead of allocating new arrays?  

*Hint: Consider scan patterns, or encoding information directly in the matrix itself.*  

How would you handle streaming data where the picture is not all in memory at once?  

*Hint: Think about chunking, buffering, or maintaining cumulative counts.*  

What changes if ‘lonely’ means only no 'B' in the same row but possible in the same column?  

*Hint: Adjust the logic to only check the row count, not column.*  

### Summary
This problem is a classic grid traversal with count-based optimization. The pattern of preprocessing counts (rows, cols) is widely applicable for matrix problems where you need to avoid O(n²) rescanning. You could encounter similar count-and-verify patterns in problems involving grids, arrays, or frequency distributions. The logic is not only efficient but also easy to follow and adapt for similar scenarios.


### Flashcard
Precompute row and column counts of 'B's; a pixel is lonely if both its row and column have exactly one 'B'.

### Tags
Array(#array), Hash Table(#hash-table), Matrix(#matrix)

### Similar Problems
- Lonely Pixel II(lonely-pixel-ii) (Medium)