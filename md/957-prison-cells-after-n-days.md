### Leetcode 957 (Medium): Prison Cells After N Days [Practice](https://leetcode.com/problems/prison-cells-after-n-days)

### Description  
Given a row of 8 **prison cells**, each cell is either **occupied (1)** or **vacant (0)**. Every day, each cell becomes **occupied** if its two neighbors are both occupied or both vacant, and **vacant** otherwise. The first and last cells will always become vacant (since they only have one neighbor). Given the initial configuration and an integer **N** representing the number of days, return the cell states after N days.

### Examples  

**Example 1:**  
Input: `cells = [0,1,0,1,1,0,0,1]`, `N = 7`  
Output: `[0,0,1,1,0,0,0,0]`  
*Explanation:  
Day 1: [0,1,1,0,0,0,0,0]  
Day 2: [0,0,0,0,1,1,1,0]  
Day 3: [0,1,1,0,0,0,0,0]  
Day 4: [0,0,0,0,1,1,1,0]  
Day 5: [0,1,1,0,0,0,0,0]  
Day 6: [0,0,0,0,1,1,1,0]  
Day 7: [0,0,1,1,0,0,0,0]*

**Example 2:**  
Input: `cells = [1,0,0,1,0,0,1,0]`, `N = 1000000000`  
Output: `[0,0,1,1,1,1,1,0]`  
*Explanation:  
Since the cell states repeat in a cycle, we can simulate until a cycle is detected and use modulo arithmetic to jump ahead instead of simulating all one billion days.*

**Example 3:**  
Input: `cells = [1,1,0,1,1,0,1,1]`, `N = 1`  
Output: `[0,0,1,0,0,1,0,0]`  
*Explanation:  
Only one day, so compute the next state directly for each cell.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  Simulate the cell configuration for each of the N days. For each day, construct the next day's state by iterating through each cell (excluding the first and last) and setting it to 1 if its neighbors are equal, otherwise 0. Time and space would be O(N × 8), which is fine for small N but too slow for huge N.

- **Optimization:**  
  There are only 8 cells, so there are only 2⁸ = 256 possible states. That guarantees the states must eventually repeat and form a **cycle**.  
  - Track all seen states and which day they were seen.  
  - Once a repeated state is encountered, determine the cycle's length.  
  - Use `N % cycle_length` to jump directly to the final answer by simulating only the remaining steps.

- **Why this works:**  
  The constraints create a small state space. Detecting cycles early avoids redundant work, replacing N steps with at most 256 steps.

### Corner cases to consider  
- N = 0 (should return initial state)
- N < length of cycle, so no cycle shortcut
- Initial state is all zeroes or all ones (may immediately cycle or stabilize)
- Input cells of non-standard length (invalid)
- Very large N (e.g., 10⁹)
- All cells the same except ends  
- Empty cells array or just one cell (invalid per problem constraints)

### Solution

```python
def prisonAfterNDays(cells, N):
    def nextDay(state):
        # Compute next day's cells. The first and last become 0.
        return [0] + [int(state[i-1] == state[i+1]) for i in range(1, 7)] + [0]

    seen = dict()
    states_sequence = []

    for day in range(N):
        next_cells = nextDay(cells)
        state_tuple = tuple(next_cells)
        if state_tuple in seen:
            # Cycle detected: states from seen[state_tuple] to current day (exclusive)
            cycle_length = day - seen[state_tuple]
            remaining = (N - day) % cycle_length
            return states_sequence[seen[state_tuple] + remaining]
        seen[state_tuple] = day
        states_sequence.append(next_cells)
        cells = next_cells

    return cells
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Worst case O(256), since there are at most 256 unique cell states before a cycle must form (8 cells, 2⁸=256). Each day, O(1) time to compute new state.

- **Space Complexity:**  
  O(256) for the seen states and storing the history of states if needed. Each state takes O(1) space as it’s always 8 cells.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are more than 8 cells?  
  *Hint: Does the cycle-length still help, or would the states become too many? What if the state space can't be cached entirely?*

- Can you generalize this to any cell update rule, not just "neighbors are the same"?  
  *Hint: How would you parameterize the rule, and can your method still detect cycles?*

- How would you make this work if states don't cycle (e.g., due to more randomness or more complex dynamics)?  
  *Hint: Is it possible to avoid repeating all N calculations?*

### Summary
This approach uses **cycle detection** in a small finite state space to accelerate a problem that at first appears to require huge simulation. This is a classic use case of **Floyd’s Tortoise-Hare** or **state-memoization** for optimizations, and is commonly applied in problems involving cellular automata, linked lists with cycles, or repeating simulations with small configuration space.