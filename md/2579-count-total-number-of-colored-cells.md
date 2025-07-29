### Leetcode 2579 (Medium): Count Total Number of Colored Cells [Practice](https://leetcode.com/problems/count-total-number-of-colored-cells)

### Description  
Imagine you have an infinite two-dimensional grid of uncolored unit cells. You are given an integer n representing the number of minutes.  
- On the 1ˢᵗ minute, you color any one cell blue.  
- On each subsequent minute, color blue every uncolored cell that is directly adjacent (top, bottom, left, or right) to at least one blue cell from the previous minute.  
The goal is to compute the total number of colored cells after n minutes.

### Examples  

**Example 1:**  
Input: `n = 1`  
Output: `1`  
*Explanation: Only the center cell is colored at minute 1.*

**Example 2:**  
Input: `n = 2`  
Output: `5`  
*Explanation:*
- Minute 1: Color center cell (total 1).
- Minute 2: Color its 4 neighbors (up, down, left, right).
- Total = 1 + 4 = 5.

**Example 3:**  
Input: `n = 3`  
Output: `13`  
*Explanation:*
- Minute 1: Center cell (1).
- Minute 2: Four neighbors added (5 total).
- Minute 3: Each of the 4 edge cells adds up to 2 new cells each (total 13).

### Thought Process (as if you’re the interviewee)  
Brute-force approach:  
- Simulate each step, use a set to track which coordinates are colored.
- In each layer, loop through all colored cells and add adjacent uncolored neighbors.

Why it's not optimal:  
- The number of colored cells grows quadratically with n.
- Simulation for large n (e.g., 10⁵) is infeasible due to time and space.

Observation/Pattern:
- The colored shape is a diamond expanding outward.
- At n = 1, we have 1 cell.
- At n = 2, 5 cells (1 + 4).
- At n = 3, 13 cells (add 8 new).
- At each minute: cells added = 4 × (layer - 1)
- Cumulative sum: 1 + 4 × sum(k=1 to n-1) k

Math formula:
- For n ≥ 1: Total = 1 + 4 × (1 + 2 + ... + (n-1))
- 1 + 4 × ((n-1) × n / 2)
- Simplifies to 2 × n × (n-1) + 1

Why choose this approach:
- Runs in O(1) time and uses O(1) space.
- Handles large n with direct calculation and no simulation.

### Corner cases to consider  
- **n = 1**: Should return 1 (only one cell).
- **Large n, e.g., n = 100000**: Must work efficiently.
- **Minimum bound edge case:** n should always be ≥ 1.
- **Check overflow for large n**: Use correct integer types.

### Solution

```python
def coloredCells(n: int) -> int:
    # Total colored cells after n minutes = 2 × n × (n-1) + 1
    # Explanation:
    #   - At minute 1: 1 cell
    #   - At each next minute: 4 × (minute-1) new cells
    return 2 * n * (n - 1) + 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1). Direct formula computation, independent of n.
- **Space Complexity:** O(1). No extra storage apart from basic variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would the answer change if diagonal cells also counted as adjacent?
  *Hint: Try visualizing the pattern for the first few minutes; consider how many new cells are colored per layer.*

- What if you were asked to output the number of *new* cells colored in the kᵗʰ minute?
  *Hint: Think about the formula for the layer’s boundary size.*

- How would you modify this if the grid were finite and of size m × m?
  *Hint: You’d need to handle edge and corner cases where no cell exists in a certain direction.*

### Summary
This problem reduces to finding the mathematical pattern for the expansion of a diamond-shaped figure on a grid. The problem is a classic example of transforming a simulation into a closed formula based on recognizing and proving a pattern. This O(1) pattern-finding technique is common in “flood fill” and “layered expansion” interview problems, and is useful whenever you need to calculate the scope of influence or growth in regular increments on a grid.