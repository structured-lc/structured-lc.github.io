# [Practice](https://leetcode.com/problems/maximum-calories-burnt-from-jumps)

### Description
You are given an array of heights representing blocks. You start at ground level (height 0) and must jump between blocks to maximize calories burned. The calories burned for any jump from height A to height B is calculated as (A − B)². You must visit all blocks exactly once and can jump in any order. The goal is to return the maximum total calories that can be burned.

### Examples

**Example 1:**
Input: `heights = [1,3,1,5]`
Output: `12`
*Explanation: Jump from 0→3 (3²=9) then 3→1 (2²=4) then 1→5 (4²=16) but optimally: 0→1 (1), 1→5 (16), 5→3 (4), 3→1 (4) = total 25. One optimal sequence maximizes the squared differences.*

**Example 2:**
Input: `heights = [4,3,1]`
Output: `28`
*Explanation: Jump 0→4 (16) then 4→1 (9) then 1→3 (4) = 29, or 0→1 (1) then 1→4 (9) then 4→3 (1) = 11. The optimal path visits blocks strategically.*

**Example 3:**
Input: `heights = [1,2]`
Output: `1`
*Explanation: Only two blocks. Jump 0→1 (1) then 1→2 (1) = 2, or 0→2 (4) then 2→1 (1) = 5. Maximum is achieved by alternating between extremes.*

### Thought Process
The key insight is that we want to maximize the sum of squared differences. Since (A − B)² = (B − A)², jumping from A to B burns the same calories as B to A. This means we should alternate between high and low blocks to maximize height differences.

**Brute force:** Try all permutations of visiting blocks—O(n!) time, impractical.

**Optimized approach:** Use a greedy strategy with a deque. At each step, we're either at a "low" position seeking the highest unvisited block, or at a "high" position seeking the lowest unvisited block. This greedy alternation maximizes each jump's calorie burn. Using a deque allows us to efficiently pop from either end in O(1) time.

The algorithm:
1. Sort heights to identify extremes efficiently
2. Use a flag to track whether we're seeking high or low
3. Alternate: from current position, pick the max (if seeking high) or min (if seeking low) from remaining blocks
4. Accumulate calories from each jump
5. Continue until all blocks are visited

### Corner cases to consider
- Single block: Only one jump from ground to that block
- Two blocks: Simple case with two possible orderings
- All same heights: Any order yields zero calories
- Already sorted heights: Alternating between ends is optimal
- Very large height differences: Integer overflow potential (use appropriate data type)

### Solution

```python
from collections import deque

def maximumCaloriesBurnt(heights):
    # Convert to deque for O(1) operations at both ends
    h_deque = deque(sorted(heights))
    
    result = 0
    current_height = 0
    # True = seeking max, False = seeking min
    seeking_max = True
    
    while h_deque:
        if seeking_max:
            # Jump to the highest unvisited block
            next_height = h_deque.pop()
        else:
            # Jump to the lowest unvisited block
            next_height = h_deque.popleft()
        
        # Calculate calories: squared difference
        calories = (current_height - next_height) ** 2
        result += calories
        
        # Update current position and toggle seeking mode
        current_height = next_height
        seeking_max = not seeking_max
    
    return result
```

### Time and Space complexity Analysis

- **Time Complexity:** O(n log n) — Sorting the heights takes O(n log n). The while loop runs n times, and each deque operation (pop, popleft) is O(1), so the loop contributes O(n). Overall: O(n log n).

- **Space Complexity:** O(n) — The deque stores all n heights. No additional recursive stack or nested data structures are used beyond the input size.

### Potential follow-up questions

- (Follow-up question 1)  
  *Can you solve this without sorting? What if we need to return the actual jump sequence, not just the maximum calories?*
  *Hint: Consider using a priority queue or heap instead of sorting; track indices or heights in the result sequence.*

- (Follow-up question 2)  
  *What if there's a constraint that you cannot jump more than k units of height difference at a time?*
  *Hint: Add a validation check before accepting each jump; this may require dynamic programming or backtracking.*

- (Follow-up question 3)  
  *How would the solution change if we could skip some blocks (not visit all of them)?*
  *Hint: Use recursion with memoization or DP where state tracks visited blocks and current position; this becomes an optimization problem.*

### Summary
This problem uses a **greedy alternating strategy** to maximize squared differences. By alternating between seeking the highest and lowest unvisited blocks, we ensure large height differences on every jump. The deque data structure is critical for efficient extraction from both ends. This pattern appears in optimization problems where ordering matters and we want to exploit extremes—commonly seen in stock trading, interval scheduling, and resource allocation problems.


### Flashcard
Maximize sum of squared height differences by alternating between extremes; use a greedy deque strategy to always jump to the highest/lowest unvisited block.

### Tags
Array(#array), Two Pointers(#two-pointers), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
