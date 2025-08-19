### Leetcode 3200 (Easy): Maximum Height of a Triangle [Practice](https://leetcode.com/problems/maximum-height-of-a-triangle)

### Description  
You’re given two integers, **red** and **blue**, representing counts of red and blue balls. You must arrange these balls in rows to build a triangle:
- The 1ˢᵗ row contains 1 ball, the 2ⁿᵈ row contains 2 balls, the 3ʳᵈ contains 3, ..., the kᵗʰ row k balls.
- Every ball in a row uses the same color, but **adjacent rows must alternate colors**.
- You must maximize the triangle's **height** (number of rows).
Find the **maximum height** of such a triangle, given `red` and `blue`.

### Examples  

**Example 1:**  
Input: `red=6, blue=8`  
Output: `5`  
*Explanation:  
- Try starting with red:  
  - Row 1: 1 red (left: 5 red, 8 blue)
  - Row 2: 2 blue (left: 5 red, 6 blue)
  - Row 3: 3 red (left: 2 red, 6 blue)
  - Row 4: 4 blue (left: 2 red, 2 blue)
  - Row 5: 5 red (**not enough red left**)
- Try starting with blue (does not yield a greater height).  
- Maximum height is 5.*

**Example 2:**  
Input: `red=3, blue=3`  
Output: `3`  
*Explanation:  
- Start with red: 1 red, 2 blue, 3 red (red exhausted)  
- Start with blue: 1 blue, 2 red, 3 blue (blue exhausted)  
- In either case, height is 3.*

**Example 3:**  
Input: `red=1, blue=100`  
Output: `1`  
*Explanation:  
- Only 1 row possible since you only have 1 red ball and can't make 2 balls for the next row of any color.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  - Try all possible arrangements by forming rows one by one, subtracting balls of the chosen color repeatedly, alternating colors each row. Keep track of when balls of either color run out for the required row.
  - O(rows), which with a binary search, can be improved.

- **Optimization:**  
  - The only choice is which color to start with, then alternate. Try both ways (start with red or start with blue).  
  - For a given choice, for each row i (1..k):
    - If row is color X, subtract i balls from color X.
    - Continue until not enough balls for the next row.
  - Alternatively, since the balls needed for height h is `1 + 2 + ... + h = h(h+1)/2`, we can binary search the maximum height possible, checking whether both colors can supply at least their required rows.
  - However, the simpler greedy simulation is optimal and clear since height remains relatively small (grows as √N).

- **Final approach:** Simulate for both starting colors (red or blue), taking the max.

### Corner cases to consider  
- Either red or blue is 0: only 1 row possible if nonzero.
- red and blue both small (e.g., 1 or 2).
- One color much larger than the other.
- Exact counts to form a perfect triangle (e.g., red=3, blue=3 for height=3).

### Solution

```python
def maxHeightOfTriangle(red: int, blue: int) -> int:
    # Helper function computes height when starting with given colors
    def calc(r, b):
        row = 1
        color = 0  # 0: red, 1: blue
        used_r, used_b = 0, 0
        
        while True:
            if color == 0:
                if r < row:
                    break
                r -= row
            else:
                if b < row:
                    break
                b -= row
            row += 1
            color ^= 1  # alternate color
        return row - 1

    # Try both starts: start with red or blue
    return max(calc(red, blue), calc(blue, red))
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(√N), where N = max(red, blue). For each starting color, in the worst case, we increment row by 1 while the required sum of rows grows quadratic, so the loop runs O(√N) times.
- **Space Complexity:** O(1). No extra space used beyond variables for counts.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could have more colors (e.g., red, blue, green)?
  *Hint: Think about color alternation cycle or whether any greedy strategy generalizes.*

- Can you construct and return the actual triangle (returning the color per row)?
  *Hint: Use a list while simulating and record the chosen color for each row.*

- How would your approach change if adjacent rows can be the same color?
  *Hint: Just focus on maximizing usage, e.g., always use the most plentiful color for all rows.*

### Summary
The problem uses a **greedy alternating simulation**: build each row with the required number of balls, alternating colors, starting with either color, and track the max height achievable under the constraints. This is a classic case for greedy alternation and counting, and the approach is widely applicable for arranging objects under *alternating* or *adjacency* constraints.

### Tags
Array(#array), Enumeration(#enumeration)

### Similar Problems
