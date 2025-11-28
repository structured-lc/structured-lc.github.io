### Leetcode 3529 (Medium): Count Cells in Overlapping Horizontal and Vertical Substrings [Practice](https://leetcode.com/problems/count-cells-in-overlapping-horizontal-and-vertical-substrings)

### Description  
Given an m × n **grid** of lowercase letters and a **pattern** string of length p, find the number of distinct grid cells that are included in **both** a horizontal and a vertical matching substring of the pattern.  
- **Horizontal substring:** Can *wrap* to next row if reaching end of current row, but not from the last row back to the first.  
- **Vertical substring:** Can *wrap* to next column if reaching end of current column, but not from the last column back to the first.

Return the number of unique cells appearing in at least one horizontal and one vertical pattern match.

### Examples  

**Example 1:**  
Input:  
grid =  
```
[['a','b'],
 ['c','a']]
pattern = "abca"
```
Output: `3`  
*Explanation: Horizontal matches (shaded): positions (0,0), (0,1), (1,0), (1,1) as "a→b→c→a" (wrapping across rows) is a match.  
Vertical matches: (positions forming "a→a→b→c"): (0,0), (1,0), (0,1), (1,1) (wrapping across columns).  
Cells in both: (0,0), (0,1), (1,0) → total 3.*

**Example 2:**  
Input:  
grid =  
```
[['a','a','a'],
 ['a','a','a']]
pattern = "aaa"
```
Output: `6`  
*Explanation: Every cell is covered by both horizontal and vertical "aaa" matches due to uniformity. Total: 6 cells.*

**Example 3:**  
Input:  
grid =  
```
[['a','b'],
 ['b','a']]
pattern = "aba"
```
Output: `2`  
*Explanation: Only cells (0,0) and (1,1) belong to both a horizontal and a vertical "aba" match.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
    - For every cell, check every possible starting point for a horizontal and vertical match by simulating the substring collection with wrapping.  
    - Count cells that appear in both matching sets.  
    - Too slow for large inputs due to nested loops (O(mn\*p) or worse).

- **Optimized:**  
    - For every possible horizontal starting position, check if the pattern matches (with proper wrapping across rows). Record cells used.  
    - For every possible vertical starting position, check if the pattern matches (with wrapping across columns). Record cells used.  
    - Use two sets: one for all cells in *horizontal* matches, one for all in *vertical* matches.  
    - Intersect the sets to get counts of overlapping cells.  
    - Tradeoff: We check each position per pattern, but set operations are efficient and overlap detection is clean.

- Further Improvements:  
    - Precompute positions for each match to avoid redundant checks.
    - Use sets to avoid double-counting cells, as the same cell may be included in multiple matches.

### Corner cases to consider  
- Empty grid or empty pattern.
- Pattern length > m \* n (no possible match).
- Pattern of length 1 (trivial matches of single cells).
- All grid characters are the same.
- Pattern not present at all in the grid (output 0).
- Pattern longer than a row/column but wrap makes it possible.
- Multiple and overlapping matches.

### Solution

```python
def countCells(grid, pattern):
    m, n = len(grid), len(grid[0])
    p = len(pattern)
    
    horizontal_cells = set()
    vertical_cells = set()
    
    # Horizontal matches with wrapping across rows
    for i in range(m):
        for j in range(n):
            found = True
            matched_cells = []
            for k in range(p):
                x = (i + (j + k) // n)
                y = (j + k) % n
                if x >= m:    # Do not wrap from last row to first
                    found = False
                    break
                if grid[x][y] != pattern[k]:
                    found = False
                    break
                matched_cells.append((x, y))
            if found:
                horizontal_cells.update(matched_cells)
    
    # Vertical matches with wrapping across columns
    for i in range(m):
        for j in range(n):
            found = True
            matched_cells = []
            for k in range(p):
                x = (i + k) % m
                y = (j + (i + k) // m)
                if y >= n:   # Do not wrap from last column to first
                    found = False
                    break
                if grid[x][y] != pattern[k]:
                    found = False
                    break
                matched_cells.append((x, y))
            if found:
                vertical_cells.update(matched_cells)
    
    # Count cells in both sets
    return len(horizontal_cells & vertical_cells)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m \* n \* p).  
    - Every cell is considered as a starting point for both horizontal and vertical patterns, and each search is at most length p.
    - Set operations are O(1) amortized per insert/check.

- **Space Complexity:** O(m \* n).
    - At most, every cell might be stored in each set.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the pattern can be matched *diagonally* or in reverse?
  *Hint: Consider adding direction vectors and checking reverse matches.*

- How would you optimize if the pattern is much smaller than the grid?
  *Hint: Short-circuit non-matching starting points.*

- Can you do it in one pass, without set intersections?
  *Hint: Store a status matrix for both horizontal and vertical matches, then count overlaps.*

### Summary
This problem uses brute force in a structured way, with intelligent use of *sets* to avoid double-counting and to efficiently determine overlap. The approach is a mix of *sliding window* and *set intersection* problems, often seen in substring-matching on two-dimensional structures. This coding pattern can be repurposed for problems involving overlapping regions, pattern finding, or intersections of multiple search areas in grids.


### Flashcard
Precompute all horizontal and vertical pattern matches (with wrapping) by iterating through starting positions; record cells in each match set, then count cells appearing in both.

### Tags
Array(#array), String(#string), Rolling Hash(#rolling-hash), String Matching(#string-matching), Matrix(#matrix), Hash Function(#hash-function)

### Similar Problems
