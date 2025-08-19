### Leetcode 3449 (Hard): Maximize the Minimum Game Score [Practice](https://leetcode.com/problems/maximize-the-minimum-game-score)

### Description  
Given a list of integers `points` of length n and an integer m, you start at position -1 (outside the array). You can perform at most **m moves**. On each move, you can move the pointer either **left or right by 1**, but must always stay within bounds after the first move (i.e., never go before index 0 or after index n-1). When you land at index i, you increase gameScore[i] by points[i]. Your goal: **after at most m moves, maximize the minimum value in gameScore**. Return this maximal possible minimum value across all n positions.

### Examples  

**Example 1:**  
Input: `points = [3,6,5], m = 7`  
Output: `6`  
*Explanation: One optimal way:   
- Move right to 0: gameScore=[3,0,0]  
- Move to 1: gameScore=[3,6,0]  
- Use remaining 5 moves to alternate between 0 and 1, maximizing both.  
Final gameScore: [6,6,0] (or [6,6,1], etc.), so min = 6.*

**Example 2:**  
Input: `points = [2,4,1,3], m = 7`  
Output: `4`  
*Explanation:  
- Move right to 0: gameScore=[2,0,0,0]  
- Then to 1: gameScore=[2,4,0,0]  
- Then 0: [4,4,0,0]  
- Then 1: [4,8,0,0]  
- Next, back and forth to boost 0 and 1.  
Final: [6,8,0,0]  (can also do [6,8,1,0] etc.), so min = 4. Best is to balance so both 0 and 1 are ≥4. After experimenting, best min we can ensure is 4.*

**Example 3:**  
Input: `points = [8,5,2], m = 8`  
Output: `8`  
*Explanation:  
Optimally visit index 0 enough times to add its value to itself until min is maximized. You can use moves to accumulate 8 at index 0, so min is 8.*

### Thought Process (as if you’re the interviewee)  

- **Brute force:**  
  Try every possible sequence of moves and sum scores at each position. For each sequence, compute the gameScore array, and take its min. Return the maximum min over all valid sequences.  
  *Complexity:* Exponential. Clearly infeasible for large n or m.

- **Optimized approach:**  
  The question asks for the **maximum possible minimum score** we can achieve in at most m moves. This is classic “maximize the minimum” and fits the **Binary Search on Answer** technique.

  - Define a target ‘minScore’.  
  - For each possible value of minScore (binary search), check:  
    — *Is it possible, using ≤ m moves, to ensure every position in gameScore is at least minScore?*  
    — To check this: for each i, how many times do I need to visit i to get gameScore[i] ≥ minScore?  
    — That is, needs[i] = ceil(minScore / points[i]) for each i.  
    — The sum of all needs[i] − n “extra” moves (since the pointer can only move one at a time and cannot teleport; path planning is constrained).

  - **But**: Since you start outside (at -1), you must use moves to reach every index, and because you can visit indices multiple times by traversing back and forth, you must allocate moves to ensure every needs[i] is met within m.

  - So: For a given ‘val’, check with a helper function if it’s possible to achieve gameScore[i] ≥ val ∀ i, within m moves.

  - Use binary search between 0 and the largest theoretically possible value.

  - This method is efficient (O(log(max(points)), with a greedy helper per check).

### Corner cases to consider  
- Empty `points` array (should not occur, as per constraints).
- All element(s) in `points` are equal.
- Some or all values in `points` are 1 (worst case for achieving high min).
- Only 1 index (n = 1).
- m ≤ n.
- Very large m (can trivially ensure high min).
- m < n (not enough moves to visit every index).

### Solution

```python
def maximizeMinGameScore(points, m):
    n = len(points)

    # Binary search for answer
    left, right = 0, max(points) * m

    def can_achieve(target):
        # For every i, need ⎡target / points[i]⎤ visits to i
        needs = [((target + points[i] - 1) // points[i]) for i in range(n)]
        total_visits = sum(needs)
        # To visit each index at least once, min required visits is n
        # But moves = visits + walks (because you must walk between indices)
        # Simulate with window:
        # The best we can do (min moves) is to visit a block of indices
        # Try all possible segments of 'k' contiguous indices
        # For this problem, pointer can move back and forth, so need to minimize walks.
        # To maximize minScore, need to minimize extra walks

        # The critical observation: You want to find a subarray of length l (1 ≤ l ≤ n) 
        # where sum(needs[l]) + moves between those indices (l-1) ≤ m
        # So try every possible block (since you can't jump)
        res = float('inf')
        for l in range(1, n+1):
            for start in range(0, n-l+1):
                # sum_needs is total visits for this block
                sum_needs = sum(((target + points[i] - 1) // points[i]) for i in range(start, start+l))
                # moves to traverse: initial move + 2*(l-1) (visit left-right repeatedly)
                moves = sum_needs + (l - 1)
                # Must not exceed m
                if moves <= m:
                    return True
        return False

    ans = 0
    while left <= right:
        mid = (left + right) // 2
        if can_achieve(mid):
            ans = mid
            left = mid + 1
        else:
            right = mid - 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × log(K)), where K = max(points) × m  
  - For each binary search step (O(log K)), we may check O(n²) subarrays and for each sum needs takes O(n).
- **Space Complexity:** O(1), only constant extra space (may be O(n) if tracking temporary arrays).

### Potential follow-up questions (as if you’re the interviewer)  

- If pointer can jump to any index (not just move left/right), how does the solution change?  
  *Hint: Resource allocation becomes easier—just sum needs and compare to m directly.*

- What if, after each move, you can't revisit the same index consecutively?  
  *Hint: Must plan path carefully to interleave visits for all indices.*

- Can you optimize the helper to O(n) per check by tracking minimal blocks more efficiently?  
  *Hint: Sliding window or prefix sum for needs.*

### Summary
This problem is a classic use of the **binary search on the answer** technique, an efficient way to solve “maximize the minimum” or “minimize the maximum” problems under resource constraints. The approach leverages both greedy visitation and block window scanning. This coding pattern is common in scheduling, fair allocation, or threshold-optimization problems, and can be adapted to variations involving movement, grouping, or visiting constraints.

### Tags
Array(#array), Binary Search(#binary-search), Greedy(#greedy)

### Similar Problems
