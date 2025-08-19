### Leetcode 799 (Medium): Champagne Tower [Practice](https://leetcode.com/problems/champagne-tower)

### Description  
You are given a pyramid of glasses in which the top row has 1 glass, the next row has 2 glasses, then 3, and so on until the 100ᵗʰ row. Each glass can hold up to 1 cup of champagne. Champagne is poured into the topmost glass, and any excess in a glass (above 1 cup) overflows equally to the two glasses directly below it (the left and right). If a glass is full and receives more, it keeps only 1 cup, and the extra splits to the row below. After pouring a certain amount of champagne, you are asked: how full is the glass at row `query_row` and position `query_glass` (both 0-indexed)?

### Examples  

**Example 1:**  
Input: `poured=1, query_row=1, query_glass=1`  
Output: `0.0`  
*Explanation: Only 1 cup is poured, filling just the top glass. The second row is empty.*

**Example 2:**  
Input: `poured=2, query_row=1, query_glass=1`  
Output: `0.5`  
*Explanation: The top gets filled (1 cup), 1 extra cup overflows: half goes to the left glass in row 1, half to the right. So glass (1,1) has 0.5 cup.*

**Example 3:**  
Input: `poured=100000009, query_row=33, query_glass=17`  
Output: `1.0`  
*Explanation: There's **way** more than enough pour, so every glass up to this deep is full.*

### Thought Process (as if you’re the interviewee)  
- The pyramid could be up to 100 rows, so brute-force approaches are feasible.
- Each glass only affects two glasses in the next row (the ones immediately below it).
- Simulation: For each row, keep track of how much champagne is in each glass.
- Start with only the top glass having the poured value, and all others with 0. For every glass, if it has more than 1 cup, compute the overflow, split equally, and add to the glasses directly below.
- Repeat this row by row. After finishing up to `query_row`, answer is min(1, amount in that particular glass).
- Optimize: Since only the current and next row need storage at a time, use two arrays for space efficiency, or update one in place from bottom up.

### Corner cases to consider  
- Pouring 0 champagne: all glasses except the very top will be empty.
- If poured < number needed to fill up to the glass in question, result might be 0.
- When poured ≫ enough to fill all, every glass will be full (return 1.0)
- Querying the top glass: always affected by all champagne first.
- Querying a glass beyond possible index for a given row: out of bounds (not possible per constraints).

### Solution

```python
def champagneTower(poured: int, query_row: int, query_glass: int) -> float:
    # Only need rows up to query_row
    rows = [[0.0 for _ in range(r+1)] for r in range(query_row+1)]
    rows[0][0] = poured  # All champagne poured at the top

    for r in range(query_row):
        for c in range(r+1):
            # Only if current glass overflows
            if rows[r][c] > 1:
                overflow = (rows[r][c] - 1) / 2.0  # Only the excess over 1 cup
                rows[r+1][c] += overflow  # Left below
                rows[r+1][c+1] += overflow  # Right below

    # Answer should be at most 1.0
    return min(1, rows[query_row][query_glass])
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(query_row²) — Each row r has r+1 glasses; we fill each up to query_row, so ∑(r=0 to query_row) (r+1) ≈ query_row²/2.
- **Space Complexity:** O(query_row²) — For storage of champagne in each glass up to the query_row, which is at most 100.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we had millions of rows?
  *Hint: Can we store only the current and next row instead of the full 2D array?*
- Can you further reduce memory usage?
  *Hint: Try updating one row in place, from right to left.*
- How would you answer queries for multiple glasses in one pour efficiently?
  *Hint: Consider precomputing only what’s needed for the set of queries.*

### Summary
This is a **simulation and dynamic programming** problem — simulate flows row by row, carrying only the required data, using arrays for each row’s water content. The approach is efficient since the constraint is just 100 rows; for much larger pyramids, you’d optimize space further by only tracking current/next rows. The pattern shows up in problems with local overflow/propagation (like “water pouring”, “pascal’s triangle sum”, etc).

### Tags
Dynamic Programming(#dynamic-programming)

### Similar Problems
- Number of Ways to Build House of Cards(number-of-ways-to-build-house-of-cards) (Medium)