### Leetcode 3028 (Easy): Ant on the Boundary [Practice](https://leetcode.com/problems/ant-on-the-boundary)

### Description  
Given an array of **nonzero** integers `nums`, an ant starts at position 0 (the boundary) and moves through the array from left to right. For each number, it moves right if the value is positive and left if negative, by exactly the given number of units. If, after a move, the ant lands exactly at the boundary (position 0), count that as a return to the boundary. We only check for being at the boundary **after** each move (not during; crossing does not count).  
Return the total number of times the ant returns to the boundary after a move.

### Examples  

**Example 1:**  
Input: `nums = [2, 3, -5]`  
Output: `1`  
*Explanation: Ant moves: 0 → 2 → 5 → 0. Returns to boundary after last move only (once).*

**Example 2:**  
Input: `nums = [3, 1, -4, 2, -2]`  
Output: `2`  
*Explanation: Moves: 0 → 3 → 4 → 0 (return #1) → 2 → 0 (return #2).*

**Example 3:**  
Input: `nums = [1, -1, 1, -1, 1, -1]`  
Output: `3`  
*Explanation: Moves: 0 → 1 → 0 (return #1) → 1 → 0 (return #2) → 1 → 0 (return #3).*

### Thought Process (as if you’re the interviewee)  
Start by simulating the movement:

- The ant starts at position 0.
- For each move, update the position by adding the current element.
- After each move, check if the position is 0. If so, increment the return count.

The brute-force solution is to iterate through the array, keep a running sum (position), and count how many times it becomes 0 after a move.

This approach is already optimal:  
- Each element is looked at once (\(O(n)\)), and we only use a variable for position and count.

No better solution exists since we cannot infer without checking all moves.

### Corner cases to consider  
- The ant never returns to zero (e.g., `nums = [2, 2, 2]`).
- The ant returns multiple times in a row (alternates back and forth).
- All moves are in one direction.
- Negative numbers only.
- Large and small arrays.
- Position crosses zero but doesn't land on zero during a move (not counted).
- Array with a single element (`nums = [-5]` or `[5]`).

### Solution

```python
def return_to_boundary_count(nums):
    position = 0        # Start at the boundary (zero)
    count = 0           # Number of returns to boundary

    for move in nums:
        position += move      # Move the ant
        if position == 0:     # Check if back on boundary
            count += 1

    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We process each move once.
- **Space Complexity:** O(1) — Only a few variables are used, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if some `nums[i]` can be zero?
  *Hint: What should "move by zero" mean? Should landing count as returning to boundary?*

- What if ant must cross the boundary (not just land on it)?
  *Hint: Track intermediate positions rather than just after each move.*

- Can you return the indices at which the ant returns to the boundary?
  *Hint: Instead of just a count, store move indices where position is zero.*

### Summary
The solution is a direct application of **prefix sum** and counting.  
It's a classic example of maintaining a running state through an array.  
This pattern — tracking running sums or states and counting when a property holds (sum == 0) — frequently appears in problems like subarray sum, zero-crossing, and simulation-style interview problems.