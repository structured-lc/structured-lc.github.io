### Leetcode 2866 (Medium): Beautiful Towers II [Practice](https://leetcode.com/problems/beautiful-towers-ii)

### Description  
You are given a 0-indexed integer array `maxHeights`, where each element represents the *maximum possible height* you can build at position i.  
Build exactly one tower at each position, such that:
- `1 ≤ heights[i] ≤ maxHeights[i]`.
- The tower heights form a **mountain**: There exists a peak at some index p, so heights strictly increase from 0 up to p (or can stay equal), and from p onwards, heights do not increase (they may stay the same or decrease).
  
Your goal is to choose the configuration of heights that is beautiful as above and **maximize the sum of heights**.

### Examples  

**Example 1:**  
Input: `maxHeights = [5,3,4,1,1]`  
Output: `13`  
*Explanation: The optimal mountain is `[3,3,4,2,1]`. Peak at index 2:  
- Left: 3 ≤ 3 ≤ 4, right: 4 ≥ 2 ≥ 1, all ≤ maxHeights.  
Sum = 3 + 3 + 4 + 2 + 1 = 13.*

**Example 2:**  
Input: `maxHeights = [6,5,3,9,2,7]`  
Output: `22`  
*Explanation: Best is `[3,5,3,9,2,1]` (peak at 3). increasing up: 3<5<9, down: 9>2>1, all ≤ maxHeights, maximize sum.*

**Example 3:**  
Input: `maxHeights = [3,2,5,5,2,3]`  
Output: `18`  
*Explanation: Peak at index 2: `[2,2,5,4,2,3]`. Left non-decreasing, right non-increasing, all respects maxHeights.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try every possible peak position. For each, go left to right building the left slope (heights not greater than maxHeights and strictly increasing), and then right slope (not above maxHeights and non-increasing). For each peak, sum; return max.  
  However, for each peak, this is O(n²).
  
- **Optimization:**  
   - For each position as a possible peak, compute in O(n) time the best left and right height assignments using a greedy method:  
     - To the left, move from peak to 0: at each i, height is min(height at i+1, maxHeights[i]).  
     - To the right, similar, moving from peak to n-1.
   - To make it O(n): Precompute left and right best sums with monotonic stacks or with two passes (prefix and suffix).
   - For final sum: For each peak, sum the left + right (minus the peak to avoid double-count).
  
- **Why this approach:** Leverages prefix/suffix DP ideas and monotonic stack to keep O(n) time, crucial for n ~ 10⁵.

### Corner cases to consider  
- Array of length 1 (peak must be at 0)
- All maxHeights equal
- Strictly increasing/decreasing maxHeights
- A plateau: multiple equal values at the peak
- maxHeights containing 1s (lowest allowed)
- Large n (performance)

### Solution

```python
def maximumSumOfHeights(maxHeights):
    n = len(maxHeights)
    # Calculate best sum if peak is at each position (from left)
    left_sum = [0] * n
    stack = []
    total_left = [0] * n

    for i in range(n):
        h = maxHeights[i]
        cnt = 1
        # Maintain a stack for (height, count)
        while stack and stack[-1][0] > h:
            prev_h, prev_cnt = stack.pop()
            cnt += prev_cnt
        stack.append((h, cnt))
        left_sum[i] = h
        if i > 0:
            left_sum[i] += left_sum[i-1]
            if stack[-1][1] > 1:
                left_sum[i] -= (stack[-1][1] - 1) * h
    # Recalculate using proper prefix sums:
    prefix = [0]*n
    stack = []
    for i in range(n):
        count = 1
        while stack and stack[-1][0] > maxHeights[i]:
            prev_h, prev_count = stack.pop()
            count += prev_count
        stack.append((maxHeights[i], count))
        prefix[i] = (prefix[i-1] if i else 0) + maxHeights[i]
        if stack[-1][1] > 1:
            prefix[i] -= (stack[-1][1]-1)*maxHeights[i]
    # Calculate from right to left
    suffix = [0]*n
    stack = []
    for i in range(n-1, -1, -1):
        count = 1
        while stack and stack[-1][0] > maxHeights[i]:
            prev_h, prev_count = stack.pop()
            count += prev_count
        stack.append((maxHeights[i], count))
        suffix[i] = (suffix[i+1] if i + 1 < n else 0) + maxHeights[i]
        if stack[-1][1] > 1:
            suffix[i] -= (stack[-1][1]-1)*maxHeights[i]
    # Maximize sum at each peak
    result = 0
    for i in range(n):
        total = prefix[i] + (suffix[i] - maxHeights[i])
        result = max(result, total)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
   - Each loop (left/right fill) is O(n). Stack pops/pushes amortize to O(n).
- **Space Complexity:** O(n) for storing prefix, suffix arrays and stacks.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution if the mountain is required to be strictly increasing then strictly decreasing?
  *Hint: You'd need to disallow equal heights in the mountain.*

- What if it's not required to use all tower positions—some can be omitted?
  *Hint: Consider subsequence properties and DP.*

- Can you do it in-place with O(1) extra space?
  *Hint: Challenge the storage of prefix/suffix, pushes for streaming/rolling sum patterns.*

### Summary
This problem uses the **monotonic stack** together with prefix and suffix sums to efficiently compute, for every peak, the best possible mountain within the constraints. This general approach (using stack for prefix/suffix min/max) appears in a variety of sum/max-of-min problems (e.g., largest rectangle in histogram, sum of subarray minimums, etc.), making it a common and powerful pattern for dealing with restricted monotonic interval problems.

### Tags
Array(#array), Stack(#stack), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Minimum Number of Removals to Make Mountain Array(minimum-number-of-removals-to-make-mountain-array) (Hard)
- Maximum Number of Books You Can Take(maximum-number-of-books-you-can-take) (Hard)