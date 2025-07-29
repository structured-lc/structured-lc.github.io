### Leetcode 1040 (Medium): Moving Stones Until Consecutive II [Practice](https://leetcode.com/problems/moving-stones-until-consecutive-ii)

### Description  
Given an array of integers representing the positions of stones on an infinite number line, your goal is to move the stones so that all stones occupy consecutive positions. On each move, you may move an **endpoint stone** (the one with the smallest or largest position) to any vacant position such that it is no longer an endpoint stone. The problem asks for the **minimum** and **maximum** number of moves needed to make all stones consecutive.

### Examples  

**Example 1:**  
Input: `[7,4,9]`  
Output: `[1,2]`  
*Explanation: Move 4 → 8 for one move to make stones [7,8,9], which is consecutive (min=1).  
Alternatively, move 9 → 5 and 4 → 6 for two moves ([5,6,7]), (max=2).*

**Example 2:**  
Input: `[6,5,4,3,10]`  
Output: `[2,3]`  
*Explanation: Move 3 → 8, then 10 → 7, ending with [4,5,6,7,8] in two moves (min=2).  
Alternatively, move 3 → 7, 4 → 8, 5 → 9 for three moves (max=3).*

**Example 3:**  
Input: `[100,101,104,102,103]`  
Output: `[0,0]`  
*Explanation: Stones are already consecutive ([100,101,102,103,104]), so no moves are required.*


### Thought Process (as if you’re the interviewee)  
- **Brute force:** Try all possible moves for each endpoint stone at each step – clearly infeasible for larger inputs due to combinatorial explosion.
- **Optimized approach:**  
  - *First,* sort the stones.
  - *Maximum moves:* This is simply moving all interior stones one by one to fill the consecutive positions starting from the left or right. The formula:  
    - max = max(stones[n-2] - stones - (n-2), stones[n-1] - stones[1] - (n-2)), where n=number of stones.
  - *Minimum moves:* Use a sliding window of size n across the sorted stones to find the interval which contains most stones within a window of size n. The fewest moves are needed to fill in the rest.
    - **Key insight:** If the window covers n-1 stones and the gap remaining is n-2 (means exactly one space missing in otherwise consecutive array), then special case: 2 moves needed, not 1. Otherwise, moves needed are n minus the max window size.
  - This window-based reasoning ensures we check the densest possible range, giving us minimal insertions needed.

### Corner cases to consider  
- Stones are already consecutive: expect 0 moves.
- Stones are spread far apart with large gaps.
- Window covering n-1 stones and just one space missing (needs 2 moves, not 1).
- Only 2 stones (trivial case).
- Stones at maximum integer values, to check for overflow bugs.


### Solution

```python
def numMovesStonesII(stones):
    # Sort the stone positions to simplify window calculation
    stones.sort()
    n = len(stones)

    # Calculate maximum moves:
    # max between moving everything from left or from right
    max_moves = max(
        stones[-1] - stones[1] - (n - 2),
        stones[-2] - stones[0] - (n - 2)
    )

    min_moves = n
    left = 0
    # Sliding window: try to find window of size n with most stones
    for right in range(n):
        # Move window's left pointer until window size <= n
        while stones[right] - stones[left] + 1 > n:
            left += 1
        # Stones in window: right-left+1
        # Remaining moves needed: n - (window size)

        # Special case: n-1 stones in window, 1 space out, but stones take n-2 spots, so need 2 moves
        if right - left + 1 == n - 1 and stones[right] - stones[left] == n - 2:
            min_moves = min(min_moves, 2)
        else:
            min_moves = min(min_moves, n - (right - left + 1))

    return [min_moves, max_moves]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - Sorting the stones is O(n log n), sliding window is O(n).
- **Space Complexity:** O(1)  
  - Only a few extra variables are used; no significant extra space required.


### Potential follow-up questions (as if you’re the interviewer)  

- How would the algorithm change if stones could be moved regardless of being endpoints?  
  *Hint: Try a greedy approach as restrictions become simpler.*

- Can you return the actual sequence of moves for min or max?  
  *Hint: You’d need to store the move choices at each step and backtrack or reconstruct them.*

- How can the approach be extended to a 2D grid (moving stones on a grid to make a consecutive block)?  
  *Hint: Consider windowing and sorting in both dimensions; complexity increases quickly.*


### Summary
This problem uses the **sliding window** pattern on a sorted array to minimize moves, and a simple direct calculation for the maximal case. The approach is similar to "longest consecutive subsequence" problems and highlights careful handling of endpoint restrictions and special edge cases. This pattern is useful in **interval**, **window**, and **consecutive sequence** problems.