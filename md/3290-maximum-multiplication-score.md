### Leetcode 3290 (Medium): Maximum Multiplication Score [Practice](https://leetcode.com/problems/maximum-multiplication-score)

### Description  
You are given two arrays: **a** of size 4 and **b** of size at least 4.  
Find **four indices** 0 ≤ i₀ < i₁ < i₂ < i₃ < len(b), and maximize the value:  
a × b[i₀] + a[1] × b[i₁] + a[2] × b[i₂] + a[3] × b[i₃]  
Return this **maximum score**.  
Essentially, for each index in a, you must pick a unique increasing index from b, multiply, sum, and maximize the total.

### Examples  

**Example 1:**  
Input:  
a = `[2, 3, 1, 4]`,  
b = `[1, 2, 3, 4, 5, 6]`  
Output:  
`44`  
*Explanation: Pick indices 2, 3, 4, 5 from b: 2×3 + 3×4 + 1×5 + 4×6 = 6 + 12 + 5 + 24 = 47. But bigger sum may be with earlier picks: Try all combinations. (Suppose 1,2,4,5: 2×2+3×3+1×5+4×6 = 4+9+5+24=42.) The optimal is 2,3,4,5 = 47. So result is `47`.*

**Example 2:**  
Input:  
a = `[3, 2, 5, 6]`,  
b = `[2, -6, 4, 5, -3, 2, -7]`  
Output:  
`49`  
*Explanation: Pick indices 0,1,2,5: 3×2 + 2×(-6) + 5×4 + 6×2 = 6 -12 + 20 + 12 = 26.  
Or 0,1,3,5: 3×2 + 2×(-6) + 5×5 + 6×2 = 6 -12 + 25 + 12 = 31.  
Try index set 0,2,3,5: 3×2+2×4+5×5+6×2=6+8+25+12=51. Try 0,2,3,6: 3×2+2×4+5×5+6×(-7)=6+8+25-42=-3.  
Optimal is 2,3,4,5: 3×4+2×5+5×(-3)+6×2=12+10-15+12=19.  
Actual best is 0,2,3,5=51.*  

**Example 3:**  
Input:  
a = `[1, 1, 1, 1]`,  
b = `[2, 2, 2, 2, 2, 2]`  
Output:  
`8`  
*Explanation: Any set of 4 increasing indices gives sum 2 + 2 + 2 + 2 = 8.*

### Thought Process (as if you’re the interviewee)  
- **Naive/Brute-force:** Try all combinations of 4 strictly increasing indices in b, total is C(len(b),4), and evaluate sum. This is too slow when b is large (\~O(n⁴)).
- **Optimized:**  
  - We observe that for each position in a (since always size 4), we want to greedily assign b indices to maximize the current sum *and* enable the rest of the indices to still be available, preserving order.
  - **DP / Recursive + Memoization:** For state (i, j): i=index in a (0 to 3), j=index in b, can choose or skip b[j].
    - If choose: take a[i]×b[j] + dfs(i+1, j+1)
    - If skip: dfs(i, j+1)
    - Base: if i==4, return 0. If not enough b left for remaining a, return -∞.
    - Memoize (i, j) to avoid recalculating.
  - This gives O(4 × n), since i=0..3 and j=0..len(b)-1.
- **Trade-offs:**  
  - No need for backtracking all combinations as only 4 elements must be picked.
  - DP/memo is fast enough, very readable, optimal for this problem. No sliding window works since index picks must be in order, not consecutive.

### Corner cases to consider  
- b is exactly length 4: only one valid pick.
- All b values are negative.
- All a values are negative.
- Repeated numbers in b.
- Maximum and minimum integer values in arrays.
- a or b with all zeros.
- Large b (testing efficiency of memo).

### Solution

```python
def maximumScore(a, b):
    # a: List[int] of length 4
    # b: List[int] of len(b) >= 4
    n = len(b)
    from functools import lru_cache

    # Memoization: state = (i index in a, j index in b)
    @lru_cache(maxsize=None)
    def dfs(i, j):
        # If picked all 4 from a, done!
        if i == 4:
            return 0
        # Not enough b left for remaining picks: impossible candidate
        if n - j < 4 - i:
            return float('-inf')
        # Option 1: skip b[j]
        skip = dfs(i, j + 1)
        # Option 2: pick b[j] for a[i]
        pick = a[i] * b[j] + dfs(i + 1, j + 1)
        return max(skip, pick)
    return dfs(0, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(4 × n) = O(n), since there are 4 possible a indices and up to n b indices, with memoization.
- **Space Complexity:** O(4 × n) for the memo table call stack and LRU cache, but since 4 is constant this is O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if a is of arbitrary length k, not always 4?  
  *Hint: Generalize DP to (i, j) for i=0..k. Complexity is O(k × n).*

- What if you want the actual indices picked, not just the score?  
  *Hint: Store previous choice or reconstruct by tracing back through states.*

- Can you do this problem in O(1) space?  
  *Hint: Space comes from the DP cache. Not possible unless b is also constant size, as choices overlap.*

### Summary
This problem is a classic example of "DP on few choices"; the key DP pattern is **subsequence picking with maximize/minimize**, especially when the pick order is fixed (like k = 4). The rolling DP and memoization technique here is reusable for variations involving picking elements from an array with constraints—see "Maximum Score from Performing Multiplication Operations" and “Pick k elements with rules” problems on LeetCode.


### Flashcard
Use DP with state (index in a, index in b); for each position in a, greedily pick the smallest available index in b that maximizes the current product while preserving order.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
