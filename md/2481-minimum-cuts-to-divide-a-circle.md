### Leetcode 2481 (Easy): Minimum Cuts to Divide a Circle [Practice](https://leetcode.com/problems/minimum-cuts-to-divide-a-circle)

### Description  
Given an integer n, return the **minimum number of straight cuts** required to divide a circle into n **equal slices**. Each cut must be a straight line passing through the center of the circle, and after all cuts, the slices should be of equal size.

### Examples  

**Example 1:**  
Input: `n = 4`  
Output: `2`  
*Explanation: 2 straight cuts through the center at right angles (like a plus sign) divide the circle into 4 equal slices.*

**Example 2:**  
Input: `n = 6`  
Output: `3`  
*Explanation: 3 straight cuts equally spaced (every 60 degrees through the center) split the circle into 6 equal slices.*

**Example 3:**  
Input: `n = 1`  
Output: `0`  
*Explanation: No cut is needed to have a single slice. The entire circle is one slice.*


### Thought Process (as if you’re the interviewee)  

- **Brute force idea:**  
  You could try to simulate making cuts and check if the slices are equal, but this is unnecessary since the math is simple.

- **Mathematical Insights:**  
  - If n == 1, no cuts are necessary.
  - For **even n**, each cut through the center passes through two points on the circumference, so each cut produces 2 slices; thus, need n/2 cuts.
  - For **odd n**, each cut only aligns through the center and a unique point, so each cut produces a new slice; thus, need n cuts.
  - This leads to a general formula: 
      - if n == 1: 0 cuts
      - if n is even: n ÷ 2 cuts
      - if n is odd: n cuts

- **Trade-offs:**  
  This O(1) approach is the most optimal—you never need to simulate or build the slices.


### Corner cases to consider  
- n = 1 (no cuts required)
- n is even vs. n is odd
- Very large n values (should still run in O(1))
- Negative or zero values for n (if specified by constraints)

### Solution

```python
def numberOfCuts(n: int) -> int:
    # No cuts needed if there's just one slice
    if n == 1:
        return 0
    # If n is even, each cut gives 2 slices. Need n // 2 cuts.
    if n % 2 == 0:
        return n // 2
    # If n is odd, each cut gives 1 new slice. Need n cuts.
    return n
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  Just a constant-time check for even/odd and a division.

- **Space Complexity:** O(1)  
  No extra storage used; the function uses a constant amount of memory.


### Potential follow-up questions (as if you’re the interviewer)  

- What if cuts don't have to go through the center?
  *Hint: Think about straight-line chords and maximum pieces for n cuts.*

- How would you adapt the solution if slices must not only be equal-shaped but also equal-area for irregular shapes?
  *Hint: Requires integration or area partition algorithms; not just geometric symmetry.*

- Could you generalize for a regular polygon, not just a circle?
  *Hint: Consider the symmetry and the effect of diagonals or chords in polygons.*

### Summary
This is a classic **math and geometry pattern problem**, relying on parity (odd/even logic) and the properties of straight lines through a circle's center. The pattern is common in problems about **dividing shapes equally**, and the even/odd branch is frequently useful for O(1) solutions where symmetry is leveraged.